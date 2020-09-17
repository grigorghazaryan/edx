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
      {
        path: '/Allocations', 
        component: () => import('pages/Allocations/Title1.vue'),
        children: [
          {path: '/Allocations/:id', component: () => import('pages/Allocations/Title1.vue')}
        ]
      },
      {path: '/Inventory1', component: () => import('pages/Inventory/Inventory1.vue')},
      {path: '/TeacherCosts', component: () => import('pages/TeacherCosts/TeacherCosts.vue')},
      {path: '/Expenses', component: () => import('pages/Expenses/Expenses.vue')},
      {path: '/Budget', component: () => import('pages/Budget/Budget.vue')},
      {path: '/Budget', component: () => import('pages/Budget/Budget.vue')},
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
