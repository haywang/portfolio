export const CUSTOM_LAYOUT_ROUTES = [
  '/ai/newchatbot',
  '/ai/chatbot',
  '/figma/plant-shop'
]

export const shouldUseCustomLayout = (pathname: string) => {
  return CUSTOM_LAYOUT_ROUTES.includes(pathname)
}
