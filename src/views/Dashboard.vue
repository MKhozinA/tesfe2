<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Tabler CRUD</h1>
          </div>
          
          <!-- Navigation -->
          <nav class="flex items-center space-x-4">
            <router-link 
              to="/topics" 
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              List Topic
            </router-link>
            <router-link 
              to="/qa" 
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              QA
            </router-link>
            <router-link 
              to="/categories" 
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Category
            </router-link>
            <button 
              @click="handleLogout" 
              class="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-900 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Daftar Department
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="dept in departments" 
              :key="dept"
              @click="navigateToData(dept)"
              class="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg border border-gray-200 hover:border-primary-500 transition-all duration-200 cursor-pointer hover:shadow-lg"
            >
              <div class="flex items-center space-x-4">
                <!-- Icon -->
                <div class="flex-shrink-0">
                  <div class="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900 group-hover:text-primary-600 capitalize">
                    {{ dept }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Department {{ dept }}
                  </p>
                </div>

                <!-- Arrow Icon -->
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-gray-400 group-hover:text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/utils/axios'

export default {
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const departments = ref([])

    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get('/admin/department/list')
        departments.value = response.data.data
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }

    const handleLogout = async () => {
      try {
        await authStore.logout()
        router.push('/login')
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }

    const navigateToData = (deptName) => {
      router.push(`/topics/${deptName}`)
    }

    onMounted(() => {
      fetchDepartments()
    })

    return {
      departments,
      handleLogout,
      navigateToData
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f5f7fb;
}

.header {
  background-color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo h1 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #64748b;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #f1f5f9;
  color: #1e293b;
}

.nav-link.logout {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-link.logout:hover {
  color: #dc2626;
}

.main-content {
  padding: 2rem;
}

.content-container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.content-container h2 {
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.department-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.department-item {
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.department-item:hover {
  background-color: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-content {
    padding: 1rem;
  }

  .content-container {
    overflow-x: auto;
  }
}
</style> 