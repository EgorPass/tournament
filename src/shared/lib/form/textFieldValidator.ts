export const textFieldValidator = (value: string ) => (
  value && value.length  > 0 ? undefined : "*" 
)