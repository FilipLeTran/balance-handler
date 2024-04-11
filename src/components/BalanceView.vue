<script setup lang="ts">
import BalanceItem from './BalanceItem.vue'

const mockData = [
  { id: '203a871a203a71ads2', date: 'Apr. 31 2024', customerId: '231231', balance: 2434 },
  {
    id: '203a871a203a71ads2',
    date: 'Apr. 31 2024',
    customerId: '231231',
    balance: 2434,
    eventType: 'INCREASED'
  },
  {
    id: '203a871a203a71ads2',
    date: 'Apr. 31 2024',
    customerId: '231231',
    balance: 2434
  },
  { id: '203a871a203a71ads2', date: 'Apr. 31 2024', customerId: '231231', balance: 2434 }
]
</script>

<template>
  <div v-for="data in mockData" v-bind:key="data.id">
    <BalanceItem
      :eventId="data.id"
      :date="data.date"
      :customerId="data.customerId"
      :balanceValue="data.balance"
      :eventType="data.eventType"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BalanceView'
})
</script>

<style scoped></style>
