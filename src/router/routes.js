const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Administration1', component: () => import('pages/Administration1.vue')},
      // Here Refactoring nedded! change static routes to nested ---------------------------
      {path: '/Allocations/Title1', component: () => import('pages/Allocations/Title1.vue')},
      {path: '/Allocations/Title2', component: () => import('pages/Allocations/Title2.vue')},
      {path: '/Allocations/Title3', component: () => import('pages/Allocations/Title3.vue')},
      {path: '/Allocations/Title4', component: () => import('pages/Allocations/Title4.vue')},
      {path: '/Allocations/esser', component: () => import('pages/Allocations/ESSER.vue')},
      {path: '/Allocations/geer', component: () => import('pages/Allocations/GEER.vue')},
      // ------------------------------------------------------------------------------------
      {path: '/Inventory', component: () => import('pages/Inventory/InventorySchools.vue')},
      {path: '/Inventory/:id', component: () => import('pages/Inventory/Inventory.vue')},
      {path: '/License', component: () => import('pages/Inventory/LicenseSchools.vue')},
      {path: '/License/:id', component: () => import('pages/Inventory/License.vue')},
      // ------------------------------------------------------------------------------------
      {path: '/TeacherCosts/BudgetEstimates', component: () => import('pages/TeacherCosts/BudgetEstimates.vue')},
      {path: '/Expenses', component: () => import('pages/Expenses/Expenses.vue')},
      // ------------------------------------------------------------------------------
      {path: '/Activity', component: () => import('pages/Activity/ActivitySchools.vue')},
      {path: '/Activity/:id', component: () => import('pages/Activity/Activity.vue')},
      {path: '/ActivityProcesses', component: () => import('pages/Activity/ActivityProcesses.vue')},
      // -------------
      {path: '/Reimbursement', component: () => import('pages/Reimbursement/Reimbursement.vue')},
      // Schools
      {path: '/Schools', component: () => import('pages/Schools/Schools.vue')},
      {path: '/Schools/:id', component: () => import('pages/Schools/SchoolsNested.vue')},
      {path: '/SchoolYear', component: () => import('pages/Schools/SchoolYear.vue')},
      // Vendors
      {path: '/Vendors', component: () => import('pages/Schools/Vendors.vue')},
      {path: '/Vendors/:id', component: () => import('pages/Schools/VendorsNested.vue')},


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
