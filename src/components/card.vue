<script setup>
import { computed, ref } from 'vue'

// Référence pour suivre l'état de la carte (recto ou verso)
const isFlipped = ref(false);
const isHidden = ref(false);
const cardHeight = ref(0);

// Fonction pour inverser l'état
const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  setTimeout(()=> {

    isHidden.value = !isHidden.value;
  }, isHidden.value ? 355 : 341 ) // first timeout is recto to disappear

};

const updateHeight = (el) => {
  if (el) {
    cardHeight.value = Math.max(cardHeight.value, el.scrollHeight);
  }
};

const cardStyle = computed(() => ({
  height: `${cardHeight.value}px`,
  minHeight: '24rem', // 384px, equivalent to h-96
}));

</script>

<template>

  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <!-- Card Container -->
    <div class="perspective">
      <div
        class="relative w-64 h-96 transition-all duration-[1000ms]  transform-gpu"
        :class="{ 'rotate-y-180': isFlipped }"
        :style="cardStyle"
      >
        <!-- Front Side -->
        <div
          class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          ref="frontSide"
          @vue:mounted="updateHeight"
          :class="{hidden:isHidden}"
        >
          <img
            src="https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg"
            alt="OpenAI"
            class="w-full h-auto rounded-t-lg"
          />
          <div class="p-6">
            <p class="text-2xl font-bold text-black">2020</p>
            <p class="text-sm font-bold text-gray-800 hover:text-gray-700 mb-2">
              <a href="#">OpenAI announced the GPT-4 multimodal LLM</a>
            </p>
            <div>
              <button
                @click="flipCard"
                class="inline-flex items-center mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 shadow-md hover:shadow-lg"
              >
                Voir l'arrière
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Back Side -->
        <div
          class="backface-hidden absolute rotate-y-180 overflow-hidden max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          ref="backSide"
          @vue:mounted="updateHeight"
        >

          <!-- Blurry Background -->
          <div
            class="absolute inset-0 bg-cover bg-center"
            style="
              background-image: url('https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg');
              filter: blur(4px);
            "
          ></div>

          <!-- Foreground Content -->
          <div class="relative z-10 text-center h-full">
            <div class="relative h-full bg-black bg-opacity-50 rounded-lg p-6 shadow-lg">
              <p class="text-xl font-bold text-white mb-4">OpenAI announced the GPT-4</p>
              <p class="text-sm text-white mb-4">
                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise
                en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie
                depuis les années 1500.
              </p>
              <button
                @click="flipCard"
                class="inline-flex items-center mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 shadow-md hover:shadow-lg"
              >
                Voir l'arrière
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Perspective pour l'effet 3D */
.perspective {
  perspective: 1500px;
}

/* Styles pour la carte */
.relative {
  transform-style: preserve-3d;
}

/* Styles pour les faces */
.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
