import {isHasAuthRedirectToAdmin, isNotAuthRedirectToLogin} from './middlewares'

// Layouts
import Default from '../views/layouts/Default.vue'
import Modal from '../views/layouts/Modal.vue'

// Pages
import AdminHome from '../views/pages/AdminHome.vue'
import Categories from '../views/pages/Categories.vue'
import CategoryEdit from '../views/pages/CategoryEdit.vue'
import CategoryCreate from '../views/pages/CategoryCreate.vue'
import SpendingList from '../views/pages/SpendingList.vue'
import SpendingListView from '../views/pages/SpendingListView.vue'
import SpendingListCreate from '../views/pages/SpendingListCreate.vue'
import Login from '../views/pages/Login.vue'
import Report from '../views/pages/Report.vue'
import Profile from '../views/pages/Profile.vue'
import Registration from '../views/pages/Registration.vue'
import Error404 from '../views/pages/Error404.vue'


export default [
  {
    path: '/',
    component: Modal,
    children: [
      {
        path: '/',
        name: 'login',
        component: Login,
        beforeEnter: isHasAuthRedirectToAdmin,
      },
      {
        path: 'registration',
        name: 'registration',
        component: Registration
      },
    ]
  },

  {
    path: '/admin',
    component: Default,
    beforeEnter: isNotAuthRedirectToLogin,
    children: [
      {
        path: '/',
        redirect: { name: 'admin.home' }
      },
      {
        path: 'home',
        name: 'admin.home',
        component: AdminHome
      },
      {
        path: 'categories',
        name: 'admin.categories',
        component: Categories
      },
      {
        path: 'categories/:id/edit',
        name: 'admin.category-edit',
        component: CategoryEdit
      },
      {
        path: 'categories/create',
        name: 'admin.category-create',
        component: CategoryCreate
      },
      {
        path: 'spending-list',
        name: 'admin.spending-list',
        component: SpendingList
      },
      {
        path: 'spending-list/:id/view',
        name: 'admin.spending-list-view',
        component: SpendingListView
      },
      {
        path: 'spending-list/create',
        name: 'admin.spending-list-create',
        component: SpendingListCreate
      },
      {
        path: 'report',
        name: 'admin.report',
        component: Report
      },
      {
        path: 'profile',
        name: 'admin.profile',
        component: Profile
      }
    ]
  },
  
  {
    path: "*",
    component: Error404
  }
]