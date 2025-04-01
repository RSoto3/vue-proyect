<template>
  <div class="instrument-header">
    <div class="header-info">
      <h1>{{ data.name || 'NaN' }}, {{ data.countryName || 'NaN' }}</h1>
    </div>

    <div class="index">
      Índice
    </div>
    <div class="price-info">
      <span>
        Valor actual 
        <span>
          {{ arrowIcon }}
        </span>
        {{ formattedPrice }}
      </span>
      <span>
        Var. % Actual
        <span
          class="number-space"
          :class="getVariationClass(price.performanceRelative)"
        >
          {{ price.performanceRelative?.toFixed(2) }}%
        </span>
      </span>
      <span>
        Var. Puntos Actual 
        <span
          class="number-space"
          :class="getVariationClass(price.performanceAbsolute)"
        >
          {{ price.performanceAbsolute }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "@/stores/app";
import { computed } from "vue";

export default {
  name: 'HeaderComponent',
  setup() {
    const store = useAppStore();
    const data = computed(() => store?.instrumentData?.info || "N/A");
    const price = computed(() => store?.instrumentData?.price || "N/A");
    return {
      data,
      price,
    };
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat("es-CL", {
        minimumFractionDigits: 2,
      }).format(this.price.lastPrice);
    },
    arrowIcon() {
      if (this.price.tend === "up") {
        return "🔼";
      } else if (this.price.tend === "down") {
        return "🔽";
      } else {
        return "="; 
      }
    },
  },
  methods: {
    getVariationClass(value) {
      if (value > 0) {
        return 'positive';
      } else if (value < 0) {
        return 'negative';
      } else {
        return '';
      }
    },
  }
};
</script>

<style scoped>
.instrument-header {
  margin: 0px 20px 0 20px;
  align-items: center;
  border-bottom: 1px solid grey;
}
.index {
  color: rgb(155, 154, 154);
  padding: 10px 0px 10px 0px;
  border-bottom: 1px solid grey;
}
.price-info {
  display: inline-flex;
  padding: 10px 0px 10px 0px;
  gap: 50px;
  align-items: center;
  font-size: 16px;
}
.positive {
  color: green;
}
.number-space {
  margin-left: 8px;
}
.negative {
  color: red;
}
</style>
