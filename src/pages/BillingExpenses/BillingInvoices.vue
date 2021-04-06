<template>
    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
      <InvoicingBar />

      <div class="q-mt-lg"> 
        <InvoicingTable />
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
  data () {
    return {
      columns: [
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "date",
          sortable: true
        },
      ],
      data: [
        {
          id: 0,
          name: 'School N1'
        },
        {
          id: 1,
          name: 'School N2'
        },
        {
          id: 2,
          name: 'School N3'
        }
      ]
    }
  },
  methods: {}
}

</script>