import AdminLayout from "../layout/adminLayout"

const delay = (ms: number) => {
  return new Promise( (res) => {
    setTimeout (() => {
      res( true )
     }, ms )
  })
}

export const adminRoute = {
  path: "api/admin",
  // element: <AdminLayout />,
  async lazy() {
    // await delay( 1500 )
    let component = await import ( "../layout/adminLayout" )
    return { Component: component.default }
  },
  children: [
    {
      path: "export",
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/adminPages/exportDataPage" )
        return { Component: component.default }
      },
    },
    {
      path: "import",
      // element: <ImportDataPage />,
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/adminPages/importDataPage" )
        return { Component: component.default }
      },
    }
  ]
}