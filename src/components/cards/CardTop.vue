<template>
  <Card img_src="/cat.png" title="Titre de l'image" content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "/>
  <!-- <Line /> -->
  <!-- <div class=" w-1 h-40"></div> -->

</template>

<script setup>
import Card from "@/components/cards/Card.vue";
import Line from "@/components/cards/Line.vue";

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
