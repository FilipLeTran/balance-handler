<script setup lang="ts">
import { defineComponent, defineProps } from 'vue'

defineProps<{
  itemList?: string[]
}>()
</script>

<template>
  <span>
    <h2><slot></slot></h2>
    <select id="selection">
      <option v-for="(item, index) in itemList" :key="`${item}${index}`" :value="item">
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
