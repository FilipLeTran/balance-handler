<script setup lang="ts">
import { defineComponent } from 'vue'

const props = defineProps<{
  businessUnit: string
  openingBalance: number
  closingBalance: number
  differenceBalance: number
}>()

const changeBorder = () => {
  return props.openingBalance - props.closingBalance > 0
}
</script>

<template>
  <div
    class="business-unit"
    :style="[changeBorder() ? { borderColor: 'green' } : { borderColor: 'red' }]"
  >
    <h3>{{ businessUnit }}</h3>
    <p>{{ `Opening balance: ${openingBalance}` }}</p>
    <p>{{ `Closing balance: ${closingBalance}` }}</p>
    <p>{{ `Difference: ${differenceBalance}` }}</p>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'BusinessUnit'
})
</script>

<style scoped>
.business-unit {
  border: solid 2px gray;
  margin: 1em;
  padding: 1em;
}

.business-unit h3 {
  text-align: center;
  font-weight: bold;
}

.business-unit p {
  font-size: large;
}
</style>
