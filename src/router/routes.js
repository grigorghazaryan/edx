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
      // ------------------------------------------------------------------------------------
      {path: '/Inventory', component: () => import('pages/Inventory/Inventory.vue')},
      {path: '/TeacherCosts/BudgetEstimates', component: () => import('pages/TeacherCosts/BudgetEstimates.vue')},
      {path: '/Expenses', component: () => import('pages/Expenses/Expenses.vue')},
      {path: '/Activity', component: () => import('pages/Budget/Budget.vue'),
        children: [
          {
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            path: '/Activity/:id',
            component: () => import('pages/Budget/Budget.vue')
          }
        ]
      },
      {path: '/Reimbursement', component: () => import('pages/Reimbursement/Reimbursement.vue')},
      
    ]
  },
  {
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
