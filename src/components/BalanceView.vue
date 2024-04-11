<template>
  <div v-for="data in balanceData" v-bind:key="data.id" class="balance-events">
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

    const setBalanceData = (newValue: any) => {
      balanceData.value = newValue
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
      error
    }
  }
})
</script>

<style scoped></style>
