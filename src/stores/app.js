import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    selectedInstrument: null,
    instrumentData: [],
    instrumentHistory: [],
    searchData: [], 
    constituents: [],
  }),
  actions: {
    async fetchInstrumentData(instrumentCode) {
      try {
        const response = await fetch(`/data/resumen/${instrumentCode}.json`)
        if(!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        this.instrumentData = data.data
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        this.instrumentData = []
      }
    },
    async fetchInstrumentHistory(instrumentCode) {
      try {
        const response = await fetch(`/data/history/history-${instrumentCode}.json`)
        if(!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        this.instrumentHistory = data.data
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        this.instrumentHistory = []
      }
    },
    async fetchConstituents() {
      try {
        const response = await fetch(`/data/constituyentes/constituentsList.json`)
        if(!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        this.constituents = data.data

      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    },
    setSearchData(data) {
      this.searchData = data;
    },
    setIntrument(instrument){
      this.fetchInstrumentData(instrument.code);
      this.fetchInstrumentHistory(instrument.code);
    },
    setInitialData(instrument) {
      this.fetchInstrumentData(instrument.code);
      this.fetchInstrumentHistory(instrument.code);
      this.fetchConstituents();
    },
  }
});
