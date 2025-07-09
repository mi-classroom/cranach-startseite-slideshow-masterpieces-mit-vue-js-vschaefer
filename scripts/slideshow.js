import { createApp, defineComponent, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const slideShow = defineComponent({
  props: ['sourceUrl'],
  template: /* html */`
    <div class="slideshow">
      <div 
        class="slideshow-wrapper"
        ref="slidesContainer"
        :style="{ transform: slideContainerTransform }"
        >
        <!-- 
          TODO [2]:
          Implement slide show items
        -->

      </div>
      <nav>
      <!-- 
        TODO [5]: 
        Implement buttons to navigate to the next and previous slide 
        connect the buttons to the nextSlide and previousSlide methods
        hint: 'v-for="(thumb, index) in slideDataItems' can be used to iterate over the slides
      -->
        
        
      </nav>
      <div class="slideshow-thumbnails">
        <ul 
          class="slideshow-thumbnails-list"
          ref="thumbnailsContainer"
          :style="{ transform: thumbnailsContainerTransform }"
          >
          <!-- 
            TODO [7]: 
            Implement thumbnail navigation
            connect the thumbnails to the goToSlide method
            hint: 'v-for="(thumb, index) in slideDataItems' can be used to iterate over the slides          
           -->
        </ul>
      </div> 
    </div>
  `,
  setup(props) {
    const slideDataItems = ref([]);
    const currentIndex = ref(0);
    const slidesContainer = ref(null);
    const thumbnailsContainer = ref(null);

    // TODO [1]: 
    // Fetch slide data from the provided source URL
    // Use props.sourceURL as parameter for the fetch request
    // pass the fetched data to slideDataItems.value
    const loadSlidesData = async () => {
    }


    // TODO [3]: 
    // Add a computed property with the name isFirstSlide
    // Check if the current slide is the first one
    const isFirstSlide = computed(() => {
      return 0;
    }
    );

    // computed property to check if the current slide is the last one
    const isLastSlide = computed(() => {
      return currentIndex.value === slideDataItems.value.length - 1
    });

    const nextSlide = () => {
      if (!isLastSlide.value) {
        currentIndex.value++;
      }
    };

    // TODO [4]: 
    // Implement the previousSlide function
    // This function should decrement currentIndex.value if it is not the first slide
    const previousSlide = () => {
    };

    // TODO [6]: 
    // Implement the goToSlide function
    // This function should take an index as a parameter and set currentIndex.value to that index
    // Ensure the index is within bounds of slideDataItems
    const goToSlide = (index) => {
    };

    // Computed propertie to handle the translation of the slides
    const slideContainerTransform = computed(() => {
      return `translateX(-${currentIndex.value * 100}%)`;
    });
    
    // Computed property to handle the translation of the thumbnails
    const thumbnailsContainerTransform = computed(() => {
      if (!thumbnailsContainer.value || !thumbnailsContainer.value.children) { 
        return 'translateX(0)';
      }

      const currentThumbnail = thumbnailsContainer.value.children[currentIndex.value];
      if (!currentThumbnail) { 
        return 'translateX(0)';
      }

      const containerWidth = thumbnailsContainer.value.parentElement.offsetWidth;
      const totalWidth = thumbnailsContainer.value.scrollWidth;

      let offSetX = -currentThumbnail.offsetLeft;
      offSetX = Math.min(0, offSetX);
      offSetX = Math.max(containerWidth - totalWidth, offSetX);

      return `translateX(${offSetX}px)`;
      });
    
    return {
      loadSlidesData,
      slideDataItems,
      nextSlide,
      previousSlide,
      goToSlide,
      slidesContainer,
      thumbnailsContainer,
      slideContainerTransform,
      thumbnailsContainerTransform,
      currentIndex

    };
  },
  mounted() {
    this.loadSlidesData();
  }
});

createApp({
  components: {
    slideShow
  },

}).mount('#app');