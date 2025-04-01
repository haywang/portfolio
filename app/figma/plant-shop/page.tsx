import Navbar from '@/components/plant-shop/Navbar'

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
  return (
    <>
      <Navbar />
    </>
  )
}
