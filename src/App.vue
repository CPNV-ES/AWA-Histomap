<script setup>
import { ref, onMounted } from 'vue';
import AddModal from '@/components/AddModal.vue';
import Card from '@/components/Card.vue';

const stories = ref([]); // Liste des histoires



const fetchContent = async () => {
  try {
    const response = await fetch('http://localhost:3000/content');
    stories.value = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des contenus :', error);
  }
};

const modalOpen = ref(false);

const handleSave = (data) => {
  console.log('Saved data:', data);
  // TODO: create saving method

};

onMounted(fetchContent);
</script>

<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-4">Timeline Historique</h1>
    <div class="p-4">
      <button @click="modalOpen = true" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
        Add New Item
      </button>
      <AddModal :isOpen="modalOpen" @close="modalOpen = false" @save="handleSave" />
    </div>

    <!-- Liste des histoires affichées avec le composant Card -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="story in stories"
        :key="story._id"
        :date="story.date"
        :title="story.title"
        :description="story.description"
      />
    </div>
  </div>
</template>

<style>

</style>
