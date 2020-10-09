<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="teacher"
    >

      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>

          <!-- <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td> -->

          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
          </q-td>
          <q-td key="fat" :props="props">
            {{ props.row.fat }}
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
          </q-td>
          <q-td key="protein" :props="props">
            {{ props.row.protein }}
          </q-td>
          <q-td key="sodium" :props="props">
            {{ props.row.sodium }}
          </q-td>
          <q-td key="calcium" :props="props">
            {{ props.row.calcium }}
          </q-td>
          <q-td key="iron" :props="props">
            {{ props.row.iron }}
          </q-td>

        </q-tr>

        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <h3>This is expand slot for row above: {{ props.row.teacher }}.</h3>
            </div>
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
          name: "toggle",
          field: row => row.name,
        },
        {
          name: "teacher",
          align: "left",
          label: "Teacher",
          field: "teacher",
          sortable: true
        },
        {
          name: "title",
          align: "left",
          label: "Title",
          field: "title",
          sortable: true
        },
        { 
          name: "benefits", 
          align: "left",
          label: "Benefits", 
          field: "benefits",
          sortable: true
        },
        {
          name: "workMonth",
          align: "left",
          label: "Work Month",
          field: "workMonth",
          sortable: true
        },
        {
          name: "allocation",
          align: "left",
          label: "Allocation",
          field: "allocation"
        },
        {
          name: "increase",
          align: "left",
          label: "Increase",
          field: "increase"
        },
        {
          name: "currentSalary",
          align: "left",
          label: "Current Salary",
          field: "currentSalary"
        },
        {
          name: "fringe",
          align: "left",
          label: "Fringe",
          field: "fringe"
        },
        {
          name: "semiMonthly",
          align: "left",
          label: "Semi Monthly",
          field: "semiMonthly"
        },
        {
          name: "annualCharge",
          align: "left",
          label: "Annual Charge",
          field: "annualCharge"
        },
        {
          name: "actions",
          align: "left",
          label: "Actions",
          field: "actions"
        },
      ],
      data: [
        // {
        //   name: 'Hello world axper',
        //   calories: 'calories',
        //   fat: 'fat',
        //   carbs: 'carbs',
        //   protein: 'protein',
        //   sodium: 'sodium',
        //   calcium: 'calcium',
        //   iron: 'Iron'
        // }
      ]
    }
  },
  created() {
    let dataTest = []
    for(let i=0; i<10; i++) {
    
    let obj = {
        teacher: 'Frank Hall' + i,
        title: 'T',
        benefits: false,
        workMonth: 10,
        allocation: 45,
        increase: 4.22,
        currentSalary: 487,
        fringe: 37,
        semiMonthly: 105,
        annualCharge: 369
    }

    dataTest.push(obj)

    }
    this.data = dataTest
    this.tempData = dataTest

    let schoolArr = []
    for(let j=0; j<this.data.length; j++) {
      schoolArr.push('School N'+j+1)
    }
    this.schools = schoolArr
},
}
</script>