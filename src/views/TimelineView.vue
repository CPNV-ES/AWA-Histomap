<template>

  <div class="w-screen h-screen flex justify-center px-20 overflow-x-auto sticky">
    <div class="w-full h-full">
      <div class="h-1/2 w-full flex justify-between">
        <div>
          <div class="flex h-full">
            <div class="flex justify-center items-center mr-[80px]">
              <div v-for="(cardtop, index) in cardsTop" :key="'top-' + index">
                <CardTop
                  :image="cardtop.image"
                  :title="cardtop.title"
                  :description="cardtop.description"
                  :year="cardtop.year"
                  :margin="marginCards"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- top cards -->

      <div class="relative" :style="{ width: lineWidth + 'px' }">
        <div class="flex items-center justify-between w-full h-4">
          <!-- Left point  -->
          <div class="bg-slate-300 h-4 w-4 rounded-full"></div>

          <!-- Line -->
          <div class="bg-slate-300 h-1 flex-grow"></div>
          <div class="absolute  bg-slate-500 h-1 ml-4" :style="{ width: progressLineWidth + 'px' }" style="transition: width -1s ease-out;"></div>

          <!-- Rigth point -->
          <div class="bg-slate-300 h-4 w-4 rounded-full"></div>
        </div>
      </div>
      <!-- Line -->

      <div class="h-1/2 w-full flex justify-between">
        <div>
          <div class="flex h-full">
            <div class="flex justify-center mr-[80px]">
              <div :style="{width: cardWidth/2 + 'px' }" class="h-1"></div>
              <div v-for="(cardbottom, index) in cardsBottom" :key="'bottom-' + index">
                <div class="pt-[4rem]">
                  <CardBottom
                    :image="cardbottom.image"
                    :title="cardbottom.title"
                    :description="cardbottom.description"
                    :year="cardbottom.year"
                    :margin="marginCards"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- bottom cards -->
    </div>
    <div class="absolute text-left ml-12 pt-16 flex w-screen">
    <button @click="push">Ajouter (DEBUG)</button>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import CardTop from "@/components/cards/CardTop.vue";
import CardBottom from "@/components/cards/CardBottom.vue";

const { stories } = defineProps({
  stories: {
    type: Array,
    required: true,
  },
});

// Initialisation des références
const cardsTop = ref([]);
const cardsBottom = ref([]);
const progressLineWidth = ref(0);
const containerPadding = 160; // padding de la container left + right
const marginCards = 80; // marge de chaque carte
const cardWidth = 398 + marginCards * 2; // largeur de chaque carte avec marge
const flip = ref(false);
const lineWidth = ref(getLineWidth());

// Fonction pour ajouter des cartes en haut
function pushTop() {
  cardsTop.value.push({
    image: "https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg",
    title: "Nouvelle Carte du Haut",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    year: "2023",
  });
  updateLineWidth();
}

// Fonction pour ajouter des cartes en bas
function pushBottom() {
  cardsBottom.value.push({
    image: "https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg",
    title: "Nouvelle Carte du Bas",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    year: "2023",
  });
  updateLineWidth(cardWidth);
}

// Fonction pour alterner l'ajout de cartes
function push() {
  flip.value = !flip.value;
  if (flip.value) {
    pushTop();
  } else {
    pushBottom();
  }
}

// Initialiser la largeur de la ligne
function updateLineWidth(correction = 0) {
  const totalCardsWidth =
    Math.max(cardsTop.value.length, cardsBottom.value.length) * cardWidth;
  const screenWidth = window.innerWidth - containerPadding;
  if (screenWidth < totalCardsWidth) {
    lineWidth.value = totalCardsWidth + correction / 2;
  } else {
    lineWidth.value = screenWidth;
  }
}

// Obtenir la largeur de la ligne
function getLineWidth() {
  return Math.max(window.innerWidth - containerPadding, 0);
}

// Mettre à jour la largeur de la ligne de progression lors du scroll
function updateProgessLineWidth() {
  const scrollContainer = document.querySelector(".sticky");

  let halfWidth = lineWidth.value / 2;
  let targetWidth = 0;
  let isAnimating = false;

  // Mettre à jour la largeur de la ligne avec une animation fluide
  function smoothUpdate() {
    const currentWidth = progressLineWidth.value;
    const delta = targetWidth - currentWidth;

    progressLineWidth.value += delta * 0.1;

    if (Math.abs(delta) > 0.5) {
      requestAnimationFrame(smoothUpdate);
    } else {
      isAnimating = false;
    }
  }

  // Écouter l'événement de scroll
  scrollContainer.addEventListener("scroll", () => {
    console.log("scrollContainer.scrollLeft");
    targetWidth = halfWidth - 32 + scrollContainer.scrollLeft;
    halfWidth = window.innerWidth / 2 - containerPadding / 2;

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(smoothUpdate);
    }
  });
}

// Charger les stories passées en props
function loadStories() {
  if (!stories || stories.length === 0) {
    console.warn("No stories provided");
    return;
  }

  // Boucler sur les stories et les ajouter aux cartes
  for (let i = 0; i < stories.length; i++) {
    if (i % 2 === 0) {
      cardsTop.value.push(stories[i]);
      updateLineWidth();
    } else {
      cardsBottom.value.push(stories[i]);
      updateLineWidth(cardWidth);
    }
  }
  updateProgessLineWidth();
}

// Mettre à jour la largeur de la ligne lors du redimensionnement de la fenêtre
window.addEventListener("resize", updateLineWidth);

// Lifecycle hook monté
onMounted(() => {
  updateProgessLineWidth();
  loadStories();
});

// Surveiller les changements de `stories` pour recharger les cartes dynamiquement
watch(
  () => stories,
  (newStories) => {
    cardsTop.value = [];
    cardsBottom.value = [];
    loadStories();
  }
);
</script>
