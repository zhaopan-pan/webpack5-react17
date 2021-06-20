import React from 'react'
import { MobXProviderContext } from 'mobx-react'
import stores from '@/store' // 公共数据池

export type StoreType = typeof stores

// 声明 store 类型
interface ContextType {
    stores: StoreType
}

// 这两个是函数声明，重载
//不传参返回整个store
function useStores(): StoreType
//传参的话返回指定store
function useStores<T extends keyof StoreType>(storeName: T): StoreType[T]

/**
 * 获取根 store 或者指定 store 名称数据
 * @param storeName 指定子 store 名称
 * @returns typeof StoreType[storeName]
 */
function useStores<T extends keyof StoreType>(storeName?: T) {
    const rootStore = React.useContext(MobXProviderContext) // 拿到在项目根结点注入的数据
    const { stores } = rootStore as ContextType
    return storeName ? stores[storeName] : stores
}
export default useStores
