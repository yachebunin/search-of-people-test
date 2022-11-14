import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    strings: [],
    characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    stringsFilteredCount: 0,
    isStringLoading: false,
    isGenerationDisabled: false,
    isGenerationStringSuccess: false,
    isSearchLoading: false,
  },
  getters: {
    getStringsFilteredCount (state) {
      return state.stringsFilteredCount;
    },
    getStrings (state) {
      return state.strings;
    },
    getIsStringLoading (state) {
      return state.isStringLoading;
    },
    getIsGenerationDisabled (state) {
      return state.isGenerationDisabled;
    },
    getIsGenerationStringSuccess (state) {
      return state.isGenerationStringSuccess;
    },
    getIsSearchLoading (state) {
      return state.isSearchLoading;
    },
  },
  mutations: {
    setStringsFilteredCount (state, val) {
      state.stringsFilteredCount = val;
    },
    setStrings (state, strings) {
      state.strings = strings;
    },
    setIsGenerationStringSuccess(state, is) {
      state.isGenerationStringSuccess = is;
    },
    setIsGenerationDisabled(state, is) {
      state.isGenerationDisabled = is;
    },
    generationMillionStrings(state) {
      state.isStringLoading = true;

      setTimeout(() => {
        for (let i = 0; i < 30000; i++) {
          this.commit('generationString');
        }

        localStorage.setItem("strings", JSON.stringify(state.strings));

        this.commit('setIsGenerationStringSuccess', true);
        this.commit('setIsGenerationDisabled', true);
        state.isStringLoading = false;

        setTimeout(() => {
          this.commit('setIsGenerationStringSuccess', false);
        }, 2000);
      }, 1000);
    },
    generationString(state) {
      let result = '';

      for (let i = 0; i < 100; i++) {
        result += state.characters[Math.round(Math.random() * state.characters.length)];
      }

      state.strings.push(result);
    },
    searchString(state, val) {
      state.isSearchLoading = true;

      this.commit('setStringsFilteredCount', state.strings.filter((str) => {
        return str.startsWith(val);
      }).length);

      state.isSearchLoading = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
