<template>

  <div class="w-screen h-screen flex justify-center px-20 overflow-x-auto sticky">
    <div class="w-full h-full">
      <div class="h-1/2 w-full flex justify-between">
        <div>
          <div class="flex h-full">
            <div class="flex justify-center items-center mr-[80px]">
              <div v-for="(cardtop, index) in cardsTop" :key="'top-' + index">
                <CardTop
                  :img_src="cardtop.img_src"
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
                    :img_src="cardbottom.img_src"
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
import { ref, onMounted } from "vue";
import CardTop from "@/components/cards/CardTop.vue";
import CardBottom from "@/components/cards/CardBottom.vue";

const cardsTop = ref([]);
const cardsBottom = ref([]);
const lineWidth = ref(getLineWidth());
const progressLineWidth = ref(0);
const containerPadding  = 160; // padding of the container left+right
const cardWidth = 688; // width of each card with margin, to be adjusted
const marginCards = 144; // margin of each card, to be adjusted
const flip = ref(false);

function pushTop() {
  cardsTop.value.push({
    img_src: "/cat.png",
    title: "Nouvelle Carte du Haut",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    year: "2023",
  });
  updateLineWidth();
}

function pushBottom() {
  cardsBottom.value.push({
    img_src: "/cat.png",
    title: "Nouvelle Carte du Bas",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    year: "2023",
  });
  updateLineWidth(cardWidth);
}

function push() {
  flip.value = !flip.value;
  if (flip.value) {
    pushTop();
  } else {
    pushBottom();
  }
}
// Calcul initial et mises à jour
function updateLineWidth(correction = 0) {
  const totalCardsWidth = Math.max(cardsTop.value.length, cardsBottom.value.length) * cardWidth;
  const screenWidth = window.innerWidth - containerPadding;
  lineWidth.value = Math.max(screenWidth, totalCardsWidth)+correction/2;
}


function getLineWidth() {
  return Math.max(window.innerWidth - containerPadding, 0);
}

function updateProgessLineWidth() {
  const scrollContainer = document.querySelector(".sticky");

  let halfWidth = lineWidth.value / 2;
  let targetWidth = 0;
  let isAnimating = false;

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


  scrollContainer.addEventListener("scroll", () => {
    targetWidth = halfWidth - 32 + scrollContainer.scrollLeft;
    halfWidth = window.innerWidth / 2 - containerPadding / 2;

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(smoothUpdate);
    }
  });
}

window.addEventListener("resize", updateLineWidth);

onMounted(() => {
  updateProgessLineWidth();
});
</script>
