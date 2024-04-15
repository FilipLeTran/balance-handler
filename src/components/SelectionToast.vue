<script setup lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { defineComponent, defineProps, ref, watch, inject, computed } from 'vue'
import { type IGlobalState } from './Interfaces'

const props = defineProps<{
  itemType: string
  itemList?: string[]
}>()

const emit = defineEmits(['newSelected'])
const selectedOption = ref('')

const globalState = inject<IGlobalState>('globalState')

watch([selectedOption, props], () => {
  if (props.itemType === 'retailUnit') {
    globalState?.setRetailUnit(selectedOption.value)
    router.push({ params: { retailUnit: selectedOption.value, period: globalState?.period } })
    // router.replace(`${globalState?.retailUnit}`)
    // router.replace(`${globalState?.retailUnit}`)
  } else if (props.itemType === 'businessUnit') {
    globalState?.setBusinessUnit(selectedOption.value)
    router.push({ params: { businessUnit: selectedOption.value } })

    // router.replace(`${globalState?.retailUnit}/${globalState?.businessUnit}`)
    // router.replace(`${globalState?.retailUnit}/${globalState?.businessUnit}`)
  }
  emit('newSelected', selectedOption.value)

  //   router.push(`${globalState?.retailUnit}/${globalState?.period}`)
})

const marketOnlyCustomers = computed(() => {
  return props.itemList?.filter((customer) => {
    return customer.substring(0, 2).toUpperCase() === globalState?.retailUnit
  })
})
</script>

<template>
  <span>
    <h2><slot></slot></h2>
    <select v-if="itemType !== 'customers'" id="selection" v-model="selectedOption">
      <option value="" selected>All</option>
      <option v-for="(item, index) in itemList" :key="`${item}${index}`" :value="item">
        {{ item }}
      </option>
    </select>
    <select v-else id="selection" v-model="selectedOption">
      <option value="" selected>All</option>
      <option v-for="(item, index) in marketOnlyCustomers" :key="`${item}${index}`" :value="item">
        {{ item }}
      </option>
    </select>
  </span>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SelectionToast'
})
</script>
