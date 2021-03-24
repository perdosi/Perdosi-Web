import { Box, Button, Heading, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Info = ({ onClick, amount }) => {
  const router = useRouter()
  return (
    <>
      <Box textAlign="center">
        <Text>Jumlah yang harus dibayar</Text>
        <Heading fontSize="48px" mb="24px">Rp {amount}</Heading>
        <Text>Transfer ke nomor rekening</Text>
        <Text mb="40px" fontWeight="bold" fontSize="18px">
          BRI<br />
        123456789000<br />
        a/n PERDOSRI
      </Text>
        <Button onClick={onClick} mb="16px" colorScheme="orange" w="full" color="white">Kirim Bukti Transfer</Button>
        <Button onClick={() => router.push('/')} variant="outline" colorScheme="orange" w="full">Upload Bukti Transfer Nanti</Button>
      </Box>
    </>
  )
}

export default Info
