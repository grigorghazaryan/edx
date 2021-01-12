<template>
    <div class="q-pa-sm">

      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
          <q-breadcrumbs-el label="Activities" />
        </q-breadcrumbs>
      </div>

          <div class="q-pa-sm q-mt-sm q-gutter-sm">

      <div class="edx-header-parent">
        <span class="edx-header-text">Schools</span>
      </div>

      <q-table
        :data="data"
        :columns="columns"
        row-key="id" 
        :loading="loading"
        binary-state-sort
        :pagination.sync="pagination"
      >
        <!-- Loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Body -->
        <template v-slot:body="props">
            <q-tr :props="props">

              <q-td key="name" class="cursor-pointer" :props="props" @click="changeRoute(props.row.id, props.row.name)">
                <!-- <router-link :to="{ path: '/Inventory/'+ props.row.id }"> {{ props.row.name }} </router-link> -->
                {{ props.row.name }} 
              </q-td>

            </q-tr>
        </template>

      </q-table>

      </div>
    </div>
</template>


<script>

import axios from 'axios'
import config from '../../../config'

export default {

  data () {
    return {
      loading: true,
      pagination: {
        rowsPerPage: -1
      },
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
      ]
    }
  },
  methods: {
    getSchools() {

      const conf = {
        method: 'GET',
        url: config.getSchools,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        let schoolsArr = []
        for(let i=0; i<res.data.length; i++) {
          let obj = {
            id: res.data[i].id,
            name: res.data[i].school_name
          }
          schoolsArr.push(obj)
        }
        this.data = schoolsArr
        console.log(schoolsArr)
        this.loading = false
      })
    },
    changeRoute(id, name) {
      this.$router.push({
        path: '/Activity/' + id,
        query: { name }
      })
    }
  },
  created() {
    this.getSchools()
  }

}
</script>