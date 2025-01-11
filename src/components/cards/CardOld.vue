<template>
      <div
        class="h-[270px] w-[400px] "
        :style="{ marginLeft: margin + 'px', marginRight: margin + 'px' }"
      >
      <!-- Conteneur principal relatif pour positionner les enfants -->
      <div class="h-full w-full relative rounded-lg overflow-hidden hover:scale-105 transition-all duration-500">
        <!-- Image -->
        <img :src="image" alt="cat" class="rounded-lg blur-lg">
        <!-- Contenu superposé -->
        <div class="absolute inset-0 flex flex-col justify-center items-center bg-black/30 p-5 text-white">
          <div class="w-full h-1/5">
            <h1>{{ title }}</h1>
          </div>
          <hr class="w-full bg-white/30 my-1 mb-2">
          <div class="w-full h-4/5">
            <p>{{ content }}</p>
          </div>
        </div>
      </div>
      <!-- Section décorative -->
    </div>
  </template>

  <script>
  export default {
    props: {
      image: {
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
      height: {
        type: String,
        default: "400px",
      },
      width: {
        type: String,
        default: "400px",
      },
      margin: {
        type: String,
        default: "144",
      },
    },
  };
  </script>

  <style>
  /* Ajout optionnel de styles globaux */
  </style>
