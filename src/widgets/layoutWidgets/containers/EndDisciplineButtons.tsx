import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BackButtonFeature } from "../../../features/layoutFeatures"
import { LayoutButton } from "../../../shared/components/buttonsAndLinks"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useDBGetMethods, useDBSetMethods } from "../../../shared/store/offlineDB"
import { IDiscipline } from "../../../types"
import { useNavigate } from "react-router-dom"
import { useSetBookMark } from "../../../shared/store/redux/slices/bookMarkSlice"


export const EndDisciplineButtons = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { currentNodeId } = useLocationHooks()
  const { getItemFromDB } = useDBGetMethods()
  const { changeAtDB } = useDBSetMethods()
  const { setBookMark } = useSetBookMark()

  const mutate = useMutation({
    mutationFn: async( ) => {
      
      console.log( "end discipline ......")

      const disipline = await getItemFromDB<IDiscipline>( "discipline", "id", currentNodeId )
      
      if( disipline ) {

        console.log( "end discipline ")
        console.log( disipline )
        
        await changeAtDB<IDiscipline>( "discipline", { ...disipline, status: "gameOver" })
      
        await queryClient.invalidateQueries( {
          queryKey: ["discipline", { "id": currentNodeId } ] 
        })
        setBookMark("reiting")
        navigate( `/api/view/discipline/check`, { state: { from: { pathname: "discipline", id: currentNodeId } } , replace: true })
      
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
      <BackButtonFeature />
    </>
  )
}