import { useState } from "react";
import { Alert, AlertIcon, Box, Button, CloseButton, Image, Text, Textarea } from "@chakra-ui/react"
import Head from 'next/head';

import BaseLayout from "components/Layout/Base"
import { sendQuestionAPI } from 'services/api'
import { getSession } from "next-auth/client";

const QuestionBox: React.FC = () => {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setQuestion(inputValue)
  }

  const handleSubmit = async () => {
    setSuccess(false)
    setError(false)
    if (!question) return
    setLoading(true)
    try {
      await sendQuestionAPI({ question })
      setSuccess(true)
      setQuestion('')
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <BaseLayout>
      <Head>
        <title>Kirim Pertanyaan - Perdosi</title>
      </Head>
      <Box textAlign="center" ml={{ base: 'auto', md: '88px' }} mr="auto" p="40px" bgColor="white" width='448px' minH="384px" borderRadius="4px">
        <a href="/"><Image draggable="false" src="/images/logo.png" mx="auto" mb="22px" htmlWidth="110" htmlHeight="131" alt="perdosi logo" /></a>
        {success && (<Alert mb="12px" status="success">
          <AlertIcon />
          Pertanyaan berhasil terkirim!
          <CloseButton onClick={() => setSuccess(false)} position="absolute" right="8px" top="8px" />
        </Alert>)}
        {error && (<Alert mb="12px" status="error">
          <AlertIcon />
          Pertanyaan gagal terkirim!
          <CloseButton onClick={() => setError(false)} position="absolute" right="8px" top="8px" />
        </Alert>)}
        <Text mb="40px">
          Pertanyaan akan dijawab pada akhir sesi pembelajaran via Webinar.
        </Text>
        <Textarea
          onChange={handleInputChange}
          placeholder="Pertanyaan"
          size="sm"
        />
        <Button isLoading={loading} isDisabled={!question} onClick={handleSubmit} mt="24px" w="full" colorScheme="orange">Kirim</Button>
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

export default QuestionBox;
