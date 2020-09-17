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
      content-class="bg-primary text-white"
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
          <q-list class="q-pl-lg">
            <q-item to="/Administration1" active-class="q-item-no-link-highlighting">
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
          <q-list class="q-pl-lg">
            <q-item to="/Allocations/Title1" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="text_format"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Title 1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Allocations/Title2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="text_format"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Title 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Allocations/Title3" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="text_format"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Title 3</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Allocations/Title4" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="text_format"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Title 4</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          icon="person"
          label="Inventory"
        >
          <q-list class="q-pl-lg">
            <q-item to="/Inventory1" active-class="q-item-no-link-highlighting">
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
          <q-list class="q-pl-lg">
            <q-item to="/TeacherCosts" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="school"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Teacher Costs</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item
          icon="attach_money"
          label="Expenses"
        >
          <q-list class="q-pl-lg">
            <q-item to="/Expenses" active-class="q-item-no-link-highlighting">
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
          <q-list class="q-pl-lg">
            <q-item to="/Budget" active-class="q-item-no-link-highlighting">
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
          <q-list class="q-pl-lg">
            <q-item to="/Reimbursement" active-class="q-item-no-link-highlighting">
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
          <q-list class="q-pl-lg">
            <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
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
        }
    }
</script>
