export const CUSTOM_LAYOUT_ROUTES = [
  '/ai/newchatbot',
  '/ai/chatbot',
  '/figma/plant-shop',
  '/figma/plant-shop/favorites',
  '/figma/plant-shop/cart',
  '/figma/plant-shop/profile',
  '/figma/plant-shop-preview'
]

export const shouldUseCustomLayout = (pathname: string) => {
  return CUSTOM_LAYOUT_ROUTES.includes(pathname)
}
