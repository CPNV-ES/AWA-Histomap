<script>

import Timelineview from '@/views/TimelineView.vue'
import AddModal from '@/components/AddModal.vue'

//const stories = []; // Liste des histoires

export default {
  name: 'App',
  components: {
    AddModal,
    Timelineview,
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
    <Timelineview :stories="stories" />
    <div class="absolute top-0 w-screen flex">
      <div class="p-4 w-48">
        <button
        @click="modalOpen = true"
        class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
        >
        Ajouter une histoire
      </button>
      <AddModal :isOpen="modalOpen" @close="handleCloseModal" @createStory="CreateStory" />
    </div>
    <h1 class="text-center font-serif w-full text-4xl font-bold mt-4">Timeline Historique</h1>

  </div>
</template>

<style></style>
