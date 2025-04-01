<template>
  <div>
    <v-row><SearchBarComponent /></v-row>
    <v-row>
      <v-col cols="9">
        <HeaderComponent />
        <ChartComponent />
      </v-col>
      <v-col cols="3">
        <SummaryComponent />
      </v-col>
    </v-row>
    <v-row>
      <TabComponent />
    </v-row>
    <v-row>
      <InstrumentListComponent />
    </v-row>
  </div>
</template>

<script>
import { useAppStore } from '@/stores/app.js';
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import SummaryComponent from '@/components/SummaryComponent.vue';
import ChartComponent from '@/components/ChartComponent.vue';
import TabComponent from '@/components/TabComponent.vue';
import InstrumentListComponent from '@/components/InstrumentListComponent.vue';

export default {
  name: "App",
  components: {
    SearchBarComponent,
    HeaderComponent,
    SummaryComponent,
    ChartComponent,
    TabComponent,
    InstrumentListComponent
  },
  async mounted() {
    const appStore = useAppStore();
    const selectedInstrumentCode = {code: "IPSA"};
    await appStore.setInitialData(selectedInstrumentCode);
  },
};
</script>
