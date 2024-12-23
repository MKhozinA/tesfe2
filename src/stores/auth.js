import { defineStore } from 'pinia'
import axios from 'axios'

// Buat instance axios dengan konfigurasi khusus
const apiClient = axios.create({
  baseURL: 'https://api-topic.demo4.srs-x.net',
  // Tambahkan header khusus jika diperlukan
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await apiClient.post('/admin/auth/login', {
          username: email,
          password: password
        })
        
        const token = response.data.token
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem('token', token)
        
        return true
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async logout() {
      try {
        // Hapus token dari API jika diperlukan
        if (this.token) {
          await apiClient.post('/admin/auth/logout', {}, {
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          })
        }
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        // Hapus data lokal
        this.token = null
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
      }
    }
  }
}) 