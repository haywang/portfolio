'use client'

interface ProductDescriptionProps {
  title?: string
  description: string
  className?: string
}

export default function ProductDescription({
  title = 'Description',
  description,
  className = ''
}: ProductDescriptionProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* 标题 - 使用Montserrat字体，字重600，13px */}
      <h3 className="font-montserrat mb-3 text-[13px] font-semibold text-black">
        {title}
      </h3>

      {/* 描述文本 - 使用Montserrat字体，字重500，13px，行高1.4，半透明黑色 */}
      <p className="font-montserrat text-[13px] font-medium leading-[1.4] text-black/50">
        {description}
      </p>
    </div>
  )
}
