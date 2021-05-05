<template>
    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
      <InvoicingBar />

      <div class="q-mt-lg"> 
        <ReconciliationsTable />
      </div>


    </div>
</template>


<script>

import InvoicingBar from '../../components/billingExpenses/InvoicingBar'
import ReconciliationsTable from '../../components/reconciliations/ReconciliationsTable'

export default {
  components: {
    InvoicingBar,
    ReconciliationsTable
  }
}

</script>