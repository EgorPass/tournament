
type TQKey =  ( string | { [key: string]: string } )[]


export const setBackDataToMutation = ( pathname: string, id: string | null, queryKey?: Array<TQKey> ) => {
  const state = !id ? null : { from: { id, pathname } }
  return {
    state,
    replace: true,
    dirname: `/api/view/${ pathname }`,
    queryKey,
  }
}