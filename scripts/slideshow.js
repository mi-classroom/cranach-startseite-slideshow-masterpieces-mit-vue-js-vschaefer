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

        <div class="slideshow-item" v-for="(slide, index) in slideDataItems" :key="index">
          <figure>
            <img
            :src="slide.img_src"
            :title="slide.title"
            :width="slide.width"
            :height="slide.height"
            loading="lazy"
            >
            <figcaption>{{ slide.title }}</figcaption>
          </figure>
          
        </div>
      </div>
      <nav>
      <!-- 
        TODO [5]: 
        Implement buttons to navigate to the next and previous slide 
        connect the buttons to the nextSlide and previousSlide methods
      -->

          <button @click="previousSlide" class="round-button slideshow-button-previous" aria-label="Vorheriges Element">
            <span class="icon">chevron_left</span>
          </button>
          <button @click="nextSlide" class="round-button slideshow-button-next" aria-label="Nächstes Element">
            <span class="icon">chevron_right</span>
          </button>
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
          <li 
            v-for="(thumb, index) in slideDataItems" 
            class="slideshow-thumbnails-item" 
            :class="{ 'active': currentIndex === index }" 
            @click="goToSlide(index)"
          >
            <img
              :src="thumb.img_src"
              :alt="thumb.title" 
              loading="lazy">
          </li>

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
      try {
        const response = await fetch(props.sourceUrl);
        console.log(props.sourceUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        slideDataItems.value = data.results;
        console.log('Slide data loaded:', data);
      } catch (error) {
        console.error('Error fetching slide data:', error);
      }
    }


    // TODO [3]: 
    // Add a computed property with the name isFirstSlide
    // Check if the current slide is the first one
    const isFirstSlide = computed(() => {
      return currentIndex.value === 0;
    });

    // computed property to check if the current slide is the last one
    const isLastSlide = computed(() => {
      return currentIndex.value === slideDataItems.value.length - 1
    });

    const nextSlide = () => {
      if (!isLastSlide.value) {
        currentIndex.value++;
      } else {
        currentIndex.value = 0;
      }
    };

    // TODO [4]: 
    // Implement the previousSlide function
    // This function should decrement currentIndex.value if it is not the first slide
    const previousSlide = () => {
      if (!isFirstSlide.value) {
        currentIndex.value--;
      } else {
        currentIndex.value = slideDataItems.value.length - 1; // Wrap around to the last slide
      }
    };

    // TODO [6]: 
    // Implement the goToSlide function
    // This function should take an index as a parameter and set currentIndex.value to that index
    // Ensure the index is within bounds of slideDataItems
    const goToSlide = (index) => {
      if (index >= 0 && index < slideDataItems.value.length) {
        currentIndex.value = index;
      } else {
        console.warn('Index out of bounds:', index);
      }
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