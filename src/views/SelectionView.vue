<script setup lang="ts">
import { ref, defineProps, inject, computed } from 'vue'
import { type IGlobalState } from '@/components/Interfaces'
import SelectionToast from '../components/SelectionToast.vue'

const props = defineProps<{
  markets?: string[]
  businessUnits?: string[]
  customers?: string[]
}>()

const emit = defineEmits(['newPeriod', 'newRetailUnit', 'newBusinessUnit', 'newCustomer'])

const showCustomers: any = computed(() => {
  return retailUnit.value !== '' && businessUnit.value === ''
})

const globalState = inject<IGlobalState>('globalState')

const period = ref('2024-02')
const retailUnit = ref('')
const businessUnit = ref('')
const customer = ref('')

globalState?.setPeriod(period.value)

const updatePeriod = (newPeriod: string) => {
  period.value = newPeriod
  emit('newPeriod', period.value)
  globalState?.setPeriod(newPeriod)
  console.log('Inside SelectionView.updateperiod: ', globalState)
}

const updateRetailUnit = (newRetailUnit: string) => {
  retailUnit.value = newRetailUnit
  emit('newRetailUnit', retailUnit.value)
}
const updateBusinessUnit = (newBusinessUnit: string) => {
  businessUnit.value = newBusinessUnit
  emit('newBusinessUnit', businessUnit.value)
}

const updateCustomer = (newCustomer: string) => {
  customer.value = newCustomer
  emit('newCustomer', customer.value)
}
</script>

<template>
  <header class="selection-area">
    <SelectionToast :itemType="'retailUnit'" :itemList="markets" @new-selected="updateRetailUnit"
      >Market</SelectionToast
    >
    <span>
      <h2>Period</h2>
      <input
        type="month"
        min="2023-09"
        max="2024-02"
        v-model="period"
        :id="period"
        name="period"
        @change="
          (event) => {
            const target = event.target as HTMLInputElement | null
            if (!target || target.value === null) return
            updatePeriod(target.value)
          }
        "
      />
    </span>
    <SelectionToast
      v-if="globalState?.retailUnit !== '' && customer === ''"
      :itemType="'businessUnit'"
      :itemList="businessUnits"
      @new-selected="updateBusinessUnit"
      >Unit</SelectionToast
    >
    <SelectionToast
      v-if="showCustomers"
      :itemType="'customers'"
      :itemList="customers"
      @new-selected="updateCustomer"
      >Customers</SelectionToast
    >
  </header>
</template>

<style scoped>
input {
  font-size: large;
  min-height: 50px;
  min-width: 200px;
}
</style>
