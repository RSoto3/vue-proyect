<template>
  <v-row class="row">
    <v-col cols="5">
      <v-tabs
        class="tab"
        fixed-tabs
      >
        <v-tab @click="handleTabClick('IPSA')">
          IPSA
        </v-tab>
        <v-tab>
          IGPA
        </v-tab>
        <v-tab>
          NASDAQ
        </v-tab>
        <v-tab>
          DOW JONES
        </v-tab>
        <v-tab>
          SP/BVL
        </v-tab>
      </v-tabs>
    </v-col>
  </v-row>
</template>
<script>
import { useAppStore } from "@/stores/app";
export default{
  name: "TabComponent",
  methods: {
    handleTabClick(tab) {
      const store = useAppStore();
      store.setIntrument({ code: tab });
    },
  },
};
</script>


<style scoped>
.tab{
    background-color: transparent;
}
.row{
    margin: 0px 20px 0px 20px;
}
</style>