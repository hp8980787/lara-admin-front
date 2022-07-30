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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: 'process',
    name: 'process',
    component: Layout,
    meta: {
      title: '流程',
      icon:'workflow'
    }
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: Layout,
    meta: {
      title: '人事',
      icon: 'el-icon-user-solid'
    },
    children: [
      {
        path: 'departments',
        name: 'departments',
        meta: {
          title: '部门管理',
          icon: 'el-icon-user'
        },
        component:()=>import("@/views/personnel/departments/index")
      }, {
        path: 'users',
        name: 'users',
        meta: {
          title: '用户管理',
          icon: 'el-icon-user',
        }
      }, {
        path: 'permissions',
        name: 'permissions',
        meta: {
          title: '权限管理',
          icon: 'permission',
          role: ['admin']
        },
        component: () => import("@/views/personnel/permissions/index")
      },
      {
        path: 'roles',
        name: 'roles',
        meta: {
          title: '角色管理',
          icon: 'permission',
          role: ['admin']
        },
      }
    ]
  },
  {
    path: '/products',
    name: 'products',
    component: Layout,
    redirect: '/products/index',
    children: [
      {
        path: 'index',
        name: 'products.index',
        meta: {
          title: '商品',
          icon: 'battery'
        },
        component: () => import("@/views/products/index")
      }
    ]

  },
  {
    path: '/sale',
    name: 'sale',
    meta: {
      title: '销售',
      icon: 'el-icon-sell'
    },
    component: Layout,
    redirect: '/sale/orders',
    children: [
      {
        path: 'orders',
        name: 'orders',
        redirect: '/sale/orders/index',
        component: () => import("@/views/warehouse-manage/orders/app"),
        meta: { title: '订单管理' },
        children: [
          {
            path: 'orders/index',
            name: 'orders.index',
            component: () => import('@/views/warehouse-manage/orders/index'),
            meta: {
              title: '订单',
              icon: 'order'
            },
          },
          {
            path: 'purchase/:product_id',
            name: 'orders.purchase',
            hidden: true,
            component: () => import("@/views/warehouse-manage/orders/purchase"),
            meta: {
              title: '采购',
              icon: 'purchase',
            }
          }
        ]
      },
    ]
  },
  {
    path: '/warehouse',
    component: Layout,
    name: 'warehouse',
    redirect: '/warehouse/orders',
    meta: {
      title: '进销存',
      icon: 'warehouse'
    },
    children: [
      {
        path: 'storehouse',
        name: 'storehouse',
        component: () => import("@/views/warehouse-manage/storahouse/index"),
        meta: {
          title: '仓库',
          icon: 'warehouse'
        }, children: [
          {
            path: 'manage',
            name: 'storehouse.manage',
            component: () => import("@/views/warehouse-manage/storahouse/manage"),
            meta: {
              title: '仓库管理',
              icon: 'warehouse'
            }
          }, {
            path: 'record',
            name: 'storehouse.record',
            component: () => import("@/views/warehouse-manage/storahouse/record"),
            meta: {
              title: '出入仓记录',
              icon: 'el-icon-document'
            }
          }
        ]
      }, {
        path: 'purchase',
        name: 'purchase',
        component: () => import('@/views/warehouse-manage/purchase/index'),
        meta: {
          title: '采购',
          icon: 'purchase'
        }
      }
    ]
  },
  {
    path:'/finance',
    name:'finance',
    meta:{
      title:'财务',
      icon:'finance',
    }
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
