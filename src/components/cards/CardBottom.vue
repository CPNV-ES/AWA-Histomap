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

  <!--<CardOld img_src="/cat.png" title="Titre de l'image" content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "/>-->
  <Card img_src="/cat.png" title="Titre de l'image" description="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "/>

</template>

<script setup>
import CardOld from "@/components/cards/CardOld.vue";
import Card from "@/components/card.vue";

defineProps({
  img_src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
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
