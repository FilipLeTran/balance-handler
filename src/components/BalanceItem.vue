<script setup lang="ts">
import { ref, computed } from 'vue'
import convertDate from '../utilities/ConvertDate'

defineProps<{
  eventId?: string
  date?: number
  customerId?: string
  balanceValue?: number
  eventType?: string
}>()
</script>

<template>
  <div
    :style="[eventType === 'INCREASED' ? { borderColor: 'green' } : { borderColor: 'red' }]"
    class="balance-container"
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
      <h3>Value</h3>
      <p>{{ `${eventType === 'INCREASED' ? `+${balanceValue}` : `-${balanceValue}`}` }}</p>
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
  justify-content: center;
  border: solid;
  margin: 1rem;
}

@media (min-width: 768px) {
  .balance-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    min-width: 700px;
  }
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
