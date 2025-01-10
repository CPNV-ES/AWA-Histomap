<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Ajouter une story</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input
            v-model="title"
            type="text"
            id="title"
            class="mt-1 mg-1 block w-full rounded-md border-gray-300 focus:border-amber-600 shadow-sm sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
          <input
            v-model="date"
            type="date"
            id="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="description"
            id="description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Cancel
          </button>
          <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});


const emit = defineEmits(['close', 'save']);


const title = ref('');
const date = ref('');
const description = ref('');


const closeModal = () => {
  emit('close');
};

const submitForm = () => {
  const data = { title: title.value, date: date.value, description: description.value };
  emit('save', data);
  closeModal();
};
</script>

<style scoped>

</style>
