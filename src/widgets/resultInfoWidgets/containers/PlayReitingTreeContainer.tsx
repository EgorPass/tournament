import { ReitingTree } from "./ReitingTree"
import { useCreateReitingTree } from "../model/useCreateReitingTree"

export const PlayReitingTreeContainer = () => {
  const { data, isSuccess } = useCreateReitingTree()
  if( isSuccess ) {
    return(
      <ReitingTree womenPlayers={ data.womenPlayers } menPlayers={ data.menPlayers } discipline_id= { data.discipline_id }/>
    )
  }
  else 
  return null
}