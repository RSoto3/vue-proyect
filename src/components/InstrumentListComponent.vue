<template>
  <v-row class="instrument-list">
    <v-col cols="6">
      <v-table>
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="sortable-header"
              @click="sortBy(header.key)"
            >
              {{ header.title }}
              <v-icon v-if="sortByKey === header.key">
                {{ sortOrder === 'asc' ? 'mdi-arrow-up' : sortOrder === 'desc' ? 'mdi-arrow-down' : '' }}
              </v-icon>
              <v-icon v-else>
                mdi-arrow-up-down
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in leftItems"
            :key="index"
            class="instrument-item"
            @click="handleInstrumentClick(item)"
          >
            <InstrumentItemComponent
              :item="item"
            />
          </tr>
        </tbody>
      </v-table>
    </v-col>

    <v-col cols="6">
      <v-table>
        <thead>
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="sortable-header"
              @click="sortBy(header.key)"
            >
              <span class="header-title">{{ header.title }}</span>
              <v-icon class="header-icon">
                {{
                  sortByKey === header.key
                    ? sortOrder === 'asc'
                      ? 'mdi-arrow-up'
                      : sortOrder === 'desc'
                        ? 'mdi-arrow-down'
                        : 'mdi-arrow-up-down'
                    : 'mdi-arrow-up-down'
                }}
              </v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in rightItems"
            :key="index"
            class="instrument-item"
            @click="handleInstrumentClick(item)"
          >
            <InstrumentItemComponent
              :item="item"
            />
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script>
import InstrumentItemComponent from './InstrumentItemComponent.vue';
import { useAppStore } from "@/stores/app";

export default {
  name: "InstrumentListComponent",
  components: {
    InstrumentItemComponent,
  },
  data() {
    return {
      headers: [
        { title: "Nombre", key: "name" },
        { title: "Último", key: "lastPrice" },
        { title: "Monto(MM)", key: "volumeMoney" },
        { title: "Var dia", key: "pctDay" },
        { title: "Var 30d**", key: "pct30D" },
        { title: "Año Actual", key: "pctCY" },
        { title: "12 Meses", key: "pct1Y" }
      ],
      sortByKey: "", 
      sortOrder: "", 
    };
  },
  computed: {
    transformedData() {
    const store = useAppStore();
    const rawData = store.constituents?.constituents || [];

    return rawData.map((item) => ({
      name: item.name,
      code: item.codeInstrument,
      lastPrice: item.lastPrice,
      accumulatedVolumeMoney: item.accumulatedVolumeMoney / 1000000,
      pctDay: item.pctDay,
      pct30D: item.pct30D,
      pctCY: item.pctCY,
      pct1Y: item.pct1Y,
    }));
  },
    leftItems() {
      return this.sortedItems.slice(0, Math.ceil(this.transformedData.length / 2));
    },
    rightItems() {
      return this.sortedItems.slice(Math.ceil(this.transformedData.length / 2));
    },
    sortedItems() {
      if (!this.sortByKey || this.sortOrder === "") {
        return this.transformedData;
      }
      const itemsCopy = [...this.transformedData];
      return itemsCopy.sort((a, b) => {
        const aValue = a[this.sortByKey];
        const bValue = b[this.sortByKey];
        const order = this.sortOrder === "asc" ? 1 : -1;

        if (aValue < bValue) return -order;
        if (aValue > bValue) return order;
        return 0;
      });
    },
  },
  methods: {
    formatNumber(value, decimals = 2) {
    if (typeof value !== "number") return "N/A";
    return value.toLocaleString("es-CL", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  },
  handleInstrumentClick(item) {
      const store = useAppStore();
      store.setIntrument(item);
    },

  formatPercentage(value) {
    if (typeof value !== "number") return "N/A";
    return `${value.toFixed(2)}%`;
  },
    sortBy(key) {
      if (this.sortByKey === key) {
        if (this.sortOrder === "") {
          this.sortOrder = "asc";
        } else if (this.sortOrder === "asc") {
          this.sortOrder = "desc";
        } else {
          this.sortOrder = "";
          this.sortByKey = "";
        }
      } else {
        this.sortByKey = key;
        this.sortOrder = "asc";
      }
    },
  },
};
</script>

<style scoped>
.sortable-header {
  gap: 8px; 
  cursor: pointer;
  padding: 8px 12px;
  white-space: nowrap;
}

.header-title {
  flex-grow: 1; 
}

.header-icon {
  flex-shrink: 0; 
}
.instrument-list{
  margin: 0px 20px 0px 20px;
}
.instrument-item{
  cursor: pointer;
 
}
.instrument-item:hover {
  background-color: grey;
}

</style>