export const isPropInPageActions = ( obj: {[key: string]: any } , prop: string) => {
  return prop in obj
}