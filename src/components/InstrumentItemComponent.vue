<template>
  <td>{{ item.name }}</td>
  <td>{{ formatNumber(item.lastPrice) }}</td>
  <td>{{ formatNumber(item.accumulatedVolumeMoney) }}</td>
  <td :class="getCellClass(item.pctDay)">
    {{ formatPercentage(item.pctDay) }}
  </td>
  <td :class="getCellClass(item.pct30D)">
    {{ formatPercentage(item.pct30D) }}
  </td>
  <td :class="getCellClass(item.pctCY)">
    {{ formatPercentage(item.pctCY) }}
  </td>
  <td :class="getCellClass(item.pct1Y)">
    {{ formatPercentage(item.pct1Y) }}
  </td>
</template>
  
  <script>
  export default {
    name: "InstrumentItemComponent",
    props: {
      item: {
        type: Object, 
        default: () => ({}),
      },
    },
    methods: {
      getCellClass(value) {
        if (typeof value === "number") {
          return value > 0 ? "positive" : value < 0 ? "negative" : "";
        }
        return "";
      },
      formatPercentage(value) {
        return typeof value === "number" ? `${value.toFixed(2)}%` : "N/A";
      },
      formatNumber(value) {
        return typeof value === "number"
          ? value.toLocaleString("es-ES", { minimumFractionDigits: 2 })
          : "N/A";
      },
    },
  };
  </script>
  <style scoped>
  .positive {
    color: green;
  }
  .negative {
    color: red;
  }
  </style>
  