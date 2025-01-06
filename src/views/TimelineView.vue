<template>
    <div class="absolute top-0 flex justify-center w-screen">
        <button @click="pushTop">Ajouter en haut</button>
        <div class="w-1/2"></div>
        <button @click="pushBottom">Ajouter en bas</button>
    </div>
    <div class="w-screen h-screen flex justify-center px-20 overflow-x-auto ">
        <div class="w-full h-full">
            <div class="h-1/2 w-full flex justify-between  ">
              <div>
                <!-- <div class="h-24 w-1"></div> -->
                <div class="flex h-full">
                  <div class="flex justify-center bg-slate-400 items-center">
                    <div v-for="(cardtop, index) in cardsTop" :key="'top-' + index" >
                      <CardTop img_src="/cat.png" title="Titre de l'image" content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "/>
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- top cards -->

            <div class="justify-center flex left-0 right-0 h-0 items-center z-10 relative">
              <div class="bg-slate-300 h-4 w-4 rounded-full"></div>
              <div class="bg-slate-300 h-1 w-full "></div>
              <div class="bg-slate-300 h-4 w-4 rounded-full"></div>
          </div>
          <!-- Line -->

          <div class="h-1/2 w-full flex justify-between z-0 relative">
              <div>
                  <div class="flex h-full">
                      <div class="flex justify-center bg-slate-400 items-center">
                          <div v-for="(cardbottom, index) in cardsBottom" :key="'bottom-' + index">
                              <CardBottom img_src="/cat.png" title="Titre de l'image" content="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "/>
                          </div>
                      </div>
                  </div>
              </div>
          </div><!-- bottom cards -->
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import CardTop from "@/components/cards/CardTop.vue";
import CardBottom from "@/components/cards/CardBottom.vue";
//import CardBottom from "@/components/cards/CardBottom.vue";

const cardsTop = ref([]); // Utilisation de ref pour réactiver le tableau
const cardsBottom = ref([]); // Utilisation de ref pour réactiver le tableau

function pushTop() {
    cardsTop.value.push({
        img_src: "/cat.png",
        title: "Nouvelle Carte du Haut",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});
}
function pushBottom() {
    cardsBottom.value.push({
        img_src: "/cat.png",
        title: "Nouvelle Carte du Bas",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
});
}
</script>
