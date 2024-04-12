<script setup lang="ts">
import { ref } from 'vue'
import BalanceView from './components/BalanceView.vue'
import SelectionToast from './components/SelectionToast.vue'
const period = ref('2024-04')
const markets = ref<any>([])
const businessUnits = ref<any>([])

const updatePeriod = (newPeriod: string) => {
  period.value = newPeriod
  console.log(period.value)
}
const handleMarkets = (newMarkets: string[]) => {
  markets.value = newMarkets
}
const handleBusinessUnits = (newBusinessUnits: string[]) => {
  businessUnits.value = newBusinessUnits
  console.log('In App function: ', businessUnits.value)
}
</script>

<template>
  <div>
    <header class="selection-area">
      <SelectionToast :itemList="markets">Market</SelectionToast>
      <span>
        <h2>Period:</h2>
        <input
          type="month"
          min="2023-09"
          max="2025-01"
          v-model="period"
          @change="
            (event) => {
              updatePeriod(event.target.value)
            }
          "
        />
      </span>
      <SelectionToast :itemList="businessUnits">Business Unit</SelectionToast>
    </header>
    <BalanceView :period="period" @markets="handleMarkets" @business-units="handleBusinessUnits" />
  </div>
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
