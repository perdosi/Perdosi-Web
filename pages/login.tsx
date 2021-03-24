import { signIn, getSession } from 'next-auth/client'
import { Box, Input, Image, Button, Heading, Text, Alert, AlertIcon } from "@chakra-ui/react"
import { useRef } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import BaseLayout from "components/Layout/Base"

const Login: React.FC = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const router = useRouter()
  const { error } = router.query

  const onSubmit = () => emailRef?.current?.value && passwordRef?.current?.value && signIn('credentials', { email: emailRef?.current?.value, password: passwordRef?.current?.value, callbackUrl: `/`, redirect: false })

  const handleKeyPress = (e) => e.key === 'Enter' && onSubmit()

  return (
    <BaseLayout>
      <Head>
        <title>Login - Perdosi</title>
      </Head>
      <Box p="40px" bgColor="white" width='448px' minH="465px" borderRadius="4px">
        <a href="/"><Image draggable="false" src="/images/logo.png" mx="auto" mb="40px" htmlWidth="110" htmlHeight="131" alt="perdosi logo" /></a>
        {error === 'CredentialsSignin' && (<Alert mb="12px" status="error">
          <AlertIcon />
          Email atau password salah
        </Alert>)}
        {error === 'AccessDenied' && (<Alert mb="12px" status="error">
          <AlertIcon />
          Anda tidak memiliki akses login
        </Alert>)}
        <Input required ref={emailRef} name="username" w="full" mb="12px" borderRadius="4px" placeholder="Email" />
        <Input onKeyPress={handleKeyPress} required ref={passwordRef} name="password" w="full" borderRadius="4px" mb="20px" type="password" placeholder="Password" />
        <Button mb="20px" colorScheme="orange" onClick={onSubmit} w="full" color="white">Masuk</Button>
        <Box w="full" textAlign="center">
          <Heading fontSize="16px">
            Anggota baru?
            &nbsp;<Link href="/register">
              <Text cursor="pointer" color="orange" as="u">Buka akun disini</Text>
            </Link>
          </Heading>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {}
  }
}

export default Login;
