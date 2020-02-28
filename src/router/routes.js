import {
  isHasAuthRedirectToAdmin,
  ckechAuth,
  postExists,
} from './middlewares'

// Layouts
import Dashboard from '../views/layouts/Dashboard.vue'
import Site from '../views/layouts/Site.vue'

// Pages
import Home from '../views/pages/Site/Home.vue'

//Dashboard
import AdminHome from '../views/pages/Dashboard/AdminHome.vue'
import Categories from '../views/pages/Dashboard/Categories.vue'
import CategoryEdit from '../views/pages/Dashboard/CategoryEdit.vue'
import CategoryCreate from '../views/pages/Dashboard/CategoryCreate.vue'
import SpendingList from '../views/pages/Dashboard/SpendingList.vue'
import SpendingListView from '../views/pages/Dashboard/SpendingListView.vue'
import SpendingListCreate from '../views/pages/Dashboard/SpendingListCreate.vue'
import Report from '../views/pages/Dashboard/Report.vue'
import Profile from '../views/pages/Dashboard/Profile.vue'
import Chat from '../views/pages/Dashboard/Chat.vue'
import Error404 from '../views/pages/Dashboard/Error404.vue'


export default [
  {
    path: '/',
    component: Site,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
    ]
  },

  {
    path: '/admin',
    component: Dashboard,
    beforeEnter: ckechAuth,
    children: [
      {
        path: '/',
        redirect: {
          name: 'admin.home'
        }
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
        beforeEnter: postExists,
        meta: {type: 'categories'},
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
        beforeEnter: postExists,
        meta: {type: 'spending'},
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
      },
      {
        path: 'chat',
        name: 'admin.chat',
        component: Chat
      }
    ]
  },
  
  {
    path: "*",
    name: '404',
    component: Error404
  }
]