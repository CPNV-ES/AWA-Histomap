<template>
  <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white rounded shadow-lg p-8 w-1/3">
      <h2 class="text-xl font-bold mb-4">Ajouter une Histoire</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Titre</label>
          <input type="text" v-model="form.title" class="w-full p-2 border rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Date</label>
          <input type="date" v-model="form.date" class="w-full p-2 border rounded" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Description</label>
          <textarea v-model="form.description" class="w-full p-2 border rounded" required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="mr-2 bg-gray-300 px-4 py-2 rounded">Annuler</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      form: {
        date: '',
        title: '',
        description: ''
      }
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/newTime', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });
        const data = await response.json();
        if (response.ok) {
          alert('Histoire ajoutée avec succès');
          this.closeModal();
          this.$emit('contentAdded', data.content);
        } else {
          alert(`Erreur : ${data.error}`);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout :', error);
        alert('Une erreur est survenue');
      }
    }
  }
};
</script>

<style scoped>
/* Ajoutez du style personnalisé si nécessaire */
</style>
