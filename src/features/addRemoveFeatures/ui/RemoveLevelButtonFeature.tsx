import { NavButtonItem } from "../components/navButtonItem";
import { useSetIsVisibleMenu } from "../../../shared/store/redux/slices/menuSlice";
import { useMutationButtonData } from "../model/useButtonsModel/useMutationButtonData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILevel } from "../../../types";
import { useGetSuspenseStateItem } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItem";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList";

export const RemoveLevelButtonFeature = suspenseHOCWrapper (

 ({ title }: { title:string }) => {

  const { setisVisibleMenu } = useSetIsVisibleMenu()
  const {  
    currentNodeId,  navTo, removeFromDB, changeAtDB,
  } = useMutationButtonData()
  const queryClient = useQueryClient() 
  
  const { data: level, isSuccess: levelIsSuccess } = useGetSuspenseStateItem<ILevel>( "level", "id", currentNodeId! )

  const { data: levels } = useGetSuspenseStateList<ILevel>("level", "discipline_id", level!.discipline_id)

  const { mutate } = useMutation({
    mutationFn: async() => {
      const position = +level!.levelPosition
      const levels_ = levels.filter( it => +it.levelPosition > position )
      const newLevelsRest = levels_.map( it => {
        const levelPosition = +it.levelPosition - 1 + ""
        let  createLevel = it.createLevel
        if( levelPosition === "0" ) {
          createLevel = "new"
        }
        return {
          ...it,
          createLevel,
          levelPosition
        } as ILevel

      }
    )

      await removeFromDB("level", level )
      await removeFromDB( "level", levels_ )
      await changeAtDB( "level", newLevelsRest )
    },
    async onSettled(data, error, variables, context) {
      await queryClient.invalidateQueries()
     
    },
  })

  if( levelIsSuccess ) {

    return (
      <NavButtonItem 
        title = { title }
        onclick = { ( e ) => {
          e.preventDefault()
          mutate(  )
          setisVisibleMenu( false )
          navTo( "discipline", level!.discipline_id )
        } }
      />
    )
  }
  else return null
}
)