<template>
    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-table
        title="Schools" 
        :data="data"
        :columns="columns"
        row-key="name"
        hide-bottom
      >
        <!-- Loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Body -->
        <template v-slot:body="props">
            <q-tr :props="props">

              <q-td key="name" :props="props" @click="changeRoute(props.row.id)">
                {{ props.row.name }}
              </q-td>

            </q-tr>
        </template>

      </q-table>
    </div>
</template>


<script>
export default {
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
  methods: {
    changeRoute(id) {
      console.log(name)
      this.$router.push('/Activity/'+id)
    }
  }
}
</script>