<script>
import AddModal from '@/components/AddModal.vue'
import Card from '@/components/card.vue'

//const stories = []; // Liste des histoires

export default {
  name: 'App',
  components: {
    AddModal,
    Card
  },
  methods: {
    CreateStory(newStory) {
      console.log('New story:', newStory)
    },
    async fetchContent() {
      try {
        const response = await fetch('http://localhost:3000/stories')
        this.stories = await response.json()
        console.log('Contenus récupérés :', this.stories)
      } catch (error) {
        console.error('Erreur lors de la récupération des contenus :', error)
      }
    },
    handleCloseModal() {
      this.modalOpen = false
      this.fetchContent()
    },
  },
  data() {
    return {
      modalOpen: false,
      stories: [],
    }
  },


  mounted() {
    this.fetchContent()
  },
}
</script>

<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-4">Timeline Historique</h1>
    <div class="p-4">
      <button
        @click="modalOpen = true"
        class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
      >
        Add New Item
      </button>
      <AddModal :isOpen="modalOpen" @close="handleCloseModal" @createStory="CreateStory" />
    </div>

    <!-- Liste des histoires affichées avec le composant Card -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="story in stories"
        :key="story._id"
        :date="story.date"
        :title="story.title"
        :image="story.image"
        :description="story.description"
      />
    </div>
  </div>
</template>

<style></style>
