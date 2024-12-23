<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Question & Answer</h1>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <button 
              @click="$router.push('/dashboard')" 
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Department
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg">
        <div class="p-6">
          <form @submit.prevent="submitQuestion" class="space-y-6">
            <!-- Topic Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Select Topic
              </label>
              <select 
                v-model="selectedTopic"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Choose a topic</option>
                <option v-for="topic in topics" :key="topic.id" :value="topic.id">
                  {{ topic.name }}
                </option>
              </select>
            </div>

            <!-- Question Input -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <textarea 
                v-model="question"
                rows="4"
                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Type your question here..."
                required
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                class="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Submit Question
              </button>
            </div>
          </form>

          <!-- Answer Section -->
          <div v-if="answer" class="mt-8">
            <div class="rounded-md bg-gray-50 p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Answer:</h3>
              <div class="prose prose-sm max-w-none text-gray-700">
                {{ answer }}
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
import axiosInstance from '@/utils/axios'

export default {
  setup() {
    const router = useRouter()
    const topics = ref([])
    const selectedTopic = ref('')
    const question = ref('')
    const answer = ref('')

    const fetchTopics = async () => {
      try {
        const response = await axiosInstance.get('/admin/topics/list')
        topics.value = response.data.data
      } catch (error) {
        console.error('Error fetching topics:', error)
      }
    }

    const submitQuestion = async () => {
      try {
        const response = await axiosInstance.post('/admin/qa/answer', {
          topic_id: selectedTopic.value,
          question: question.value
        })
        answer.value = response.data.answer
        
        // Clear form after successful submission
        question.value = ''
      } catch (error) {
        console.error('Error submitting question:', error)
      }
    }

    onMounted(() => {
      fetchTopics()
    })

    return {
      topics,
      selectedTopic,
      question,
      answer,
      submitQuestion
    }
  }
}
</script>

<style scoped>
.qa-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.qa-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.answer-section {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.answer-content {
  white-space: pre-wrap;
  line-height: 1.6;
}
</style> 