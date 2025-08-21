import { useMutationButtonData } from "./useMutationButtonData"
import { ILevel } from "../../../../types"
import { useMutateButton } from "./useMutateButton"
import { setBackDataToMutation } from "../../lib/setBackDataToMutation"

export const useRemoveLevelButton = () => {
  const {  
    currentNodeId, getItemFromDB, removeFromDB  
  } = useMutationButtonData()
  
  return useMutateButton({
    func: async() => {
      const level = await getItemFromDB<ILevel>("level", "id", currentNodeId )
      await removeFromDB("level", level )
      return setBackDataToMutation( "discipline", level!.discipline_id )
    },
   }
  )
}