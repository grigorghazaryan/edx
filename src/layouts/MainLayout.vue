<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="rounded-borders">

      <q-header  class="edx-header edx-header-text">
        <q-toolbar>

          <q-btn flat @click="setMiniState" round dense icon="menu" />
          <q-toolbar-title>EDXchange</q-toolbar-title>

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
        content-class="edx-sidebar-background edx-sidebar-menu-text"
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

          <!-- MANAGEMENT -->

          <q-expansion-item v-if="!miniState"
            icon="settings"
            label="Management"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Schools" 
              @click="addDataToLS('Schools', 'Schools')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="apartment"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Schools</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Vendors" 
              @click="addDataToLS('Administration', 'Vendors')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="recent_actors"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vendors</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/TeachersXX" active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="people"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Teachers</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/SchoolYear" active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="date_range"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>School Year</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Management</q-item-label>
            </q-item-section>
           
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Schools" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="apartment"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Schools</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Vendors"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="recent_actors"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Vendors</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/TeachersXXX" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="people"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Teachers</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/SchoolYear" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="date_range"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>SchoolYear</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </q-menu>
          </q-item>

          <!-- ADMINISTRATION -->

          <q-expansion-item v-if="!miniState"
            icon="admin_panel_settings"
            label="Administration"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Users" 
              @click="addDataToLS('Users', 'Users')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_circle"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Users</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Roles" 
              @click="addDataToLS('Roles', 'Roles')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="supervised_user_circle"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Roles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="admin_panel_settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Administration</q-item-label>
            </q-item-section>
           
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Users" @click="addDataToLS('Users', 'Users')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_circle"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Users</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Roles" @click="addDataToLS('Roles', 'Roles')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="supervised_user_circle"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Roles</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <!-- ALLOCATIONS -->

          <q-expansion-item
            icon="account_balance"
            label="Allocations"
            class="menu-parent"
            v-if="!miniState"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Allocations/Title1" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_page"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title I Funds</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title2" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_page"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title II Funds</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title3" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_page"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title III Funds</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title4"
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_page"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title IV Funds</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/esser"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_page"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>ESSER Funds</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/geer" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_page"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>GEER Funds</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="account_balance"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Allocations</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item class="edx-sidebar-background edx-sidebar-menu-text" clickable  v-close-popup to="/Allocations/Title1"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_page"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title I Funds</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="edx-sidebar-background edx-sidebar-menu-text" clickable  v-close-popup to="/Allocations/Title2"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_page"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title II Funds</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="edx-sidebar-background edx-sidebar-menu-text" clickable v-close-popup to="/Allocations/Title3"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_page"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title III Funds</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="edx-sidebar-background edx-sidebar-menu-text" clickable v-close-popup to="/Allocations/Title4"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_page"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title IV Funds</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="edx-sidebar-background edx-sidebar-menu-text" clickable v-close-popup to="/Allocations/esser"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_page"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>ESSER Funds</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="edx-sidebar-background edx-sidebar-menu-text" clickable v-close-popup to="/Allocations/geer"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_page"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>GEER Funds</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <!-- RESOURCES -->

          <!-- <q-expansion-item v-if="!miniState"
            icon="person"
            label="Resources"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              
              <q-item to="/ManageTeachers" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Manage Teachers</q-item-label>
                </q-item-section>
              </q-item>

              <q-item to="/TeacherSalaries" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Teacher Salaries</q-item-label>
                </q-item-section>
              </q-item>

              <q-item to="/TeacherBudget" 
              @click="addDataToLS('Teacher Budget', 'TeacherBudget')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Teacher Budget</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">

            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Resources</q-item-label>
            </q-item-section>
           
            <q-menu
              anchor="top right"
              self="top left"
            >

              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Teachers</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable v-close-popup to="/TeacherSalaries" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Teacher Salaries</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </q-menu>
          </q-item> -->

          <!-- INVENTORY -->
          
          <q-expansion-item v-if="!miniState"
            icon="inventory"
            label="Inventory"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Inventory"
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="inventory"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Inventory</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/License"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="dvr"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>License</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">

            <q-item-section avatar>
              <q-icon name="inventory"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Inventory</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Inventory" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="inventory"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/License" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="dvr"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>License</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <!-- BUDGET -->

          <q-expansion-item v-if="!miniState"
            icon="account_balance_wallet"
            label="Budget"
          >
            
            <q-list class="bg-sidebar-opened edx-menu-toggle">
                <q-item to="/Professional Development"
                active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                  <q-item-section avatar>
                    <q-icon name="how_to_reg"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Professional Development</q-item-label>
                  </q-item-section>
                </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
                <q-item to="/Family Engagement" 
                active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                  <q-item-section avatar>
                    <q-icon name="family_restroom"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Family Engagement</q-item-label>
                  </q-item-section>
                </q-item>
            </q-list>


            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Material" @click="addDataToLS('Materials', '/Material')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="request_quote"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Material Purchases</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Instruction Services"
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="local_library"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Instructional Services</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Teacher Assignments" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="school"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Teacher Assignments</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="account_balance_wallet"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Budget</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Professional Development" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="how_to_reg"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Professional Development</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Family Engagement" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="family_restroom"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Family Engagement</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Material" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="request_quote"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Material Purchases</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Instruction Services" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="local_library"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Instructional Services</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Teacher Assignments"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Teacher Assignments</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>


          <!-- BILLING & EXPENSES -->

          <q-expansion-item v-if="!miniState"
            icon="monetization_on"
            label="Billing & Expenses"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Expenses" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="receipt"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Billing Invoices</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="monetization_on"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Billing & Expenses</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Expenses" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="receipt"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Billing Invoices</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>


          <!-- REIMBURSEMENT -->

          <q-expansion-item v-if="!miniState"
            icon="credit_card"
            label="Reimbursement"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/ManageUsers"
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="card_travel"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Manage Events</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Approvals"
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="approval"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Approvals</q-item-label>
                </q-item-section>
            </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="credit_card"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Reimbursement</q-item-label>
            </q-item-section>
            <q-menu anchor="top right" self="top left">
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/ManageUsers" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="card_travel"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Events</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Approvals" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="approval"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Approvals</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <!-- REPORTING -->

          <q-expansion-item v-if="!miniState"
            icon="leaderboard"
            label="Reporting"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/AllocationReports"
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="poll"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Allocation Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/BillingReports" @click="addDataToLS('Billing Reports', '/BillingReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="poll"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Billing Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/ActivityReports" @click="addDataToLS('Activity Reports', '/ActivityReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="poll"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Activity Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/InventoryReports" @click="addDataToLS('Inventory Reports', '/InventoryReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="poll"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Inventory Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/ReimbursementReports" @click="addDataToLS('Reimbursement Reports', '/ReimbursementReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="poll"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Reimbursement Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="leaderboard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Reporting</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/AllocationReports" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="poll"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Allocation Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/BillingReports" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="poll"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Billing Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/ActivityReports" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="poll"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Activity Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/InventoryReports" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="poll"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="edx-sidebar-background edx-sidebar-menu-text" style="min-width: 100px">
                <q-item clickable  v-close-popup to="/InventoryReports" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="poll"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </q-menu>
          </q-item>

          <!-- ################# -->
          <!-- ################# -->
          <!-- ####### Development ########## -->
          <!-- ################# -->
          <!-- ################# -->
          
          <hr v-if="!miniState">

          <q-expansion-item v-if="!miniState"
            icon="developer_mode"
            label="Development"
          >
            <q-list class="bg-sidebar-opened edx-menu-toggle">
              <q-item to="/Login-1"  active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="email"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Login</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        
          </q-list>
        </q-scroll-area>

      </q-drawer>

    <q-page-container class="edx-background">
        <!-- <router-view/> -->
        <router-tab :max-alive="10" :tabs="tabs" restore />
    </q-page-container>

    </q-layout>
  </div>
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

  data () {
    return {
      drawer: true,
      miniState: true,
      tabs: [
          {
            to: '/',
            title: 'Dashboard',
            closable: false
          },
      ]
    }
  },

  methods: {
    drawerClick (e) {
      if(this.miniState) {
        e.preventDefault()
      }
    },
    setMiniState() {
      this.miniState = !this.miniState
    }
  },

  created() {
    this.miniState = JSON.parse( localStorage.getItem('miniState') )
  },

  watch: {
    miniState(val) {
      localStorage.setItem('miniState', val)
    }
  }
  
}
</script>

<style lang="scss">

.sidebar-dropdown-bottom-menu {
  padding-left: 40px;
}

.nested-item .q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
    padding-left: 40px;
}

</style>