import { getSession } from 'next-auth/client'
import { Box, Flex, Image, Heading, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import AuthLayout from 'components/Layout/Auth'
import greeting from 'utils/greeting'
import Head from 'next/head'
import { fetcher } from 'services/api'

const Index: React.FC<{ session }> = ({ session }) => {
  const router = useRouter()
  const { data } = useSWR('/api/user/invoice', fetcher)
  return (
    <AuthLayout>
      <Head>
        <title>Home - Perdosi</title>
      </Head>
      <Box mt="48px" w="full" textAlign="center">
        <Image
          m="0 auto"
          mb="48px"
          src="/images/welcome.png"
          alt="welcome illustration"
          width="392px"
          height="284px"
        />
        <Flex
          w="full"
          justifyContent="center"
          d="flex"
          alignItems="center"
          mb="36px"
        >
          <Text
            fontSize={{ base: '24px', md: '48px' }}
          >{`${greeting()},`}</Text>
          &nbsp;
          <Heading as="h2" fontSize={{ base: '24px', md: '48px' }}>
            {session?.lastSession?.user?.profile?.name}
          </Heading>
        </Flex>
        {data?.data?.settlement === 'WAITING_CONFIRMATION' && (
          <Button
            px="48px"
            onClick={() => router.push('/konfirmasi-pembayaran')}
            colorScheme="orange"
            color="white"
            mb="32px"
          >
            Konfirmasi Pembayaran
          </Button>
        )}
      </Box>
    </AuthLayout>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

export default Index
