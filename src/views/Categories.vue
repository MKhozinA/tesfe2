<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Categories</h1>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <button 
              @click="$router.push('/dashboard')" 
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Department
            </button>
            <button 
              @click="openCreateModal" 
              class="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg">
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="category in categories" :key="category.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.department }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ category.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <button 
                    @click="editCategory(category)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg class="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ startItem }}</span>
                to
                <span class="font-medium">{{ endItem }}</span>
                of
                <span class="font-medium">{{ totalItems }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="goToPage(page)"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
                  :class="page === currentPage ? 'z-10 bg-primary-50 border-primary-500 text-primary-600' : 'text-gray-500 hover:bg-gray-50'"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              {{ isEditing ? 'Edit Category' : 'Add New Category' }}
            </h3>
            <form @submit.prevent="handleSubmit">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department</label>
                  <select 
                    v-model="formData.department"
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    required
                    :disabled="isEditing"
                  >
                    <option value="">Select Department</option>
                    <option v-for="dept in departments" :key="dept" :value="dept">
                      {{ dept }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    v-model="formData.name"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                    placeholder="Enter category name"
                  />
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                >
                  {{ isEditing ? 'Update' : 'Create' }}
                </button>
                <button
                  type="button"
                  @click="closeModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '@/utils/axios'

export default {
  setup() {
    const router = useRouter()
    const categories = ref([])
    const departments = ref([])
    const currentPage = ref(1)
    const totalPages = ref(1)
    const totalItems = ref(0)
    const showModal = ref(false)
    const isEditing = ref(false)
    const formData = ref({
      id: '',
      department: '',
      name: ''
    })

    const startItem = computed(() => {
      const start = ((currentPage.value - 1) * 10) + 1
      return Math.min(start, totalItems.value)
    })

    const endItem = computed(() => {
      const end = currentPage.value * 10
      return Math.min(end, totalItems.value)
    })
    
    const displayedPages = computed(() => {
      const pages = []
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i)
      }
      return pages
    })

    const fetchCategories = async (page = 1) => {
      try {
        const response = await axiosInstance.get('/admin/categories/list', {
          params: { page }
        })
        if (response.data.data && Array.isArray(response.data.data)) {
          categories.value = response.data.data
        } else if (response.data.data.result) {
          categories.value = response.data.data.result
        }
        
        const pagination = response.data.data.pagination?.pagination || response.data.pagination
        if (pagination) {
          totalPages.value = pagination.last_page
          totalItems.value = pagination.total || response.data.data.total
          currentPage.value = pagination.current_page
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get('/admin/department/list')
        departments.value = response.data.data
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }

    const openCreateModal = () => {
      isEditing.value = false
      formData.value = {
        id: '',
        department: '',
        name: ''
      }
      showModal.value = true
    }

    const editCategory = (category) => {
      isEditing.value = true
      formData.value = {
        id: category.id,
        department: category.department,
        name: category.name
      }
      showModal.value = true
    }

    const handleSubmit = async () => {
      try {
        const payload = {
          name: formData.value.name,
          department: formData.value.department
        }

        if (isEditing.value) {
          payload.id = formData.value.id
          await axiosInstance.post('/admin/categories/update', payload)
        } else {
          await axiosInstance.post('/admin/categories/create', payload)
        }

        closeModal()
        await fetchCategories(currentPage.value)
      } catch (error) {
        console.error('Error submitting category:', error)
      }
    }

    const closeModal = () => {
      showModal.value = false
      formData.value = {
        id: '',
        department: '',
        name: ''
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        fetchCategories(currentPage.value - 1)
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        fetchCategories(currentPage.value + 1)
      }
    }

    const goToPage = (page) => {
      fetchCategories(page)
    }

    onMounted(() => {
      fetchCategories()
      fetchDepartments()
    })

    return {
      categories,
      departments,
      currentPage,
      totalPages,
      totalItems,
      showModal,
      isEditing,
      formData,
      startItem,
      endItem,
      displayedPages,
      openCreateModal,
      editCategory,
      handleSubmit,
      closeModal,
      prevPage,
      nextPage,
      goToPage
    }
  }
}
</script>

<style scoped>
.categories {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.categories-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.categories-table th,
.categories-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.categories-table th {
  background-color: #f5f5f5;
}

/* Menggunakan style yang sama dengan DataList untuk konsistensi */
.btn-add,
.btn-edit,
.btn-delete,
.modal,
.modal-content,
.form-group,
.pagination {
  /* Style sudah didefinisikan di DataList.vue */
}
</style> 