<template>
  <v-app>
    <v-main>
      <v-row class="text-center">
        <v-col class="mt-16 mb-16" cols="12">
          <h1 class="display-2 font-weight-bold mb-4">
            Поиск строк в хранилище
          </h1>

          <p class="subheading font-weight-regular mb-4">
            При нажатии на <span class="font-italic">"сгенерировать строки"</span>, в <span class="font-italic">"localStorage"</span> добавятся
            <br>
            <span class="font-weight-bold">30 000 строк</span>
          </p>

          <v-btn
              depressed
              color="primary"
              :loading="isStringLoading"
              :disabled="isGenerationDisabled"
              @click="generationMillionStrings"
          >
            Сгенерировать строки
          </v-btn>
        </v-col>

        <v-col class="mb-8" cols="12">
          Нашлось строк: <span class="font-weight-bold">{{ stringsFilteredCount }}</span>
        </v-col>

        <SearchString :isSearchLoading="isSearchLoading" :strings="strings" />
      </v-row>

      <v-alert
          type="success"
          class="alert"
          v-if="isGenerationStringSuccess"
      >
        Строки сгенерированы
      </v-alert>
    </v-main>
  </v-app>
</template>

<script>
import SearchString from './components/SearchString';

export default {
  name: 'App',

  components: {
    SearchString,
  },

  mounted() {
    if (localStorage.getItem("strings")) {
      this.$store.commit('setIsGenerationStringSuccess', true);
      this.$store.commit('setIsGenerationDisabled', true);
      this.$store.commit('setStrings', JSON.parse(localStorage.getItem('strings')));

      setTimeout(() => {
        this.$store.commit('setIsGenerationStringSuccess', false);
      }, 2000)
    }
  },

  methods: {
    generationMillionStrings() {
      this.$store.commit('generationMillionStrings');
    }
  },

  computed: {
    stringsFilteredCount() {
      return this.$store.getters.getStringsFilteredCount;
    },
    strings() {
      return this.$store.getters.getStrings;
    },
    isStringLoading() {
      return this.$store.getters.getIsStringLoading;
    },
    isGenerationDisabled() {
      return this.$store.getters.getIsGenerationDisabled;
    },
    isGenerationStringSuccess() {
      return this.$store.getters.getIsGenerationStringSuccess;
    },
    isSearchLoading() {
      return this.$store.getters.getIsSearchLoading;
    },
  }
};
</script>

<style scoped>
  .alert {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>