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

<script>
import { ref, onMounted } from "vue";
import CardTop from "@/components/cards/CardTop.vue";
import CardBottom from "@/components/cards/CardBottom.vue";

const cardsTop = ref([]);
const cardsBottom = ref([]);
const progressLineWidth = ref(0);
const containerPadding = 160; // padding of the container left+right
const marginCards = 80; // margin of each card, to be adjusted
const cardWidth = 398 + marginCards*2; // width of each card with margin, to be adjusted
const flip = ref(false);
const lineWidth = ref(getLineWidth());

function pushTop() {
  cardsTop.value.push({
    img_src: "https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg",
    title: "Nouvelle Carte du Haut",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    year: "2023",
  });
  updateLineWidth();
}

function pushBottom() {
  cardsBottom.value.push({
    img_src: "https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg",
    title: "Nouvelle Carte du Bas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    year: "2023",
  });
  updateLineWidth(cardWidth);
}

// Add one card to the top and next to the bottom
function push() {
  flip.value = !flip.value;
  if (flip.value) {
    pushTop();
  } else {
    pushBottom();
  }
}

// Initialize the line width
function updateLineWidth(correction = 0) {
  const totalCardsWidth = Math.max(cardsTop.value.length, cardsBottom.value.length) * cardWidth;
  const screenWidth = window.innerWidth - containerPadding;
  lineWidth.value = Math.max(screenWidth, totalCardsWidth)+correction/2;
}

// Get the line width
function getLineWidth() {
  return Math.max(window.innerWidth - containerPadding, 0);
}

// Update the line width on scroll
function updateProgessLineWidth() {
  const scrollContainer = document.querySelector(".sticky");

  let halfWidth = lineWidth.value / 2;
  let targetWidth = 0;
  let isAnimating = false;

  // Smoothly update the line width on scroll to have the progress line follow the scroll with "inertia"
  function smoothUpdate() {
    const currentWidth = progressLineWidth.value;
    const delta = targetWidth - currentWidth;

    progressLineWidth.value += delta * 0.1;

    // limit the animation to not have a teleport effect
    if (Math.abs(delta) > 0.5) {
      requestAnimationFrame(smoothUpdate);
    } else {
      isAnimating = false;
    }
  }

  // Update the target width on scroll
  scrollContainer.addEventListener("scroll", () => {
    targetWidth = halfWidth - 32 + scrollContainer.scrollLeft;
    halfWidth = window.innerWidth / 2 - containerPadding / 2;

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(smoothUpdate);
    }
  });
}

function loadStories() {
  //loop over the stories and push them to the cards
  for (let i = 0; i < stories.length; i++) {
    if (i % 2 === 0) {
      cardsTop.value.push(stories[i]);
    } else {
      cardsBottom.value.push(stories[i]);
    }
  }
}
window.addEventListener("resize", updateLineWidth);

onMounted(() => {
  updateProgessLineWidth();
  loadStories();
});

export default {
  components: {
    CardTop,
    CardBottom,
  },
  setup() {
    return {
      cardsTop,
      cardsBottom,
      lineWidth,
      progressLineWidth,
      containerPadding,
      marginCards,
      cardWidth,
      flip,
      push,
    };
  },
  props: {
    stories: {
      type: Array,
      required: false,
    },
  },
};
</script>
