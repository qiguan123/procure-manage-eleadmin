import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/cfrs',
    component: Layout,
    redirect: '/cfrs/list',
    name: 'Conference',
    meta: { title: '会议管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'ConferenceList',
        component: () => import('@/views/conference/index'),
        meta: { title: '会议列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/list',
    name: 'Project',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'ProjectList',
        component: () => import('@/views/project/index'),
        meta: { title: '项目列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/pkg',
    component: Layout,
    redirect: '/pkg/list',
    name: 'Pkg',
    meta: { title: '包管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'PkgList',
        component: () => import('@/views/pkg/index'),
        meta: { title: '分包列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/expert',
    component: Layout,
    redirect: '/expert/list',
    name: 'Expert',
    meta: { title: '专家管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'ExpertList',
        component: () => import('@/views/expert/index'),
        meta: { title: '专家列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/bidder',
    component: Layout,
    redirect: '/bidder/list',
    name: 'Bidder',
    meta: { title: '应标方管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'BidderList',
        component: () => import('@/views/bidder/index'),
        meta: { title: '应标单位列表', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
