<template>
  <q-page class="q-pa-sm">
    
    <q-card class="bg-transparent no-shadow no-border q-mb-md q-mt-md">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #546bfa" class="q-pa-none">
                <q-item-section class="q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">$ 720k</q-item-label>
                  <q-item-label>Monthly Income</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-dollar-sign" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #3a9688" class="q-pa-none">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">20</q-item-label>
                  <q-item-label>Weekly Sales</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-chart-bar" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #7cb342" class="q-pa-none ">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">321</q-item-label>
                  <q-item-label>New Customers</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="fas fa-chart-line" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-card>
              <q-item style="background-color: #f88c2b" class="q-pa-none">
                <q-item-section class=" q-pa-md q-ml-none  text-white">
                  <q-item-label class="text-white text-h6 text-weight-bolder">82</q-item-label>
                  <q-item-label>Active Users</q-item-label>
                </q-item-section>
                <q-item-section side class="q-mr-md text-white">
                  <q-icon name="person" color="white" size="44px"></q-icon>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Title 1
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          title="Treats"
          :data="data2"
          :columns="columns3"
          row-key="name"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>

            <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
          </template>


        </q-table>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
    export default {
        name: "Tables",
        data() {
            return {
                columns: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
                    {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
                    {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
                ],
                columns2: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
                    {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
                    {name: 'Progress', label: 'Progress', field: 'Progress', sortable: true, align: 'left'},
                    {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
                ],
                data: [
                    {
                        name: 'Pratik Patel',
                        Crated_Date: '15/3/2020',
                        Project: 'Quasar Admin',
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                        progress: 80,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Mayank Patel',
                        Crated_Date: '10/2/2018',
                        Project: 'Quasar QDraggableTree',
                        avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
                        progress: 50,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Mayur Patel',
                        Crated_Date: '10/2/2018',
                        Project: 'Quasar Shopping',
                        avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
                        progress: 100,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Jeff Galbraith',
                        Crated_Date: '10/2/2019',
                        Project: 'Quasar QMarkdown',
                        avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
                        progress: 60,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Pratik Patel',
                        Crated_Date: '10/1/2020',
                        Project: 'Quasar QGrid',
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                        progress: 30,
                        des: 'Solutions Developer'
                    },
                ],
                filter: '',
                show_filter: false,
                columns3: [
                    {
                        name: 'name',
                        required: true,
                        label: 'Dessert (100g serving)',
                        align: 'left',
                        field: row => row.name,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
                    {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
                    {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
                    {name: 'protein', label: 'Protein (g)', field: 'protein'},
                    {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
                    {
                        name: 'calcium',
                        label: 'Calcium (%)',
                        field: 'calcium',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    },
                    {
                        name: 'iron',
                        label: 'Iron (%)',
                        field: 'iron',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    }
                ],
                data2: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        sodium: 87,
                        calcium: '14%',
                        iron: '1%'
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        sodium: 129,
                        calcium: '8%',
                        iron: '1%'
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        sodium: 337,
                        calcium: '6%',
                        iron: '7%'
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        sodium: 413,
                        calcium: '3%',
                        iron: '8%'
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        sodium: 327,
                        calcium: '7%',
                        iron: '16%'
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        sodium: 50,
                        calcium: '0%',
                        iron: '0%'
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        sodium: 38,
                        calcium: '0%',
                        iron: '2%'
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        sodium: 562,
                        calcium: '0%',
                        iron: '45%'
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        sodium: 326,
                        calcium: '2%',
                        iron: '22%'
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        sodium: 54,
                        calcium: '12%',
                        iron: '6%'
                    }
                ],
                column4: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Task', label: 'Task', field: 'task', sortable: true, align: 'left'},
                ],
                data3: [
                    {
                        name: 'Pratik Patel',
                        des: 'Developer',
                        Progress: 70,
                        type: 'info',
                        issue: '#125',
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',

                    },
                    {
                        name: 'Mayank Patel',
                        des: 'Developer',
                        Progress: 60,
                        type: 'success',
                        issue: '#1425',
                        avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
                    },
                    {
                        name: 'Mayur Patel',
                        des: 'Developer',
                        Progress: 30,
                        type: 'warning',
                        issue: '#1475',
                        avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
                    },
                    {
                        name: 'Jeff Galbraith',
                        des: 'Developer',
                        Progress: 100,
                        type: 'success',
                        issue: '#134',
                        avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
                    }
                ]
            }
        },
        methods: {
            getColor(val) {
                if (val > 70 && val <= 100) {
                    return 'green'
                } else if (val > 50 && val <= 70) {
                    return 'blue'
                }
                return 'red'
            }
        }
    }
</script>

<style>

  .table-bg {
    background-color: #162b4d;
  }
</style>
