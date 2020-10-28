<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          EDXChange 
        </q-toolbar-title>


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
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-sidebar text-white"
    >
      <q-list>

        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
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

        <q-expansion-item
          icon="text_format"
          label="Allocations"
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
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          icon="person"
          label="Inventory"
        >
          <q-list class="bg-sidebar-opened">
            <q-item to="/Inventory1" class="q-pl-lg" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="person"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Inventory 1</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
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

        <q-expansion-item
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

        <q-expansion-item
          icon="account_balance"
          label="Budget"
        >
          <q-list class="bg-sidebar-opened">
            <q-item to="/Budget" class="q-pl-lg" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="account_balance"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Budget</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
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
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
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

        data() {
            return {
                leftDrawerOpen: false,
            }
        },

        methods: {
          getMenus() {

            console.log('Get menus request -----')

              let roleId = JSON.parse(localStorage.getItem('user-info')).role_id,
                  token = localStorage.getItem('access-token');

            let url = config.getMenus + roleId
              
            const header = `Authorization: Bearer ${token}`;

            axios.get(url, { headers: { header, 'Content-Type': 'application/json' } })
              .then(res => {
                console.log('RESPONSE : ', res)
              })
              .catch(e => {
                console.log('ERROR : ------- ', e)
              })
          }
        },

        created() {
          // this.getMenus()
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

</style>
