<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">

      <q-header elevated class="edx-bg-dark">
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
        content-class="edx-bg-dark text-white"
        @click="drawerClick"
      >
        <q-scroll-area class="fit">
          <q-list>

          <q-item to="/" @click="addDataToLS('Dashboard', '/')" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item v-if="!miniState"
            icon="person"
            label="Management"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Schools" 
              @click="addDataToLS('Schools', 'Schools')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Schools</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Vendors" 
              @click="addDataToLS('Administration', 'Vendors')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vendors</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/SchoolYear" 
              @click="addDataToLS('School Year', 'SchoolYear')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>School Year</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Management</q-item-label>
            </q-item-section>
           
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Schools" @click="addDataToLS('Schools', 'Schools')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Schools</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Vendors" @click="addDataToLS('Vendors', 'Vendors')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Vendors</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/SchoolYear" @click="addDataToLS('School Year', 'SchoolYear')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>SchoolYear</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </q-menu>
          </q-item>

          <q-expansion-item v-if="!miniState"
            icon="person"
            label="Administration"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Users" 
              @click="addDataToLS('Users', 'Users')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Users</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Roles" 
              @click="addDataToLS('Roles', 'Roles')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Roles</q-item-label>
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
                <q-item clickable  v-close-popup to="/Users" @click="addDataToLS('Users', 'Users')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Users</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Roles" @click="addDataToLS('Roles', 'Roles')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Roles</q-item-label>
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
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Allocations/Title1" @click="addDataToLS('Title I', '/Allocations/Title1')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title I</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title2" @click="addDataToLS('Title II', '/Allocations/Title2')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title II</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title3"  @click="addDataToLS('Title III', '/Allocations/Title3')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title III</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/Title4"  @click="addDataToLS('Title IV', '/Allocations/Title4')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Title IV</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/esser" @click="addDataToLS('ESSER', '/Allocations/esser')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="text_format"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>ESSER</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Allocations/geer" @click="addDataToLS('GEER', '/Allocations/geer')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
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

                <q-item clickable  v-close-popup to="/Allocations/Title1" @click="addDataToLS('Title I', '/Allocations/Title1')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title I</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Allocations/Title2" @click="addDataToLS('Title II', '/Allocations/Title2')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title II</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/Title3" @click="addDataToLS('Title III', '/Allocations/Title3')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title III</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/Title4" @click="addDataToLS('Title IV', '/Allocations/Title4')"   active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Title IV</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/esser" @click="addDataToLS('ESSER', '/Allocations/esser')"   active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="text_format"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>ESSER</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup to="/Allocations/geer"  @click="addDataToLS('GEER', '/Allocations/geer')"  active-class="q-item-no-link-highlighting">
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
            label="Resources"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              
              <q-item to="/ManageTeachers" 
              @click="addDataToLS('Manage Teachers', 'ManageTeachers')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Manage Teachers</q-item-label>
                </q-item-section>
              </q-item>

              <q-item to="/TeacherSalaries" 
              @click="addDataToLS('Teacher Salaries', 'TeacherSalaries')"  
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

              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/ManageTeachers" @click="addDataToLS('Manage Teachers', 'ManageTeachers')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Teachers</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/TeacherSalaries" @click="addDataToLS('Teacher Salaries', 'TeacherSalaries')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Teacher Salaries</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <q-expansion-item v-if="!miniState"
            icon="person"
            label="Inventory"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Inventory" @click="addDataToLS('Inventory', '/Inventory')"   
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Inventory</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/License" @click="addDataToLS('License', '/License')"   
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="person"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>License</q-item-label>
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
                <q-item clickable  v-close-popup to="/Inventory" @click="addDataToLS('Inventory', '/Inventory')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/License" @click="addDataToLS('License', '/License')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="person"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>License</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <!-- Activities -->

          <q-expansion-item v-if="!miniState"
            icon="account_balance"
            label="Budget"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Activity" @click="addDataToLS('Activity', '/Activity')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Activity</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/ActivityProcesses" @click="addDataToLS('Activity Processes', '/ActivityProcesses')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Activity Processes</q-item-label>
                </q-item-section>
              </q-item>
            </q-list> -->
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Material" @click="addDataToLS('Materials', '/Material')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Materials</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Services" @click="addDataToLS('Services', '/Services')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Services</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/LicenseSubscription" @click="addDataToLS('LicenseSubscription', '/Services')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>License & Subscription</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Counseling" @click="addDataToLS('Counseling', '/Counseling')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Counseling</q-item-label>
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
                <q-item clickable  v-close-popup to="/Activity" @click="addDataToLS('Activity', '/Activity')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Activity</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- <q-item clickable  v-close-popup to="/ActivityProcesses" @click="addDataToLS('Activity Processes', '/ActivityProcesses')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Activity Processes</q-item-label>
                  </q-item-section>
                </q-item> -->
                <q-item clickable  v-close-popup to="/Material" @click="addDataToLS('Materials', '/Material')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Materials</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Services" @click="addDataToLS('Services', '/Services')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Services</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/LicenseSubscription" @click="addDataToLS('LicenseSubscription', '/LicenseSubscription')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>License & Subscription</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable  v-close-popup to="/Counseling" @click="addDataToLS('Counseling', '/Counseling')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Counseling</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>


          <!-- <q-expansion-item v-if="!miniState"
            icon="account_balance"
            label="Material purchases"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Material" @click="addDataToLS('Material', '/Material')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="account_balance"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Material purchases</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="account_balance"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Material purchases</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Material" @click="addDataToLS('Material', '/Material')"  active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="account_balance"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Material purchases</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item> -->
          
          
          
          <!-- ### ########## -->

          <!-- Materials
          Services
          License & Subscription
          Counseling -->

          <q-expansion-item v-if="!miniState"
            icon="attach_money"
            label="Expenses"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/Expenses" @click="addDataToLS('Expenses', '/Expenses')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Invoices</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="attach_money"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Invoices</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/Expenses"  @click="addDataToLS('Expenses', '/Expenses')" active-class="q-item-no-link-highlighting">
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
            icon="money"
            label="Reimbursement"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/ManageUsers" @click="addDataToLS('Manage Users', '/ManageUsers')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Manage Users</q-item-label>
                </q-item-section>
              </q-item>
              <q-item to="/Approvals" @click="addDataToLS('Approvals', '/Approvals')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Approvals</q-item-label>
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
                <q-item clickable  v-close-popup to="/ManageUsers" @click="addDataToLS('Manage Users', '/ManageUsers')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Users</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>



          <q-expansion-item v-if="!miniState"
            icon="attach_money"
            label="Reporting"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/AllocationReports" @click="addDataToLS('Allocation Reports', '/AllocationReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Allocation Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/BillingReports" @click="addDataToLS('Billing Reports', '/BillingReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Billing Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/ActivityReports" @click="addDataToLS('Activity Reports', '/ActivityReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Activity Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/InventoryReports" @click="addDataToLS('Inventory Reports', '/InventoryReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Inventory Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/ReimbursementReports" @click="addDataToLS('Reimbursement Reports', '/ReimbursementReports')"  
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
                <q-item-section avatar>
                  <q-icon name="attach_money"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Reimbursement Reports</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-item v-else active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="attach_money"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Reporting</q-item-label>
            </q-item-section>
            <q-menu
              anchor="top right"
              self="top left"
            >
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/AllocationReports"  @click="addDataToLS('Allocation Reports', '/AllocationReports')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="attach_money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Allocation Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/BillingReports"  @click="addDataToLS('Billing Reports', '/BillingReports')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="attach_money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Billing Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/ActivityReports"  @click="addDataToLS('Activity Reports', '/ActivityReports')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="attach_money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Activity Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/InventoryReports"  @click="addDataToLS('Inventory Reports', '/InventoryReports')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="attach_money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list style="min-width: 100px">
                <q-item clickable  v-close-popup to="/InventoryReports"  @click="addDataToLS('Inventory Reports', '/InventoryReports')" active-class="q-item-no-link-highlighting">
                  <q-item-section avatar>
                    <q-icon name="attach_money"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Inventory Reports</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>

            </q-menu>
          </q-item>

          <q-expansion-item v-if="!miniState"
            icon="school"
            label="Teacher Costs"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
              <q-item to="/TeacherCosts/BudgetEstimates"  
              @click="addDataToLS('Budget Estimates', '/TeacherCosts/BudgetEstimates')" 
              active-class="q-item-no-link-highlighting" class="sidebar-dropdown-bottom-menu">
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
                <q-item clickable  v-close-popup to="/TeacherCosts/BudgetEstimates"   @click="addDataToLS('Budget Estimates', '/TeacherCosts/BudgetEstimates')"  active-class="q-item-no-link-highlighting">
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













        <hr>

          <q-expansion-item v-if="!miniState"
            icon="developer_mode"
            label="Development"
          >
            <q-list class="bg-sidebar-opened edx-bg-lighter-dark">
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

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      </q-drawer>

    <q-page-container class="edx-bg-gray-02">
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
    import lodash from 'lodash'

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
    containsObject(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        console.log(list[i], obj)
          if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
              return true;
          }
      }
      return false;
    },
    addDataToLS(name, path) {

      let tabs = JSON.parse(localStorage.getItem('tabs'))
      let currentTab = { name, path }

      // if(!tabs.length) {
      //     tabs.push(currentTab)
      //     localStorage.setItem('tabs', JSON.stringify(tabs))
      // } else {
        let x = this.containsObject(currentTab, tabs)
        if(!x) {
          tabs.push(currentTab)
          localStorage.setItem('tabs', JSON.stringify(tabs))
        }
      // }

    },
    drawerClick (e) {
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

// .scroll.relative-position.fit.hide-scrollbar {
//   background: #304156 !important;
// }

// .bg-grey-sidebar {
//   background: #304156 !important;
// }

// .bg-sidebar-opened edx-bg-lighter-dark {
//   background: #1f2d3d !important;
// }

// .q-item.q-item-type.row.no-wrap {
//     cursor: pointer;
// }

// a.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
//     background: #304156;
//     color: #fff;
// }
// .q-item__section--avatar {
//     color: inherit;
//     min-width: 34px;
// }

// .q-menu {
//   border-radius: 0;
// }

.sidebar-dropdown-bottom-menu {
  padding-left: 40px;
}

// a.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
//     background: #1f2d3d;
//     color: #fff;
// }

</style>