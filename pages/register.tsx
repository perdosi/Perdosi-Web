import { Box, Image, Heading, Radio, RadioGroup, Input, Button, InputRightElement, InputGroup, Alert, AlertIcon } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Head from 'next/head'

import BaseLayout from "components/Layout/Base";
import {
  pricingAPI, registerAPI
} from "../services/api"

function createArrayWithNumbers(length) {
  return Array.from({ length }, (_, k) => k);
}

const Register: React.FC<{ pricing }> = ({ pricing }) => {
  const [selectedPricing, setSelectedPricing] = useState()
  const [totalMember, setTotalMember] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
  const { register, handleSubmit, errors, watch } = useForm({ mode: 'onBlur' })
  const router = useRouter()

  const [errorResponse, setShowErrorResponse] = useState(null)
  const [successResponse, setShowSuccessResponse] = useState(null)

  const handleChange = (e) => {
    setShowForm(false)
    setSelectedPricing(e)
    const price = pricing.find(p => p.id === e)
    setTotalMember(price?.totalMember)
  }

  const onSubmit = async (data) => {
    setShowErrorResponse(null)
    try {
      await registerAPI({ ...data, pricingId: selectedPricing })
      setShowSuccessResponse('Pendaftaran peserta berhasil')
      setTimeout(() => router.push('/login'), 3000)
    } catch (error) {
      const { status, data } = error.response
      setShowErrorResponse({ status, data })
    }
  }

  return (
    <BaseLayout>
      <Head>
        <title>Register - Perdosi</title>
      </Head>
      <Box my="40px" p="40px" bgColor="white" width='448px' minH="465px" borderRadius="4px">
        <a href="/"><Image src="/images/logo.png" mx="auto" mb="40px" htmlWidth="110" htmlHeight="131" alt="perdosi logo" /></a>
        {errorResponse?.status && showForm && (<Alert mb="12px" status="error">
          <AlertIcon />
          {errorResponse?.data?.message}
        </Alert>)}
        {successResponse && showForm && (<Alert mb="12px" status="success">
          <AlertIcon />
          {successResponse}
        </Alert>)}
        {!showForm &&
          <>
            <RadioGroup onChange={handleChange} value={selectedPricing}>
              {pricing.map((p) => (
                <div key={`pricinggroup-` + p.id}>
                  {p.is_parent && <Heading mb="12px" as="h2" fontSize="24px">{p.group_name}</Heading>}
                  <Box p="12px" mb="12px" borderRadius="4px" border="1px" borderColor="gray.300" >
                    <Radio colorScheme="orange" value={p.id}>{`${p.name} Rp${p.amount}`}</Radio>
                  </Box>
                </div>
              ))}
            </RadioGroup>
            <Button isDisabled={!selectedPricing} colorScheme="orange" w="full" onClick={() => selectedPricing && setShowForm(true)}>Pilih</Button>
          </>}
        {selectedPricing && showForm &&
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              {createArrayWithNumbers(totalMember).map(index => {
                const fieldName = `peserta[${index}]`;
                return (
                  <div key={`peserta-` + index}>
                    <Heading mb="8px" as="h3" fontSize="14px">Peserta {totalMember > 1 && (index + 1)}</Heading>
                    <Input isInvalid={errors?.peserta?.[index]?.name} name={`${fieldName}.name`} ref={register({
                      required: {
                        value: true,
                        message: 'nama wajib diisi'
                      }
                    })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Nama Lengkap Beserta Gelar" />
                    <Input isInvalid={errors?.peserta?.[index]?.institution} name={`${fieldName}.institution`} ref={register({
                      required: {
                        value: true,
                        message: 'nama institusi wajib diisi'
                      }
                    })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Institusi" />
                    <Input isInvalid={errors?.peserta?.[index]?.address} name={`${fieldName}.address`} ref={register({
                      required: {
                        value: true,
                        message: 'alamat wajib diisi'
                      }
                    })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Alamat Rumah / Kantor" />
                    <Input isInvalid={errors?.peserta?.[index]?.phoneNumber} name={`${fieldName}.phoneNumber`} ref={register({
                      required: {
                        value: true,
                        message: 'no telepon wajib diisi'
                      }
                    })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Nomor Telepon" />
                    <Input isInvalid={errors?.peserta?.[index]?.email} name={`${fieldName}.email`} ref={register({
                      required: {
                        value: true,
                        message: 'email wajib diisi'
                      }
                    })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Email" />
                    <InputGroup>
                      <Input type={showPassword ? 'text' : 'password'} isInvalid={errors?.peserta?.[index]?.password} name={`${fieldName}.password`} ref={register({
                        required: {
                          value: true,
                          message: 'password wajib diisi'
                        },
                        minLength: {
                          value: 8,
                          message: 'password minimal 8 huruf'
                        },
                      })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Password (minimal 8 karakter)" />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <InputGroup>
                      <Input type={showConfirmPassword ? 'text' : 'password'} isInvalid={errors?.peserta?.[index]?.confirmpassword} name={`${fieldName}.confirmpassword`} ref={register({
                        required: {
                          value: true,
                          message: 'konfirmasi password wajib diisi'
                        },
                        validate: (value) =>
                          value === watch(`${fieldName}.password`) ||
                          'konfirmasi password tidak match'
                      })} borderRadius="base" border="1px" borderColor="gray.300" mb="12px" placeholder="Ulangi Password" />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowConfirmPassword}>
                          {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </div>
                )
              })}
              <Button colorScheme="orange" w="full" type="submit">
                Daftar
              </Button>
            </form>
            <Box w="full" my="24px">
              <hr />
            </Box>
            <Button w="full" mb="12px" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button w="full" onClick={() => setShowForm(false)}>
              Pilih paket lain
            </Button>
          </>
        }
      </Box>
    </BaseLayout>
  )
}

export async function getServerSideProps({ req }) {
  const data = await pricingAPI()
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
    props: {
      pricing: data
    }
  }
}

export default Register