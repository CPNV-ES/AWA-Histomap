<script>
//import CardShort from './components/CardShort.vue';
import Card from '@/components/card.vue'
import AddModal from '@/components/AddModal.vue';

export default {
  name: 'App',
  components: {
    Card,
  },
};

const modalOpen = ref(false);

const handleSave = (data) => {
  console.log('Saved data:', data);
  // TODO: create saving method

};

onMounted(fetchContent);
</script>

<template>
  <div id="app" class="md:container">
    <Card />
      <button @click="modalOpen = true" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
        Add New Item
      </button>
      <AddModal :isOpen="modalOpen" @close="modalOpen = false" @save="handleSave" />
    </div>
  </div>
</template>

<style>

</style>
