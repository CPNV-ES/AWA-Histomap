<template>
  <div></div>
</template>

<script>
import ContentController from "@/controllers/ContentController";

export default {
  data() {
    return {
      content: [], // Liste des contenus
      isModalOpen: false, // État de la popup
      newContent: {}, //TODO Add the actual attributes of the form
    };
  },
  methods: {
    // Get content from the controller
    async fetchContent() {
      try {
        this.content = await ContentController.getContentList();
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    },
    // Add new content
    async addNewContent() {
      try {
        const createdContent = await ContentController.createContent(this.newContent);
        this.content.unshift(createdContent.content);
        this.closeModal(); // Close popup
      } catch (error) {
        console.error("Failed to add content:", error);
      }
    },
    // Open popup
    openModal() {
      this.isModalOpen = true;
    },
    // Close popup
    closeModal() {
      this.isModalOpen = false;
      this.newContent = {}; //TODO:  Add the attributes of the form |+| Reset the form
    },
  },
  mounted() {
    // Load the content when the component is mounted
    this.fetchContent();
  },
};
</script>

<style>
/* Add your styles here */
</style>
