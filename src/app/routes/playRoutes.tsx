
export const playRoute = {

  path: "api/play",
  async lazy() {
    let component = await import ("../layout/playLayout" )
    return { Component: component.default }
  },
  children: [
    {
      path: "tournament",
      async lazy() {
        let component = await import ("../../pages/ui/tournamentPages/PlayTournament")
        return { Component: component.default }
      }
    },
    
    {
      path: "discipline",
      async lazy() {
        let component = await import ("../../pages/ui/playPages/PlayDiscipline")
        return { Component: component.default }

      }
    },
    {
      path: "discipline/prepare_level",
      async lazy() {
        let component = await import ("../../process/ui/PlayDiscipinePreparelevelFeature")
        return { Component: component.default }

      }
    },
  
  ]

}