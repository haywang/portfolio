export const CUSTOM_LAYOUT_ROUTES = ['/ai/newchatbot']

export const shouldUseCustomLayout = (pathname: string) => {
  return CUSTOM_LAYOUT_ROUTES.includes(pathname)
}
