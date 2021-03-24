import { NextApiHandler } from "next"
import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { argon2i } from 'argon2-ffi'

import prisma from "lib/prisma"
import { clearSessionAPI } from "services/api"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  pages: {
    signIn: '/login',
    error: '/login'
  },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials
        try {
          const { value: projectId } = await prisma.option.findFirst({
            where: {
              name: "PROJECT_ID"
            }
          })
          const isExist = await prisma.user.findFirst({
            where: {
              email,
              projectId
            },
            include: {
              profile: true
            }
          })
          if (isExist) {
            const inputPassword = Buffer.from(password);
            const isAuthenticated = await argon2i.verify(isExist.password, inputPassword);
            if (isAuthenticated) {
              const { id, profile: { name }, email } = isExist
              return Promise.resolve({ id, name, email })
            }
            return Promise.resolve(false)
          } else {
            return Promise.resolve(false)
          }
        } catch (error) {
          return Promise.resolve(false)
        }
      },
    })
  ],
  secret: process.env.SECRET,
  session: { jwt: true },
  events: {
    async signOut(message) {
      const { email } = message
      try {
        await clearSessionAPI(email)
      } catch (error) {
        console.log(error)
      }
    }
  },
  callbacks: {
    signIn: async (callback) => {
      const { id: userId } = callback
      const isSessionSaved = await prisma.session.findFirst({
        where: {
          userId,
          expiredAt: {
            gt: new Date().toISOString()
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      if (!isSessionSaved) {
        try {
          const expiredAt = new Date(new Date().getTime() + 60 * 60 * 1 * 1000).toISOString()
          await prisma.session.create({
            data: {
              userId,
              expiredAt
            }
          })
          return Promise.resolve(true)
        } catch (error) {
          return Promise.resolve(false)
        }
      }
      return Promise.resolve(false)
    },
    session: async (session, user) => {
      const { id: userId } = user
      const { value: projectId } = await prisma.option.findFirst({
        where: {
          name: "PROJECT_ID"
        }
      })
      const lastSession = await prisma.session.findFirst({
        where: {
          userId,
          expiredAt: {
            gt: new Date().toISOString()
          }
        },
        include: {
          user: {
            select: {
              profile: {
                select: {
                  name: true
                }
              },
              groupId: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return Promise.resolve({ ...session, user, lastSession, projectId })
    }
  }
};
