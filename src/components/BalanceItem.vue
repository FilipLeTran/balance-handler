<script setup lang="ts">
import { ref, computed } from 'vue'
import convertDate from '../utilities/ConvertDate.ts'

defineProps<{
  eventId?: string
  date?: number
  customerId?: string
  balanceValue?: number
  eventType?: string
}>()

const balanceContainerClass = ref('balance-container')
</script>

<template>
  <div
    :style="[eventType === 'INCREASED' ? { borderColor: 'green' } : { borderColor: 'red' }]"
    :class="balanceContainerClass"
  >
    <div>
      <h3>Event ID</h3>
      <p>{{ eventId }}</p>
    </div>
    <div>
      <h3>Date</h3>
      <p>
        {{ convertDate(date) }}
      </p>
    </div>
    <div>
      <h3>Customer ID</h3>
      <p>{{ customerId }}</p>
    </div>
    <div>
      <h3>Adjustment</h3>
      <p>{{ balanceValue }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BalanceItem'
})
</script>

<style scoped>
.balance-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: solid;
  margin: 1rem;
}

.balance-container div {
  margin: 1rem;
}

div {
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-weight: bold;
}
</style>
