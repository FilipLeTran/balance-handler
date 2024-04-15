<template>
  <div>
    <p>Opening balance: {{ openingBalance }}</p>
    <p>Closing balance: {{ closingBalance }}</p>
    <p>Difference: {{ differenceBalance }}</p>
    <div v-if="showBusinessUnitsView">
      <div v-for="businessUnit in allBusinessUnits" v-bind:key="businessUnit.name">
        <BusinessUnit
          :businessUnit="businessUnit.name"
          :openingBalance="businessUnit.openingBalance"
          :closingBalance="businessUnit.closingBalance"
          :differenceBalance="businessUnit.differenceBalance"
        />
      </div>
    </div>
    <div v-else-if="showCustomersView">
      <div v-for="customer in allCustomers" v-bind:key="customer.name">
        <BusinessUnit
          :businessUnit="customer.name"
          :openingBalance="customer.openingBalance"
          :closingBalance="customer.closingBalance"
          :differenceBalance="customer.differenceBalance"
        />
      </div>
    </div>
    <div v-else>
      <div v-for="data in customerEvents" v-bind:key="data.id" class="balance-events">
        <BalanceItem
          :eventId="data.id"
          :date="data.time"
          :customerId="data.customerId"
          :balanceValue="data.value"
          :eventType="data.type"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue'
import { fetchDataFromFirebase } from '@/stores/modules/apiModule'
import BalanceItem from '../components/BalanceItem.vue'
import BusinessUnit from '../components/BusinessUnit.vue'
import calculateBusinessUnitBalance from '../utilities/CalculateBusinessUnitBalance'
import { type IGlobalState } from '../components/Interfaces'
import filterBalanceByPeriod from '@/utilities/FilterBalanceByPeriod'
import calculateTotalBalance from '@/utilities/CalculateTotalBalance'

interface Props {
  period: string
  selectedRetailUnit: string
  selectedBusinessUnit: string
  selectedCustomer: string
}

export default defineComponent({
  name: 'BalanceView',
  components: {
    BalanceItem,
    BusinessUnit
  },
  props: {
    period: String,
    selectedRetailUnit: String,
    selectedBusinessUnit: String,
    selectedCustomer: String
  },
  setup(props: Props, { emit }) {
    const globalState = inject<IGlobalState>('globalState')

    const balanceData = ref<any>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const openingBalance = ref(0)
    const closingBalance = ref(0)
    const differenceBalance = ref(openingBalance.value - closingBalance.value)

    const uniqueBusinessUnits = new Set<string>()
    const allBusinessUnits = ref<any>([])

    const uniqueMarkets = new Set<string>()
    const uniqueCustomers = new Set<string>()
    const allCustomers = ref<any>([])
    const customerEvents = ref<any>([])

    const setBalanceData = (newValue: any) => {
      balanceData.value = newValue

      // refactor this later
      for (const index in balanceData.value) {
        const data = balanceData.value[index]
        uniqueBusinessUnits.add(data.businessUnit)
        uniqueMarkets.add(data.market)
        uniqueCustomers.add(data.customerId)
      }
      emit('markets', Array.from(uniqueMarkets))
      emit('businessUnits', Array.from(uniqueBusinessUnits))
      emit('customers', Array.from(uniqueCustomers))
      globalState?.setRetailUnit(Array.from(uniqueMarkets)[0])

      const balanceByPeriod = filterBalanceByPeriod(balanceData, globalState?.period)
      allBusinessUnits.value = calculateBusinessUnitBalance(
        uniqueBusinessUnits,
        balanceByPeriod,
        ''
      )
      const balanceResults = calculateTotalBalance(allBusinessUnits)
      openingBalance.value = balanceResults[0]
      closingBalance.value = balanceResults[1]
      differenceBalance.value = balanceResults[2]
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
      const newBalancePeriod = filterBalanceByPeriod(balanceData, props.period)
      allBusinessUnits.value = calculateBusinessUnitBalance(
        uniqueBusinessUnits,
        newBalancePeriod,
        props.selectedRetailUnit
      )

      // Show the opening and closing balance for unique customers
      const eventsInBusinessUnit = newBalancePeriod.filter(
        (balanceEvent: { businessUnit: string }) => {
          return balanceEvent.businessUnit === props.selectedBusinessUnit
        }
      )

      // get unique customer ids in business unit
      const uniqueCustomersInBusinessUnit = new Set<string>()
      eventsInBusinessUnit.map((balanceEvent: { customerId: string }) => {
        uniqueCustomersInBusinessUnit.add(balanceEvent.customerId)
      })

      let customersBalance: {
        name: string
        openingBalance: number
        closingBalance: number
        differenceBalance: number
      }[] = []

      Array.from(uniqueCustomersInBusinessUnit).forEach((customerId) => {
        const filteredEventsBasedOnCustomer = eventsInBusinessUnit.filter(
          (balanceEvent: { customerId: string }) => {
            return balanceEvent.customerId === customerId
          }
        )

        let unitOpeningBalance = 0
        let unitClosingBalance = 0

        filteredEventsBasedOnCustomer.map((balanceEvent: { type: string; value: number }) => {
          if (balanceEvent.type === 'INCREASED') {
            unitOpeningBalance += balanceEvent.value
          } else if (balanceEvent.type === 'DECREASED') {
            unitClosingBalance += balanceEvent.value
          }
        })

        const unitDifferenceBalance = unitOpeningBalance - unitClosingBalance

        customersBalance.push({
          name: customerId,
          openingBalance: unitOpeningBalance,
          closingBalance: unitClosingBalance,
          differenceBalance: unitDifferenceBalance
        })
      })
      allCustomers.value = customersBalance

      // TODO: Show customer events in a :period and for a specific :market
      customerEvents.value = newBalancePeriod.filter((balanceEvent: any) => {
        return (
          balanceEvent.customerId === props.selectedCustomer &&
          balanceEvent.market === props.selectedRetailUnit
        )
      })

      //market/period = calculateTotalBalance(allBusinessUnits)
      //market/period/businessUnit = calculateTotalBalance(allCustomers)
      //market/period/customer

      if (props.selectedCustomer !== '') {
        const balanceResult = calculateBusinessUnitBalance(
          new Set<string>().add(props.selectedCustomer),
          newBalancePeriod,
          props.selectedRetailUnit
        )
        openingBalance.value = balanceResult[0].openingBalance
        closingBalance.value = balanceResult[0].closingBalance
        differenceBalance.value = balanceResult[0].differenceBalance
      } else if (props.selectedBusinessUnit !== '') {
        const balanceResult = calculateTotalBalance(allCustomers)
        openingBalance.value = balanceResult[0]
        closingBalance.value = balanceResult[1]
        differenceBalance.value = balanceResult[2]
      } else if (props.selectedRetailUnit !== '') {
        const balanceResult = calculateTotalBalance(allBusinessUnits)
        openingBalance.value = balanceResult[0]
        closingBalance.value = balanceResult[1]
        differenceBalance.value = balanceResult[2]
      }
    })

    const showBusinessUnitsView = computed(() => {
      return props.selectedBusinessUnit === '' && props.selectedCustomer === ''
    })

    const showCustomersView = computed(() => {
      return props.selectedRetailUnit !== '' && props.selectedBusinessUnit !== ''
    })

    onMounted(fetchFromAPI)

    return {
      balanceData,
      allBusinessUnits,
      allCustomers,
      customerEvents,
      openingBalance,
      closingBalance,
      differenceBalance,
      showBusinessUnitsView,
      showCustomersView,
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
