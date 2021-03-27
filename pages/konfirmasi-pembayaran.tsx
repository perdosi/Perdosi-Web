import Head from 'next/head'
import useSWR from 'swr'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { getSession } from 'next-auth/client'

import BaseLayout from 'components/Layout/Base'
import Info from 'components/PaymentConfirmation/Info'
import Form from 'components/PaymentConfirmation/Form'
import { fetcher } from 'services/api'

const ConfirmPayment: React.FC = () => {
  const router = useRouter()
  const [showUI, setShowUI] = useState('')
  const { data } = useSWR('/api/user/invoice', fetcher)
  if (data?.data?.settlement === 'SETTLED') router.push('/')
  const handleInfoClick = () => setShowUI('form')

  return (
    <BaseLayout>
      <Head>
        <title>Konfirmasi Pembayaran - Perdosi</title>
      </Head>
      <Box
        p="40px"
        bgColor="white"
        width="448px"
        minH="384px"
        borderRadius="4px"
      >
        {(data?.data?.accountName &&
          data?.data?.accountNumber &&
          data?.data?.receiptUrl) ||
        showUI === 'form' ? (
          <Form
            paid={
              data?.data?.accountName &&
              data?.data?.accountNumber &&
              data?.data?.receiptUrl
            }
          />
        ) : (
          <Info amount={data?.data?.amount} onClick={handleInfoClick} />
        )}
      </Box>
    </BaseLayout>
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

export default ConfirmPayment
