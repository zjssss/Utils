//路由文件
//公共路由
const commonRouter = [];
const createRouter = () => new Router({
  routes: commonRouter
})
export const router = createRouter()

function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}
// 路由懒加载
const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}
//在app组件初始化声明周期调用和在登录时调用   或者  直接在路由守卫调用
let createNewRouter = () => {
  // 遍历后台传来的路由字符串，转换为组件对象
  let accessRouter = filterAsyncRouter(res.data)
  //合并所有路由
  let allRouter = commonRouter.concat(accessRouter)
  //添加动态路由
  router.addRoutes(allRouter)
}




//***********************方法2 针对二级路由*****************************************//
//引入路由文件
const userRule = { path: '/users', component: Users }
const roleRule = { path: '/roles', component: Roles }
const goodRule = { path: '/goods', component: GoodsList }
const categoryRule = { path: '/categories', component: GoodsCate }
//路由规则匹配
const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodRule,
  'categories': categoryRule
}
//在app组件初始化声明周期调用和在登录有调用
export function initDynamicRoutes() {
  //根据二级权限，对路由规则进行动态的添加const 
  currentRoutes=router.options.routes
  //获取后端返回的权限路由数组
  const rightList = store.state.rightlist
  rightList.forEach(item => {
    item.children.forEach(item => {
      //item二级权限
      const temp = ruleMapping[item.path]
      //添加到二级路由中
      currentRoutes[2].children.push(itemp)
    })
  })
  //重新动态添加全部路由
  router.addRoutes(currentRoutes)
}