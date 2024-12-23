<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">List Topics</h1>
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
              Add Topic
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg">
        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-200">
          <div class="max-w-lg w-full">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="search"
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search topics..."
                @input="handleSearch"
              >
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in items" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{{ selectedDepartment }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.category }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="max-h-20 overflow-y-auto">
                    {{ item.content }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button 
                    @click="editItem(item)"
                    class="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </button>
                  <button 
                    @click="deleteItem(item.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            >
              Next
            </button>
          </div>
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
              {{ isEditing ? 'Edit Topic' : 'Add New Topic' }}
            </h3>
            <form @submit.prevent="handleSubmit">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Category</label>
                  <input 
                    type="text"
                    v-model="formData.category_id"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    v-model="formData.content"
                    rows="6"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                    placeholder="Enter content here..."
                  ></textarea>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/utils/axios'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const departmentName = ref(route.params.id)
    const items = ref([])
    const categories = ref([])
    const currentPage = ref(1)
    const totalPages = ref(1)
    const totalItems = ref(0)
    const itemsPerPage = 10
    const searchQuery = ref('')
    const showModal = ref(false)
    const isEditing = ref(false)
    const formData = ref({
      category_id: '',
      content: '',
      department: departmentName.value
    })
    const selectedDepartment = ref('')

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

    const fetchData = async (page = 1) => {
      try {
        const response = await axiosInstance.get('/admin/data/list', {
          params: {
            page,
            search: searchQuery.value,
            department: selectedDepartment.value
          }
        })
        items.value = response.data.data.result
        const pagination = response.data.data.pagination.pagination
        totalPages.value = pagination.last_page
        totalItems.value = response.data.data.total
        currentPage.value = pagination.current_page
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/admin/categories/list')
        categories.value = response.data.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const handleSearch = () => {
      currentPage.value = 1
      fetchData(1)
    }

    const openCreateModal = () => {
      isEditing.value = false
      formData.value = {
        category_id: '',
        content: '',
        department: departmentName.value
      }
      showModal.value = true
    }

    const editItem = (item) => {
      isEditing.value = true
      formData.value = {
        id: item.id,
        category_id: item.category,
        content: item.content,
        department: selectedDepartment.value
      }
      showModal.value = true
    }

    const handleSubmit = async () => {
      try {
        const payload = {
          category_id: formData.value.category_id,
          content: formData.value.content,
          department: selectedDepartment.value
        }

        if (isEditing.value) {
          payload.id = formData.value.id
          await axiosInstance.post('/admin/data/update', payload)
        } else {
          await axiosInstance.post('/admin/data/create', payload)
        }
        closeModal()
        fetchData(currentPage.value)
      } catch (error) {
        console.error('Error submitting data:', error)
      }
    }

    const deleteItem = async (id) => {
      if (confirm('Are you sure you want to delete this item?')) {
        try {
          await axiosInstance.delete(`/admin/data/delete/${id}`)
          fetchData(currentPage.value)
        } catch (error) {
          console.error('Error deleting item:', error)
        }
      }
    }

    const closeModal = () => {
      showModal.value = false
      formData.value = {
        category_id: '',
        content: '',
        department: departmentName.value
      }
    }

    const prevPage = () => {
      if (currentPage.value > 1) {
        fetchData(currentPage.value - 1)
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        fetchData(currentPage.value + 1)
      }
    }

    const goToPage = (page) => {
      fetchData(page)
    }

    watch(() => route.params.id, (newDepartment) => {
      if (newDepartment) {
        selectedDepartment.value = newDepartment
        fetchData(1)
      }
    }, { immediate: true })

    onMounted(() => {
      fetchData()
      fetchCategories()
    })

    return {
      departmentName,
      items,
      categories,
      currentPage,
      totalPages,
      totalItems,
      searchQuery,
      showModal,
      isEditing,
      formData,
      startItem,
      endItem,
      displayedPages,
      handleSearch,
      openCreateModal,
      editItem,
      handleSubmit,
      deleteItem,
      closeModal,
      prevPage,
      nextPage,
      goToPage,
      selectedDepartment
    }
  }
}
</script>

<style>
/* Tambahan style untuk content yang panjang */
.max-h-20 {
  max-height: 5rem;
}

.overflow-y-auto {
  overflow-y: auto;
  white-space: pre-wrap;
}
</style>