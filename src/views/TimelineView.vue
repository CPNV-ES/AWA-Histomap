<template>
  <div class="absolute top-0 flex justify-center w-screen">
    <button @click="pushTop">Ajouter en haut</button>
    <div class="w-1/2"></div>
    <button @click="pushBottom">Ajouter en bas</button>
  </div><!-- DEBUG buttons-->
  <div class="w-screen h-screen flex justify-center px-20 overflow-x-auto">
    <div class="w-full h-full">
      <div class="h-1/2 w-full flex justify-between">
        <div>
          <div class="flex h-full">
            <div class="flex justify-center items-center mr-[80px]">
              <div v-for="(cardtop, index) in cardsTop" :key="'top-' + index">
                <CardTop
                  img_src="/cat.png"
                  title="Titre de l'image"
                  content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- top cards -->

      <div class="relative" :style="{ width: lineWidth + 'px' }">
        <div class="flex items-center justify-between w-full h-4">
          <!-- Point gauche -->
          <div class="bg-slate-300 h-4 w-4 rounded-full"></div>

          <!-- Ligne -->
          <div class="bg-slate-300 h-1 flex-grow"></div>

          <!-- Point droit -->
          <div class="bg-slate-300 h-4 w-4 rounded-full"></div>
        </div>
      </div>
      <!-- Line -->

      <div class="h-1/2 w-full flex justify-between">
        <div>
          <div class="flex h-full">
            <div class="flex justify-center items-center mr-[80px]">
              <div v-for="(cardbottom, index) in cardsBottom" :key="'top-' + index">
                <CardBottom
                  img_src="/cat.png"
                  title="Titre de l'image"
                  content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- bottom cards -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardTop from "@/components/cards/CardTop.vue";
import CardBottom from "@/components/cards/CardBottom.vue";

const cardsTop = ref([]);
const cardsBottom = ref([]);
const lineWidth = ref(getLineWidth());
const containerPadding = 160; // padding of the container left+right
const cardWidth = 688; // width of each card with margin, to be adjusted

function pushTop() {
  cardsTop.value.push({
    img_src: "/cat.png",
    title: "Nouvelle Carte du Haut",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });
  updateLineWidth();
}

function pushBottom() {
  cardsBottom.value.push({
    img_src: "/cat.png",
    title: "Nouvelle Carte du Bas",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });
  updateLineWidth();
}

// Calcul initial et mises à jour
function updateLineWidth() {
  const totalCardsWidth = Math.max(cardsTop.value.length, cardsBottom.value.length) * cardWidth;
  const screenWidth = window.innerWidth - containerPadding;
  lineWidth.value = Math.max(screenWidth, totalCardsWidth);
}

function getLineWidth() {
  return Math.max(window.innerWidth - containerPadding, 0);
}


window.addEventListener("resize", updateLineWidth);
</script>
