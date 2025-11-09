
const delay = (ms: number) => {
  return new Promise( (res) => {
    setTimeout (() => {
      res( true )
     }, ms )
  })
}


export const viewRoute = {
    path: "api/view",
    // element: <ViewLayout />,
    async lazy() {
      // await delay( 1500 )
      let component = await import ( "../layout/viewLayout" )
      return { Component: component.default }
      
    },
    children:  [
      {
        path: "tournaments",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/tournamentsPage")
          return { Component: component.default }
        },
      },
      {
        path: "unit_list",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/unitList")
          return { Component: component.default }
        },
      },
      {
        path: "tournament/check",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../process/ui/TournamentRedirect")
          return { Component: component.default }
        },
        async loader({ request, params}: any) {
          // console.log( request )
          // console.log( params )
          return null
        }
      },
      {
        path: "tournament",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/tournamentPages/currentTournament")
          return { Component: component.default }
        },
        async loader({ request, params}: any) {
          // console.log( request )
          // console.log( params )
          return null
        }
      },
      {
        path: "discipline/check",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../process/ui/DisciplineRedirect" )
          return { Component: component.default }
        },
      },
      {
        path: "discipline",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/disciplinePages/tournamentDiscipline")
          return { Component: component.default }
        },
      },
      {
        path: "level",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/levelPages/tournamentDisciplineLevel")
          return { Component: component.default }
        },
      },
      {
        path: "current_unit",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/currentUnitPages/currentUnit" )
          return { Component: component.default }
        },
      },
      {
        path: "tournament_unit",
        async lazy() {
          // await delay( 1500 )
          let component = await import ( "../../pages/ui/tournamentUnitPages/tournamenttUnitViewPage")
          return { Component: component.default }
        },
      },
    ]
  }
