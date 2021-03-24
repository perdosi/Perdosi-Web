import { useEffect } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { getSession } from 'next-auth/client'

import Head from 'next/head'
import AuthLayout from "components/Layout/Auth"
import { courseAPI } from 'services/api'

const Course: React.FC = () => {
  useEffect(() => {
    async function get() {
      await courseAPI()
    }
    get()
  }, [])
  return (
    <AuthLayout>
      <Head>
        <title>Materi - Perdosi</title>
      </Head>
      <Flex mt="32px" mx="auto" flexWrap="wrap" maxW="448px" flexDir="column">
        <Box border="1px solid #CDD5DF" p="40px" mb="20px" bgColor="white" w="full" minH="384px" borderRadius="4px">
          Test 1
        </Box>
        <Box border="1px solid #CDD5DF" p="40px" mb="20px" bgColor="white" w="full" minH="384px" borderRadius="4px">
          Test 1
        </Box>
      </Flex>
    </AuthLayout>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session
    }
  }
}

export default Course
