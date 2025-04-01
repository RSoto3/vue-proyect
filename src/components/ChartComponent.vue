<template>
  <div id="chart">
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="filteredSeries"
    />
  
    <div class="filters">
      <button
        v-for="(range, key) in ranges"
        :key="key"
        :class="{ active: selectedRange === key }"
        @click="applyFilter(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
  
  <script>
  import { useAppStore } from "@/stores/app";
  import VueApexCharts from "vue3-apexcharts"
  
  export default {
    name: "ChartComponent",
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      return {
        selectedRange: "5A", 
        ranges: {
          "1D": 1,  
          "1S": 7,  
          "1M": 30, 
          "3M": 90, 
          "6M": 180,
          "1A": 365,
          "5A": 1825
        },
        chartOptions: {
          chart: {
            type: "area",
            height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
            },
          },
          dataLabels: { enabled: false },
          markers: { size: 0 },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
          xaxis: { type: "datetime" },
          tooltip: {
            shared: false,
            theme: "dark",
            style: { fontSize: "14px", color: "#fff" },
            fillSeriesColor: false,
          },
        },
      };
    },
    computed: {
      store() {
        return useAppStore();
      },
      series() {
        return [
          {
            name: this.store.instrumentHistory.info?.name,
            data: this.formatChartData(this.store.instrumentHistory),
          },
        ];
      },
      filteredSeries() {
        return [
          {
            name: this.store.instrumentHistory.info?.name,
            data: this.applyDateFilter(this.series[0].data),
          },
        ];
      },
    },
    methods: {
      formatChartData(data) {
        return data.chart?.map((item) => [
          item.datetimeLastPriceTs * 1000,
          item.closePrice,
        ]) || [];
      },
      applyDateFilter(data) {
        if (!data || data.length === 0) return [];
        const days = this.ranges[this.selectedRange];
        const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;
        return data.filter(([timestamp]) => timestamp >= cutoffTime);
      },
      applyFilter(range) {
        this.selectedRange = range;
      },
    },
  };
  </script>
  <style scoped>
  .filters {
    display: flex;
    justify-content: start;
    margin: 20px;
  }
  .filters button {
    margin: 0 5px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    background: #333;
    color: white;
    border-radius: 5px;
    transition: 0.3s;
  }
  .filters button.active {
    background: #007bff;
  }
  </style>
  