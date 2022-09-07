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
    path: '/process',
    name: 'process',
    component: Layout,
    meta: {
      title: '流程',
      icon: 'workflow'
    },
    children: [
      {
        name: 'workflow',
        path: 'workflow',
        component: () => import("@/views/process/workflow"),
        meta: {
          title: '工作流',
          icon: 'workflow',
        },
        children:[
          {
            name:'workflow-index',
            path:'index',
            meta:{
              title:'工作流管理',
              icon:'workflow'
            },
            component:()=>import("@/views/process/workflow/index/index")
          },
          {
            name: 'workflow-category',
            path: 'category',
            component: () => import("@/views/process/workflow/category"),
            meta: {
              title: '分类',
              icon: 'workflow',
            },
          }
        ]
      },
    ]

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
        component: () => import("@/views/personnel/departments/index")
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
    path: '/finance',
    name: 'finance',
    meta: {
      title: '财务',
      icon: 'finance',

    },
    component: Layout,

    children: [
      {
        name: 'billCategory',
        path: 'category',
        meta: {
          title: '账单分类',
          icon: 'el-icon-menu',
        },
        component: () => import("@/views/finance/category"),
      }, {
        name: 'billWrite',
        path: 'write',
        meta: {
          title: '记账',
          icon: 'bill'
        },
        component: () => import("@/views/finance/bill"),
      }, {
        name: 'billSetting',
        path: 'setting',
        meta: {
          title: '财务设置',
          icon: 'el-icon-setting'
        },
        component: () => import("@/views/finance/setting"),
        children: [
          {
            name: 'ledger',
            path: 'ledger',
            meta: {
              title: '账套管理',
              icon: 'bill'
            },
            component: () => import("@/views/finance/setting/ledger")
          }, {
            name: 'financeUser',
            path: 'user',
            meta: {
              title: '财务账号管理',
              icon: 'user'
            }
          }, {
            name: 'column',
            path: 'column',
            meta: {
              title: '字段设置',
              icon: 'el-icon-s-grid'
            },
            component: () => import("@/views/finance/setting/column")
          }
        ]
      },
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
