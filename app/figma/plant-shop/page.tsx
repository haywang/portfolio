'use client'

import Title from '@/components/plant-shop/Title'
import Banner from '@/components/plant-shop/Banner'
import TabList from '@/components/plant-shop/TabList'
import Filter from '@/components/plant-shop/Filter'
import ProductList from '@/components/plant-shop/ProductList'

// 基本使用
{
  /* <Navbar />

// 自定义标题
<Navbar title="My Plants" />

// 隐藏返回按钮
<Navbar showBackButton={false} />

// 添加过滤器点击事件
<Navbar onFilterClick={() => console.log('Filter clicked')} /> */
}

export default function PlantShop() {
  const handleTabChange = (tabId: string) => {
    console.log('Selected tab:', tabId)
  }

  const handleFilterChange = (filterId: string) => {
    console.log('Selected filter:', filterId)
  }

  return (
    <div className="pb-12">
      <Title />
      <TabList />
      <Filter />
      <ProductList />
      <Banner />
    </div>
  )
}
