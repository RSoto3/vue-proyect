<template>
  <v-row
    class="input-container"
    align="center"
  >
    <v-text-field
      v-model="search"
      prepend-inner-icon="mdi-magnify"
      label="Busca un instrumento"
      class="search-input"
      variant="outlined"
    />
    <v-list
      v-if="search.length && filteredInstruments.length"
      class="suggestions-list"
      dense
      max-height="200px"
    >
      <v-list-item
        v-for="(instrument, index) in filteredInstruments"
        :key="index"
        @click="selectInstrument(instrument)"
      >
        <v-list-item-title>{{ instrument.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-row>
</template>

<script>
import { useAppStore } from "@/stores/app";

export default {
  name: "SearchBarComponent",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    filteredInstruments() {
      const store = useAppStore();
      return store.searchData.filter(instrument =>
        instrument.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  mounted() {
    const store = useAppStore();
    store.setSearchData([
      { name: "IPSA", code: "IPSA" },
      { name: "CAP", code: "CAP" },
      { name: "BSANTANDER", code: "BSANTANDER" },
      { name: "BCI", code: "BCI" },
      { name: "ANDINA-B", code: "ANDINA-B" },
      { name: "AGUAS-A", code: "AGUAS-A" },
    ]);
  },
  methods: {
    selectInstrument(instrument) {
      const store = useAppStore();
      store.setIntrument(instrument);
      this.search = instrument.name;
      this.$nextTick(() => {
        this.search = ""; 
      });
    },
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  margin: 20px 20px 0 20px;
  align-items: center;
  position: relative;
}

.search-input {
  flex: 1;
  font-size: 16px;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
}
</style>
