import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BackButtonToPlayFeature } from "../../../features/layoutFeatures"
import { LayoutButton } from "../../../shared/components/buttonsAndLinks"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useDBGetMethods, useDBSetMethods } from "../../../shared/store/offlineDB"
import { IDiscipline } from "../../../types"
import { useNavigate } from "react-router-dom"


export const EndDisciplineButtons = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { currentNodeId } = useLocationHooks()
  const { getItemFromDB } = useDBGetMethods()
  const { changeAtDB } = useDBSetMethods()


  const mutate = useMutation({
    mutationFn: async( ) => {
      
      const disipline = await getItemFromDB<IDiscipline>( "discipline", "id", currentNodeId )
      
      if( disipline ) {

        console.log( "end discipline ")
        console.log( disipline )
        
        await changeAtDB<IDiscipline>( "discipline", { ...disipline, status: "gameOver" })
      
        await queryClient.invalidateQueries()

        navigate( `/api/view/dsicipline`, { state: { from: { pathname: "discipline", id: currentNodeId }}})
      }
    }
  })


  return (

    <>
      <LayoutButton 
        $actionType= "save"
        $disabled = { false }
        $callback={ ( ) => { mutate.mutate() } }
      >
        Завершить
      </LayoutButton>
      <BackButtonToPlayFeature/> 
    </>
  )
}