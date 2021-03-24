import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Box } from "@chakra-ui/react"
import { getSession } from 'next-auth/client'

import BaseLayout from "components/Layout/Base"
import Info from "components/PaymentConfirmation/Info"
import Form from "components/PaymentConfirmation/Form"
import { invoiceStatusAPI } from 'services/api'
import Head from 'next/head';

const ConfirmPayment: React.FC = () => {
  const router = useRouter()
  const [showUI, setShowUI] = useState('info')
  const [alreadyPaid, setAlreadyPaid] = useState(false)
  const [amount, setAmount] = useState()

  useEffect(() => {
    async function get() {
      const { data: { accountNumber, accountName, receiptUrl, settlement, amount: totalAmount } } = await invoiceStatusAPI()
      if (accountName && accountNumber && receiptUrl) {
        setShowUI('form')
        setAlreadyPaid(true)
      } else {
        setAmount(totalAmount)
        setShowUI('info')
      }
      if (settlement === 'SETTLED')
        router.push('/')
    }
    get()
  }, [])

  const handleInfoClick = () => setShowUI('form')

  return (
    <BaseLayout>
      <Head>
        <title>Konfirmasi Pembayaran - Perdosi</title>
      </Head>
      <Box p="40px" bgColor="white" width='448px' minH="384px" borderRadius="4px">
        {showUI === 'form' && <Form paid={alreadyPaid} />}
        {showUI === 'info' && !alreadyPaid && <Info amount={amount} onClick={handleInfoClick} />}
      </Box>
    </BaseLayout>
  );
};

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

export default ConfirmPayment;
