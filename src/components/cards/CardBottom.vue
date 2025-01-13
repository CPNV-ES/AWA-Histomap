<template>
  <!-- <div class=" w-1 h-40"></div> -->
  <div class="bottom-0 relative rotate flex justify-center h-1 pt-4 rotate-180 translate-x-[-2px]">
    <div>
      <div class="w-1  text-slate-400 " style="writing-mode: vertical-lr;">
        <p class="pb-6 translate-x-[-10px] ">{{ year.substring(0, 4) }}</p>
      </div>
      <div class="w-1 h-1 b translate-y-[-16px]">
        <div class="bg-slate-300 w-[2px] h-4 rounded-full rotate-45 translate-x-[5.5px]"></div>
        <div class="bg-slate-300 w-[2px] h-4 rounded-full rotate-[135deg] translate-x-[-5.5px] translate-y-[-16px]"></div>
      </div>
    </div>
  </div>

  <Card :image=image :title= title :description=description :margin=margin />

</template>

<script setup>
import Card from "@/components/card.vue";

defineProps({
  image: {
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
  margin: {
    type: Number,
    required: true,
  },
});
</script>

<style>
/* Ajout optionnel de styles globaux */
</style>
