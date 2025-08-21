import CreateLayout from "../layout/createLayout"

const delay = (ms: number) => {
  return new Promise( (res) => {
    setTimeout (() => {
      res( true )
     }, ms )
  })
}

export const createRoute = {
  path: "api/create",
  element: <CreateLayout />,
  // async lazy() {
  //   await delay( 1500 )
  //   let component = await import ( "../layout/createLayout")
  //   return { Component: component.default }
  // },
  children: [
    {
      path: "current_unit" ,
      // element: <CreateUnit />,
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/currentUnitPages/createUnit")
        return { Component: component.default }
      },
    }, 
    {
      path: "tournament" ,
      // element: <CreateTournamet />,
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/tournamentPages/createTournament" )
        return { Component: component.default }
      },
    },
    {
      path: "discipline" ,
      // element: <CreateTournametDiscipline />,
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/disciplinePages/createTournamentDiscipline")
        return { Component: component.default }
      },
    },
    {
      path: "level" ,
      // element: <CreateTournametDisciplineLevel />,
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/levelPages/createTournamentDisciplineLevel")
        return { Component: component.default }
      },
    },
    {
      path: "tournament_unit",
      // element: <CreateTournamentUnit />,
      async lazy() {
        // await delay( 1500 )
        let component = await import ( "../../pages/ui/tournamentUnitPages/createTournamentUnitPage")
        return { Component: component.default }
      }
    },
   
  ] 
} 