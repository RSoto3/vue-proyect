<template>
  <v-card class="card">
    <v-tabs
      v-model="tab"
      fixed-tabs
    >
      <v-tab :value="1">
        Resumen
      </v-tab>
      <v-tab :value="2">
        Detalles
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <v-container fluid>
          <v-row style="border-bottom: 2px solid grey;">
            <v-col cols="6">
              Cotización
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.askDatetime }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              VARIACIÓN DIARIA
            </v-col>
            <v-col
              class="text-right"
              cols="6"
              :class="getVariationClass(instrumentPrice.performanceRelative)"
            >
              {{ instrumentPrice.performanceRelative?.toFixed(2) }}%
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              VARIACIÓN ABSOLUTA
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.performanceAbsolute?.toFixed(2) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              VOLUMEN INSTRUMENTOS HOY
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.volumeInstrument }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              VOLUMEN INSTRUMENTOS ACUMULADO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.accumulatedVolumeInstrument }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MONTO TRANSADO HOY
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.volumeMoney }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MONTO TRANSADO ACUMULADO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.accumulatedVolumeMoney }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              NOMBRE DEL MERCADO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentInfo.marketName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MONEDA DE COTIZACIÓN
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentInfo.currencyName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              HORARIO DE OPERACIÓN
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentInfo.hourOpen }} - {{ instrumentInfo.hourClose }}
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <v-tabs-window-item :value="2">
        <v-container fluid>
          <v-row style="border-bottom: 2px solid grey;">
            <v-col cols="6">
              Cotización
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentPrice.askDatetime }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MERCADO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ instrumentInfo.marketName }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              APERTURA
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ formattedPrice(instrumentPrice.openPrice) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              CIERRE ANTERIOR
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ formattedPrice(instrumentPrice.closePrice) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MÁXIMO DIARIO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ formattedPrice(instrumentPrice.maxDay) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MÍNIMO DIARIO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ formattedPrice(instrumentPrice.minDay) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MÁXIMO 52 SEMANAS
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ formattedPrice(instrumentPrice.max52W) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              MÍNIMO 52 SEMANAS
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              {{ formattedPrice(instrumentPrice.min52W) }}
            </v-col>
          </v-row>
          <v-row style="border-bottom: 2px solid grey;">
            <v-col cols="6">
              Variacion**
            </v-col>
            <v-col
              class="text-right"
              cols="6"
            >
              %
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              1 MES
            </v-col>
            <v-col
              class="text-right"
              cols="6"
              :class="getVariationClass(instrumentPrice.pct30D)"
            >
              {{ new Intl.NumberFormat("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(instrumentPrice.pct30D) }}%
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              1 AÑO
            </v-col>
            <v-col
              class="text-right"
              cols="6"
              :class="getVariationClass(instrumentPrice.pctRelW52)"
            >
              {{ new Intl.NumberFormat("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(instrumentPrice.pctRelW52) }}%
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              AÑO A LA FECHA
            </v-col>
            <v-col
              class="text-right"
              cols="6"
              :class="getVariationClass(instrumentPrice.pctRelCY)"
            >
              {{ new Intl.NumberFormat("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(instrumentPrice.pctRelCY) }}%
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
import { useAppStore } from "@/stores/app";
export default {
  name: "SummaryComponent",
  data() {
    return {
      tab: 1,
    };
  },
  computed: {
    instrumentInfo() {
      const store = useAppStore();
      return store.instrumentData?.info || "N/A";
    },
    instrumentPrice() {
      const store = useAppStore();
      return store.instrumentData?.price || "N/A";
    },
  },
  methods: {
  formattedPrice(price) {
    return new Intl.NumberFormat("es-CL", {
      minimumFractionDigits: 2,
    }).format(price);
  },
  getVariationClass(value) {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "neutral";
  }
}
};
</script>
<style scoped>
.card{
    margin: 0px 20px 0px 0px;
    background-color: transparent;
}
.positive {
  color: green;
}

.negative {
  color: red;
}

.neutral {
  color: white;
}
</style>