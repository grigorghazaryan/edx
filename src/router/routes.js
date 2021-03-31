// RouterTabRoutes
import { RouterTabRoutes } from 'vue-router-tab'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...RouterTabRoutes,
      {path: '', name: 'Dashboard', meta: { title: 'Dashboard' }, component: () => import('pages/Dashboard.vue')},
      {path: '/Profile', name: 'Profile', meta: { title: 'User Profile' }, component: () => import('pages/UserProfile.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Administration1', component: () => import('pages/Administration1.vue')},
      // Here Refactoring nedded! change static routes to nested ---------------------------
      {path: '/Allocations/Title1', name: 'Title 1', meta: { title: 'Title I' }, component: () => import('pages/Allocations/Title1.vue')},
      {path: '/Allocations/Title2', name: 'Title 2', meta: { title: 'Title II' }, component: () => import('pages/Allocations/Title2.vue')},
      {path: '/Allocations/Title3', name: 'Title 3', meta: { title: 'Title III' }, component: () => import('pages/Allocations/Title3.vue')},
      {path: '/Allocations/Title4', name: 'Title 4', meta: { title: 'Title IV' }, component: () => import('pages/Allocations/Title4.vue')},
      {path: '/Allocations/esser', name: 'Title 5', meta: { title: 'ESSER' }, component: () => import('pages/Allocations/ESSER.vue')},
      {path: '/Allocations/geer', name: 'Title 6', meta: { title: 'GEER' }, component: () => import('pages/Allocations/GEER.vue')},
      // ------------------------------------------------------------------------------------
      {path: '/Inventory', name: 'Inventory', meta: { title: 'Inventory' }, name: 'Inventory', meta: { title: 'Inventory' }, component: () => import('pages/Inventory/InventorySchools.vue')},
      {path: '/Inventory/:id', name: 'Inventory', meta: { title: 'Inventory' }, name: 'InventoryChild', meta: { title: '' }, component: () => import('pages/Inventory/Inventory.vue')},
      {path: '/License', name: 'License', meta: { title: 'License' }, component: () => import('pages/Inventory/LicenseSchools.vue')},
      {path: '/License/:id', name: 'License', meta: { title: 'License' }, component: () => import('pages/Inventory/License.vue')},
      // ------------------------------------------------------------------------------------
      {path: '/Teacher Assignments', name: 'Teacher Assignments', meta: { title: 'Teacher Assignments' }, component: () => import('pages/Teachers/TeacherSchools.vue')},
      {path: '/Teachers/:id', name: 'Teachers', meta: { title: 'Teachers' }, component: () => import('pages/Teachers/BudgetEstimates.vue')},
      {path: '/Expenses', name: 'Expenses', meta: { title: 'Expenses' }, component: () => import('pages/Expenses/Expenses.vue')},
      // ------------------------------------------------------------------------------
      {path: '/Professional Development', name: 'Professional Development', meta: { title: 'Professional Development' }, component: () => import('pages/Activity/ActivitySchools.vue')},
      {path: '/Activity/:id', name: 'Activity', meta: { title: 'Activity' }, component: () => import('pages/Activity/Activity.vue')},
      {path: '/ActivityProcesses', name: 'ActivityProcesses', meta: { title: 'ActivityProcesses' }, component: () => import('pages/Activity/ActivityProcesses.vue')},
      // -------------
      {path: '/Family Engagement', name: 'Family Engagement', meta: { title: 'Family Engagement' }, component: () => import('pages/Activity/ActivitySchoolsFE.vue')},
      {path: '/ActivityFE/:id', name: 'Activity FE', meta: { title: 'Activity FE' }, component: () => import('pages/Activity/ActivityFE.vue')},
      // -------------
      {path: '/Material', name: 'Material', meta: { title: 'Material' }, component: () => import('pages/Material/MaterialSchools.vue')},
      {path: '/Material/:id', name: 'Material', meta: { title: 'Material' }, component: () => import('pages/Material/Material.vue')},
      // -------------
      {path: '/Instruction Services', name: 'Instruction Services', meta: { title: 'Instruction Services' }, component: () => import('pages/Services/ServicesSchools.vue')},
      {path: '/Services/:id', name: 'Services', meta: { title: 'Services' }, component: () => import('pages/Services/Services.vue')},
      // -------------
      {path: '/LicenseSubscription', name: 'LicenseSubscription', meta: { title: 'LicenseSubscription' }, component: () => import('pages/LicenseSubscription/LicenseSubscriptionSchools.vue')},
      {path: '/LicenseSubscription/:id', name: 'LicenseSubscription', meta: { title: 'LicenseSubscription' }, component: () => import('pages/LicenseSubscription/LicenseSubscription.vue')},
      // -------------
      {path: '/Counseling', name: 'Counseling', meta: { title: 'Counseling' }, component: () => import('pages/Counseling/CounselingSchools.vue')},
      {path: '/Counseling/:id', name: 'Counseling', meta: { title: 'Counseling' }, component: () => import('pages/Counseling/Counseling.vue')},
      // -------------
      {path: '/Reimbursement', name: 'Reimbursement', meta: { title: 'Reimbursement' }, component: () => import('pages/Reimbursement/Reimbursement.vue')},
      // Schools
      {path: '/Schools', name: 'Schools', meta: { title: 'Schools' }, component: () => import('pages/Schools/Schools.vue')},
      {path: '/Schools/:id', name: 'Schools', meta: { title: 'Schools' }, component: () => import('pages/Schools/SchoolsNested.vue')},
      {path: '/SchoolYear', name: 'School Year', meta: { title: 'School Year' },  component: () => import('pages/Schools/SchoolYear.vue')},
      // Vendors
      {path: '/Vendors', name: 'Vendors', meta: { title: 'Vendors' }, component: () => import('pages/Schools/Vendors.vue')},
      {path: '/Vendors/:id', name: 'Vendors', meta: { title: 'Vendors' }, component: () => import('pages/Schools/VendorsNested.vue')},


      // Test
      {path: '/A0', component: () => import('pages/BudgetTest.vue')},
      
    ]
  },
  {
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
