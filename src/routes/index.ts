import Loadable from '@loadable/component' // 用于代码分割时动态加载模块
import { RouteConfig } from 'react-router-config'

/**
 * @exact 是否采用精确匹配,嵌套路由不要加exact属性，如果父级路由加上，这里例如topics加上该属性，他下面的子路由将不会生效，因为外层强制匹配了。
 */
const routesConfig: RouteConfig[] = [
    {
        path: '/index',
        // exact: true,
        component: Loadable(() => import('@/pages/layout')),
        routes: [
            {
                path: '/index/home',
                component: Loadable(() => import('@/pages/home'))
            },
            {
                path: '/index/user',
                exact: true,
                component: Loadable(() => import('@/pages/user'))
            }
        ]
    },
    {
        // path: '/notfound',
        exact: false,
        component: Loadable(() => import('@/pages/notfound'))
    }
]

export default routesConfig