import { useState } from 'react'
import { Box, Input, Button, NumberInput, NumberInputField, InputLeftElement, InputGroup, AlertIcon, Alert, Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { uploadImgBBAPI, uploadReceiptAPI } from 'services/api'

const Form = ({ paid }) => {
  const router = useRouter()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [status, setStatus] = useState(paid)
  const [amount, setAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')

  const handleBrowseInput = (e) => {
    const { files } = e.target
    setImage(files[0])
  }
  const isReadyToUpload = !amount || !image || !accountName || !accountNumber
  const handleUpload = async () => {
    if (isReadyToUpload) {
      return
    }
    setLoading(true)
    try {
      const { data: { url: receiptUrl } } = await uploadImgBBAPI(image)
      await uploadReceiptAPI({ amount, accountName, accountNumber, receiptUrl })
      setLoading(false)
      setStatus(true)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      {error && (<Alert mb="12px" status="error">
        <AlertIcon />
          Maaf telah terjadi kesalahan
      </Alert>)}
      {(status || paid) &&
        <Flex w="full" h="full" flexDir="column" flexWrap="wrap" justifyContent="space-between">
          <Box mb="200px" textAlign="center">
            <Heading as="h2">Terima Kasih</Heading>
            <p>Pembayaran akan diperiksa 1 x 24 jam.</p>
          </Box>
          <Button onClick={() => router.push('/')}>Kembali ke Beranda</Button>
        </Flex>
      }
      {!status && !paid && <>
        <Input onChange={handleBrowseInput} py='4px' type="file" name="image" w="full" mb="12px" borderRadius="4px" />
        <Input type="text" onChange={(e) => setAccountName(e.target.value)}
          value={accountName}
          w="full" mb="12px" borderRadius="4px" placeholder="Nama lengkap rekening" />
        <NumberInput
          inputMode="numeric"
          onChange={(valueString) => setAccountNumber(valueString)}
          value={accountNumber}
          w="full" mb="12px" borderRadius="4px"
        >
          <NumberInputField placeholder="Nomor rekening" />
        </NumberInput>
        <InputGroup mb="12px" borderRadius="4px">
          <InputLeftElement
            pointerEvents="none"
            children="Rp"
          />
          <Input onChange={(e) => setAmount(e.target.value)} value={amount} placeholder="Jumlah transfer" />
        </InputGroup>
        <Button isLoading={loading} isDisabled={isReadyToUpload} onClick={handleUpload} mb="16px" colorScheme="orange" w="full" color="white">Kirim Bukti Transfer</Button>
        <Button onClick={() => router.push('/')} variant="outline" colorScheme="orange" w="full">Upload Bukti Transfer Nanti</Button>
      </>}
    </>
  )
}

export default Form
