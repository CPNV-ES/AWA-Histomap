<script>
export default {
  name: 'Card',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    margin: { type: Number, default: 144 },
    year: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: 'https://esi.uclm.es/assets/uploads/2023/03/0_gpt4.jpeg',
    },
  },
  data() {
    return {
      isFlipped: false,
      isHidden: false,
      cardHeight: 0,
      isDeleting: false, // Pour gérer l'état de suppression
    }
  },
  mounted() {
    this.updateHeight()
  },
  computed: {
    cardStyle() {
      return {
        height: `${this.cardHeight}px`,
        minHeight: '18rem',
      }
    },
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped
      setTimeout(
        () => {
          this.isHidden = !this.isHidden
        },
        this.isHidden ? 355 : 341,
      )
    },
    updateHeight() {
      // Récupérer les éléments via $refs
      const front = this.$refs.frontSide
      const back = this.$refs.backSide
      if (front) {
        this.cardHeight = Math.max(this.cardHeight, front.scrollHeight)
      }
      if (back) {
        this.cardHeight = Math.max(this.cardHeight, back.scrollHeight)
      }
    },
    async confirmDelete() {
      const confirmed = confirm(`Êtes-vous sûr de vouloir supprimer "${this.title}" ?`)
      if (confirmed) {
        await this.deleteStory()
      }
    },
    async deleteStory() {
      this.isDeleting = true
      try {
        // Encodez le titre pour l'utiliser dans l'URL
        const encodedTitle = encodeURIComponent(this.title)
        const response = await fetch(`http://localhost:3000/stories/${encodedTitle}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error(`Erreur lors de la suppression: ${response.statusText}`)
        }

        // Emission de l'événement pour informer le parent
        this.$emit('storyDeleted', this.title)

        alert(`"${this.title}" a été supprimé avec succès. La page va se recharger.`)
        window.location.reload()
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert(`Erreur lors de la suppression de "${this.title}". Veuillez réessayer.`)
      } finally {
        this.isDeleting = false
      }
    },
  },
}
</script>

<template>
  <div
    class="h-[220px] w-[400px]"
    :style="{ marginLeft: margin + 'px', marginRight: margin + 'px' }"
  >
    <div class="perspective h-[220px] w-[400px]">
      <div
        class="relative transition-all duration-[1000ms] transform-gpu"
        :class="{ 'rotate-y-180': isFlipped }"
        :style="cardStyle"
      >
        <!-- Front Side -->
        <div
          class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          ref="frontSide"
          :class="{ hidden: isHidden }"
        >
          <img :src="image" alt="Image Story" class="w-full h-52 rounded-t-lg object-cover" />

          <div class="p-6">
            <p class="text-2xl font-bold text-black dark:text-white dark:hover:text-slate-300">
              {{ date }}
            </p>
            <p
              class="text-sm font-bold text-gray-800 hover:text-gray-700 mb-2 dark:text-white dark:hover:text-slate-300"
            >
              {{ title }}
            </p>
            <div>
              <button
                @click="flipCard"
                class="inline-flex items-center mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 shadow-md hover:shadow-lg"
              >
                Voir l'arrière
              </button>
            </div>
          </div>
        </div>

        <!-- Back Side -->
        <div
          class="backface-hidden absolute rotate-y-180 w-full h-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          ref="backSide"
        >
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="{ backgroundImage: `url(${image})`, filter: 'blur(4px)' }"
          ></div>
          <div class="relative z-10 text-center h-full">
            <div
              class="relative h-full bg-black bg-opacity-50 rounded-lg p-6 shadow-lg flex flex-col justify-center items-center"
            >
              <p
                class="text-xl font-bold text-white mb-4 dark:text-white dark:hover:text-slate-300"
              >
                {{ title }}
              </p>
              <p class="text-sm text-white mb-4 dark:text-white dark:hover:text-slate-300">
                {{ description }}
              </p>
              <div class="flex space-x-4">
                <button
                  @click="flipCard"
                  class="inline-flex items-center mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 shadow-md hover:shadow-lg"
                >
                  Retour
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

                <!-- Bouton de Suppression -->
                <button
                  @click="confirmDelete"
                  class="inline-flex items-center mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-md hover:shadow-lg"
                >
                  Supprimer
                  <svg
                    class="w-4 h-4 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1l12 12M13 1L1 13"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1500px;
}
.relative {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
