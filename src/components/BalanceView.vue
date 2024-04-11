<template>
  <p>Opening balance: {{ openingBalance }}</p>
  <p>Closing balance: {{ closingBalance }}</p>
  <p>Difference: {{ differenceBalance }}</p>
  <div v-for="data in balanceData" v-bind:key="data.id" class="balance-events">
    <BalanceItem
      :eventId="data.id"
      :date="data.time"
      :customerId="data.customerId"
      :balanceValue="data.value"
      :eventType="data.type"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { onMounted, ref } from 'vue'
import { fetchDataFromFirebase } from '@/stores/modules/apiModule'
import BalanceItem from './BalanceItem.vue'

export default defineComponent({
  name: 'BalanceView',
  components: {
    BalanceItem
  },
  setup() {
    const balanceData = ref<any>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const openingBalance = ref(0)
    const closingBalance = ref(0)
    const differenceBalance = ref(openingBalance.value - closingBalance.value)

    const setBalanceData = (newValue: any) => {
      balanceData.value = newValue

      // refactor this later
      let newOpeningBalance = 0
      let newClosingBalance = 0
      for (const index in balanceData.value) {
        const data = balanceData.value[index]
        if (data.type === 'INCREASED') {
          newOpeningBalance += data.value
        } else if (data.type === 'DECREASED') {
          newClosingBalance += data.value
        }
      }
      openingBalance.value = newOpeningBalance
      closingBalance.value = newClosingBalance
      differenceBalance.value = Math.abs(newOpeningBalance - newClosingBalance)
    }

    const fetchFromAPI = async () => {
      isLoading.value = true
      try {
        balanceData.value = fetchDataFromFirebase('', setBalanceData)
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    }

    onMounted(fetchFromAPI)

    return {
      balanceData,
      isLoading,
      error,
      openingBalance,
      closingBalance,
      differenceBalance
    }
  }
})
</script>

<style scoped></style>
