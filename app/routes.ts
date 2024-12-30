export const CUSTOM_LAYOUT_ROUTES = ['/ai/newchatbot', '/ai/chatbot']

export const shouldUseCustomLayout = (pathname: string) => {
  return CUSTOM_LAYOUT_ROUTES.includes(pathname)
}
