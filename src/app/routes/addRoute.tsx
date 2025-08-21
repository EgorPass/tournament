import AddLayout from "../layout/addLayout"

const delay = (ms: number) => {
  return new Promise( (res) => {
    setTimeout (() => {
      res( true )
     }, ms )
  })
}

export const addRoute = {
  path: "api/add",
  // element: <AddLayout />,
  async lazy() {
    // await delay( 1500 )
    let component = await import ( "../layout/addLayout" )
    return { Component: component.default }
  },
  children: [
    {
      path: "tournament_unit", 
      async lazy() {
        await delay( 1500 )
        let component = await import ( "../../pages/ui/addPages/addUnitAtTournament")
        return { Component: component.default }
      },
    }
  ]
} 