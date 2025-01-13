<template>
  <div v-if="isOpen" class="z-50 fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Ajouter une histoire</h2>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input
            v-model="formData.title"
            type="text"
            id="title"
            required
            class="mt-1 mg-1 block w-full rounded-md border-gray-300 focus:border-amber-600 shadow-sm sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
          <input
            v-model="formData.date"
            type="date"
            id="date"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="formData.description"
            id="description"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700">Lien de l'image</label>
          <textarea
            v-model="formData.image"
            id="description"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Annuler
          </button>
          <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ModalCreateStory',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        title: '',
        date: '',
        description: '',
        image: ''
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },

    validateForm() {
      if (this.formData.title.length < 5) {
        return alert('Le titre doit contenir au moins 5 caractères.')
      } else if (this.formData.description.length < 100) {
        return alert(
          'La description doit contenir au moins 100 caractères pour avoir de la cohérence.',
        )
      }
      return true
    },

    async onSubmit() {
      if (!this.validateForm()) return

      try {
        const response = await axios.post('http://localhost:3000/stories', this.formData)

        const { insertedId } = response.data

        const newStory = {
          ...this.formData,
          _id: insertedId
        }

        this.$emit('createStory', newStory)

        this.formData = { title: '', date: '', description: '', image: '' }

        this.closeModal()
      } catch (error) {
        console.error('Erreur lors de la création de la story :', error)
        alert('Impossible de créer la story.')
      }
    }
  }
}
</script>

<style scoped>

</style>
