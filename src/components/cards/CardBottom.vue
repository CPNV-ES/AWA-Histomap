<template>
  <!-- <div class=" w-1 h-40"></div> -->
  <div class="bottom-0 relative rotate flex justify-center h-1 pt-12 rotate-180 translate-x-[-2px]">
    <div>
      <div class="w-1  text-slate-400 " style="writing-mode: vertical-lr;">
        <p class="pb-8 translate-x-[-10px] ">{{ year }}</p>
      </div>
      <div class="w-1 h-1 b translate-y-[-16px]">
        <div class="bg-slate-300 w-[2px] h-4 rounded-full rotate-45 translate-x-[5.5px]"></div>
        <div class="bg-slate-300 w-[2px] h-4 rounded-full rotate-[135deg] translate-x-[-5.5px] translate-y-[-16px]"></div>
      </div>
    </div>
  </div>

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
  year: {
    type: String,
    required: true,
  },
});
</script>

<style>
/* Ajout optionnel de styles globaux */
</style>
