<template>
  <!-- <div class=" w-1 h-40"></div> -->
  <Card img_src="/cat.png" title="Titre de l'image" content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "/>

</template>

<script setup>
import Card from "@/components/cards/Card.vue";

defineProps({
  img_src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
</script>

<style>
/* Ajout optionnel de styles globaux */
</style>
