// plugins/axios.js
import axios from 'axios'
import { useCookie } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token') // Ambil token dari cookie

  // Buat instance axios dengan konfigurasi
  const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      Accept: 'application/json',
      Authorization: token.value ? `Bearer ${token.value}` : '',
    },
  })

  // Inject ke seluruh aplikasi Nuxt sebagai $api
  return {
    provide: {
      api: instance,
    },
  }
})
