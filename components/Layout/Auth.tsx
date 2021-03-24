import { signOut } from 'next-auth/client'
import React, { ReactNode } from 'react'
import { useToken, Icon } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const AuthLayout: React.FC<Props> = (props) => {
  const [blue500] = useToken('colors', ['blue.500'])

  const handleSignOut = async () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div>
      <div className="layout">
        <div className="navbar">
          <a href="/">
            <img
              src="/images/logo.png"
              width="66px"
              height="80px"
              alt="perdosi logo"
            />
          </a>
          <ul className="menu">
            {/* <li><span>Keluar</span></li>
            <li><span>Keluar</span></li> */}
            <li>
              <span role="button" tabIndex={0} onClick={handleSignOut}>
                <Icon mr="8px">
                  <path
                    d="M5.625 3.75056H13.125C13.821 3.7513 14.4882 4.0281 14.9803 4.52022C15.4725 5.01235 15.7493 5.67959 15.75 6.37556V11.2506H8.56078L11.0302 8.78071C11.1649 8.63892 11.2389 8.4501 11.2364 8.25453C11.2339 8.05896 11.1551 7.8721 11.0168 7.7338C10.8785 7.5955 10.6916 7.5167 10.496 7.51419C10.3005 7.51169 10.1116 7.58568 9.96985 7.7204L6.21985 11.4704C6.0793 11.611 6.00035 11.8017 6.00035 12.0006C6.00035 12.1994 6.0793 12.3901 6.21985 12.5307L9.96985 16.2807C10.1116 16.4154 10.3005 16.4894 10.496 16.4869C10.6916 16.4844 10.8785 16.4056 11.0168 16.2673C11.1551 16.129 11.2339 15.9421 11.2364 15.7466C11.2389 15.551 11.1649 15.3622 11.0302 15.2204L8.56078 12.7506H15.75V17.6256C15.75 19.1279 14.1661 20.2506 12.75 20.2506H5.625C4.92904 20.2498 4.26179 19.973 3.76967 19.4809C3.27755 18.9888 3.00075 18.3215 3.00001 17.6256V6.37556C3.00075 5.67959 3.27755 5.01235 3.76967 4.52022C4.26179 4.0281 4.92904 3.7513 5.625 3.75056Z"
                    fill="#3A69A7"
                  />
                  <path
                    d="M20.25 11.2501C20.4489 11.2501 20.6397 11.3292 20.7803 11.4698C20.921 11.6105 21 11.8012 21 12.0001C21 12.199 20.921 12.3898 20.7803 12.5305C20.6397 12.6711 20.4489 12.7501 20.25 12.7501H15.75V11.2501H20.25Z"
                    fill="#3A69A7"
                  />
                </Icon>
                Keluar
              </span>
            </li>
          </ul>
        </div>
        <div>{props.children}</div>
      </div>
      <style jsx global>{`
        .menu {
          list-style-type: none;
        }
        .menu > li {
          color: ${blue500};
          margin-bottom: 8px;
          cursor: pointer;
        }
        .menu > li > span {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .menu > li:last-child {
          margin-bottom: 0;
        }
        @media screen and (min-width: 768px) {
          .menu > li {
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 0;
          }
          .menu > li:not(:first-child) {
            margin-left: 32px;
          }
        }
        .navbar {
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media screen and (min-width: 768px) {
          .navbar {
            width: 100%;
          }
        }
        .layout {
          min-height: 100vh;
          padding: 0 1rem;
          background: white;
        }
        @media screen and (min-width: 768px) {
          .layout {
            max-width: calc(100% - 8%);
            margin: 0 auto;
            padding: 0;
          }
        }
        img[src=''] {
          visibility: hidden;
        }
        @-moz-document url-prefix() {
          img: -moz-loading {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  )
}

export default AuthLayout
