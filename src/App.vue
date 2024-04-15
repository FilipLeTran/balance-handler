<script setup lang="ts">
import { ref, inject } from 'vue'
import BalanceView from './views/BalanceView.vue'
import SelectionView from './views/SelectionView.vue'
import Provider from './components/Provider.vue'

const period = ref('2024-02')
const markets = ref<any>([])
const businessUnits = ref<any>([])
const customers = ref<any>([])
const selectedRetailUnit = ref('')
const selectedBusinessUnit = ref('')
const selectedCustomer = ref('')

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

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
