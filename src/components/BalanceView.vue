<template>
  <div>
    <p>Opening balance: {{ openingBalance }}</p>
    <p>Closing balance: {{ closingBalance }}</p>
    <p>Difference: {{ differenceBalance }}</p>
    <div v-for="businessUnit in allBusinessUnits" v-bind:key="businessUnit.name">
      <BusinessUnit
        :businessUnit="businessUnit.name"
        :openingBalance="businessUnit.openingBalance"
        :closingBalance="businessUnit.closingBalance"
        :differenceBalance="businessUnit.differenceBalance"
      />
    </div>
    <div v-for="data in balanceData" v-bind:key="data.id" class="balance-events">
      <BalanceItem
        :eventId="data.id"
        :date="data.time"
        :customerId="data.customerId"
        :balanceValue="data.value"
        :eventType="data.type"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { fetchDataFromFirebase } from '@/stores/modules/apiModule'
import BalanceItem from './BalanceItem.vue'
import BusinessUnit from './BusinessUnit.vue'
import calculateBusinessUnitBalance from '../utilities/CalculateBusinessUnitBalance'

interface Props {
  period: string
}

export default defineComponent({
  name: 'BalanceView',
  components: {
    BalanceItem,
    BusinessUnit
  },
  props: {
    period: {
      type: String,
      required: true
    }
  },
  setup(props: Props, { emit }) {
    const balanceData = ref<any>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const openingBalance = ref(0)
    const closingBalance = ref(0)
    const differenceBalance = ref(openingBalance.value - closingBalance.value)

    const uniqueBusinessUnits = new Set<string>()
    const allBusinessUnits = ref<any>([])

    const uniqueMarkets = new Set<string>()

    const setBalanceData = (newValue: any) => {
      balanceData.value = newValue

      // refactor this later
      let newOpeningBalance = 0
      let newClosingBalance = 0
      for (const index in balanceData.value) {
        const data = balanceData.value[index]
        uniqueBusinessUnits.add(balanceData.value[index].businessUnit)
        uniqueMarkets.add(balanceData.value[index].market)
        if (data.type === 'INCREASED') {
          newOpeningBalance += data.value
        } else if (data.type === 'DECREASED') {
          newClosingBalance += data.value
        }
      }
      emit('markets', Array.from(uniqueMarkets))
      emit('businessUnits', Array.from(uniqueBusinessUnits))

      allBusinessUnits.value = calculateBusinessUnitBalance(
        uniqueBusinessUnits,
        balanceData,
        props.period
      )

      openingBalance.value = newOpeningBalance
      closingBalance.value = newClosingBalance
      differenceBalance.value = Math.abs(newOpeningBalance - newClosingBalance)
    }

    const fetchFromAPI = async () => {
      isLoading.value = true
      try {
        balanceData.value = fetchDataFromFirebase('', setBalanceData)
      } catch (err) {
        error.value = 'err.message' // should not be string but err.message, have it like this for eslint
      } finally {
        isLoading.value = false
      }
    }

    watch(props, () => {
      allBusinessUnits.value = calculateBusinessUnitBalance(
        uniqueBusinessUnits,
        balanceData,
        props.period
      )
      console.log('inside watch: ', allBusinessUnits.value)
      console.log('inside watch props: ', props.period)
    })

    onMounted(fetchFromAPI)

    return {
      balanceData,
      allBusinessUnits,
      openingBalance,
      closingBalance,
      differenceBalance,
      isLoading,
      error
    }
  }
})
</script>

<style scoped>
.balance-events {
  display: flex;
  min-width: 100vw;
}
</style>
