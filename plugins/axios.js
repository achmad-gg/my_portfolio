// plugins/axios.js
import axios from 'axios'
import { useCookie, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const instance = axios.create({
    baseURL: config.public.apiBase, // Gunakan runtime config!
    headers: {
      Accept: 'application/json',
    },
  })

  // Tambahkan Authorization secara dinamis lewat interceptor
  instance.interceptors.request.use((request) => {
    if (token.value) {
      request.headers.Authorization = `Bearer ${token.value}`
    }
    return request
  })

  return {
    provide: {
      api: instance,
    },
  }
})
