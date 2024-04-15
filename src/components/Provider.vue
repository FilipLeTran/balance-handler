<script setup lang="ts">
import { provide, reactive } from 'vue'
import { type IGlobalState } from './Interfaces'

const globalState: IGlobalState = reactive({
  retailUnit: '',
  businessUnit: '',
  period: '',
  regionCustomers: [],
  setRetailUnit: (retailUnit) => {
    globalState.retailUnit = retailUnit
  },
  setBusinessUnit: (businessUnit) => {
    globalState.businessUnit = businessUnit
  },
  setPeriod: (period) => {
    globalState.period = period
  },
  setRegionCustomers: (regionCustomers) => {
    globalState.regionCustomers = regionCustomers
  }
})

provide('globalState', globalState)
</script>

<template>
  <slot></slot>
</template>
