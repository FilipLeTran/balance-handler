<script setup lang="ts">
import { defineComponent } from 'vue'

defineProps<{
  businessUnit?: string
  openingBalance?: number
  closingBalance?: number
  differenceBalance?: number
}>()
</script>

<template>
  <div class="business-unit">
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
  border: solid 1px gray;
  margin: 1em;
}
</style>
