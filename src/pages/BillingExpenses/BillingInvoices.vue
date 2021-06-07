<template>
    <div class="q-pa-sm q-mt-sm q-gutter-sm">

      <InvoicingBar :update="update"/>

      <div class="q-mt-lg"> 
        <InvoicingTable @dataChanged="dataChanged"/>
      </div>

    </div>
</template>


<script>

import InvoicingBar from '../../components/billingExpenses/InvoicingBar'
import InvoicingTable from '../../components/billingExpenses/InvoicingTable'

export default {
  components: {
    InvoicingBar,
    InvoicingTable
  },
  data() {
      return {
          update: false,
      }
  },
  methods: {
    dataChanged() {
      this.update = !this.update
    }
  }
}

</script>