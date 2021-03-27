import axios from 'axios'
import FormData from 'form-data'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api'
})

const protectedAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api',
  withCredentials: true
})

export const fetcher = (url) => axios.get(url).then((res) => res.data)

export const registerAPI = async (payload) => {
  try {
    const response = await api.post(`/register`, payload)

    return response.data
  } catch (error) {
    throw error
  }
}

export const pricingAPI = async () => {
  try {
    const response = await api.get(`/pricing`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const clearSessionAPI = async (payload) => {
  try {
    const response = await api.post(`/auth/clear-session`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const invoiceStatusAPI = async () => {
  try {
    const response = await api.get(`/user/invoice`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const uploadReceiptAPI = async (payload) => {
  try {
    const response = await api.post(`/user/upload-receipt`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const uploadImgBBAPI = async (payload) => {
  try {
    let formData = new FormData()
    formData.append('image', payload)
    formData.append('key', process.env.NEXT_PUBLIC_IMGBB_KEY)
    const response = await axios.post(
      process.env.NEXT_PUBLIC_IMGBB_API_URL,
      formData
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const sendQuestionAPI = async (payload) => {
  try {
    const response = await api.post(`/user/question`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const courseAPI = async () => {
  try {
    const response = await api.post(`/course/list`)
    return response.data
  } catch (error) {
    throw error
  }
}
