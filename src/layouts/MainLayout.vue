<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">

      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="miniState = !miniState" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>

          <q-space/>

          <div class="q-gutter-sm row items-center no-wrap">
          
            <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                  @click="$q.fullscreen.toggle()"
                  v-if="$q.screen.gt.sm">
            </q-btn>

            <q-btn round dense flat color="white" icon="notifications">
              <q-badge color="red" text-color="white" floating>
                5
              </q-badge>
              <q-menu
              >
                <q-list style="min-width: 100px">
                  <messages></messages>
                  <q-card class="text-center no-shadow no-border">
                    <q-btn label="View All" style="max-width: 120px !important;" flat dense
                          class="text-indigo-8"></q-btn>
                  </q-card>
                </q-list>
              </q-menu>
              <!--            <q-tooltip>Notifications</q-tooltip>-->
            </q-btn>


            <q-btn-dropdown label="luke skywalker">
              <q-list>
                <q-item clickable v-close-popup to="/Profile">
                  <q-item-section>
                    <q-item-label>My Profile</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            
          </div>

        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        bordered
        content-class="bg-grey-sidebar text-white"
        @click="drawerClick"
      >
        <q-scroll-area class="fit">
          <q-list>

          <q-item to="/" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item v-if="!miniState"
            icon="person"
            label="Administration"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/Administration1" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Administration 1</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Administration</q-item-label>
            </q-item-section>
           
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Administration1" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Administration 1</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>


          <q-expansion-item
            icon="text_format"
            label="Allocations"
            class="menu-parent"
            v-if="!miniState"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/Allocations/Title1" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title I</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title2" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title II</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title3" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title III</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title4" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title IV</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/esser" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>ESSER</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/geer" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>GEER</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="text_format"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Allocations</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <!-- <q-item clickable v-close-popup>
                  <q-item-section>anchor="top right"</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>self="top left"</q-item-section>
                </q-item> -->

                <q-item clickable  v-close-popup to="/Allocations/Title1" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title I</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Allocations/Title2" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title II</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/Title3" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title III</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/Title4" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title IV</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/esser" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>ESSER</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/geer" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>GEER</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <q-expansion-item v-if="!miniState"
            icon="person"
            label="Inventory"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/Inventory" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Inventory</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Inventory</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Inventory" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>


          <q-expansion-item v-if="!miniState"
            icon="school"
            label="Teacher Costs"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/TeacherCosts/BudgetEstimates" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="school"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Budget Estimates</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="school"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Teacher Costs</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/TeacherCosts/BudgetEstimates" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="school"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Budget Estimates</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>


          <q-expansion-item v-if="!miniState"
            icon="attach_money"
            label="Expenses"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/Expenses" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Expenses</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="attach_money"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Expenses</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Expenses" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="attach_money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Expenses</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>




          <q-expansion-item v-if="!miniState"
            icon="account_balance"
            label="Budget"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/Activity" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Activity</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="account_balance"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Budget</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Activity" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Activity</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>




          <q-expansion-item v-if="!miniState"
            icon="money"
            label="Reimbursement"
          >
            <q-list class="bg-sidebar-opened">
              <q-item to="/Reimbursement" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                <q-item-section avatar>
                  <q-icon name="money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Reimbursement</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="money"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Reimbursement</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Reimbursement" class="q-pl-lg" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Reimbursement</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>




        <hr>

        <q-expansion-item
          icon="pages"
          label="Pages ( for use later) "
        >
          <q-list class="bg-sidebar-opened">
            <q-item to="/Login-1" class="q-pl-lg" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="email"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>TreeTable</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Tables" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Tables</q-item-label>
          </q-item-section>
        </q-item>
        
          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>

    </q-layout>
  </div>
</template>

<script>

    import EssentialLink from 'components/EssentialLink'
    import Messages from "./Messages";

    import config from '../../config';
    import axios from 'axios';

export default {
  name: 'MainLayout',
  components: {
    Messages,
    EssentialLink
  },
  data () {
    return {
      drawer: true,
      miniState: true
    }
  },

  methods: {
    drawerClick (e) {
      console.log(this.miniState)
      if(this.miniState) {
        e.preventDefault()
      }
      // e.stopPropagation()
      // console.log(e)
      
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode

      // if (this.miniState) {
      //   this.miniState = false

      //   // notice we have registered an event with capture flag;
      //   // we need to stop further propagation as this click is
      //   // intended for switching drawer to "normal" mode only
      //   // e.stopPropagation()
      // }
    }
  }
}
</script>

<style lang="scss">

.bg-grey-sidebar {
  background: #304156 !important;
}

.bg-sidebar-opened {
  background: #1f2d3d !important;
}

.q-item.q-item-type.row.no-wrap {
    cursor: pointer;
}

</style>