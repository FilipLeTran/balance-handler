<script setup lang="ts">
import { ref } from 'vue'
import BalanceView from './views/BalanceView.vue'
import SelectionView from './views/SelectionView.vue'
import Provider from './components/Provider.vue'

const period = ref('2024-02')
const markets = ref<string[]>([])
const businessUnits = ref<string[]>([])
const customers = ref<string[]>([])
const selectedRetailUnit = ref<string>('')
const selectedBusinessUnit = ref<string>('')
const selectedCustomer = ref<string>('')

const handleMarkets = (newMarkets: string[]) => {
  markets.value = newMarkets
}
const handleBusinessUnits = (newBusinessUnits: string[]) => {
  businessUnits.value = newBusinessUnits
}
const handleCustomers = (newCustomers: string[]) => {
  customers.value = newCustomers
}
const handleNewPeriod = (newPeriod: string) => {
  period.value = newPeriod
}
const handleSelectedBusinessUnit = (newBusinessUnit: string) => {
  selectedBusinessUnit.value = newBusinessUnit
}
const handleSelectedRetailUnit = (newRetailUnit: string) => {
  selectedRetailUnit.value = newRetailUnit
}

const handleSelectedCustomer = (newCustomer: string) => {
  selectedCustomer.value = newCustomer
}
</script>

<template>
  <Provider>
    <div>
      <SelectionView
        :markets="markets"
        :businessUnits="businessUnits"
        :customers="customers"
        @new-period="handleNewPeriod"
        @new-retail-unit="handleSelectedRetailUnit"
        @new-business-unit="handleSelectedBusinessUnit"
        @new-customer="handleSelectedCustomer"
      />
      <BalanceView
        :period="period"
        :selectedBusinessUnit="selectedBusinessUnit"
        :selectedRetailUnit="selectedRetailUnit"
        :selectedCustomer="selectedCustomer"
        @markets="handleMarkets"
        @business-units="handleBusinessUnits"
        @customers="handleCustomers"
      />
    </div>
  </Provider>
</template>

<script lang="ts"></script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

div {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.selection-area {
  margin: 1rem;
}

.selection-area h2 {
  margin: 0 1rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
