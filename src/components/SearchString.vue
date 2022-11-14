<template>
  <v-container>
    <v-col class="mx-auto" cols="4">
      <v-text-field
          v-model="inputString"
          label="Введите строку"
          :disabled="!strings.length"
          @input="changeInputString"
      ></v-text-field>
      <v-btn
          depressed
          color="primary"
          :loading="isSearchLoading"
          :disabled="!strings.length || !inputString || isSearchDisabled"
          @click="searchString"
      >
        Поиск строки
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'SearchString',
  props: ['strings', 'isSearchLoading'],

  data: () => ({
    inputString: '',
    isSearchDisabled: false,
  }),

  methods: {
    changeInputString() {
      this.isSearchDisabled = false;
    },
    searchString() {
      this.isSearchDisabled = true;
      this.$store.commit('searchString', this.inputString);
    }
  }
}
</script>
