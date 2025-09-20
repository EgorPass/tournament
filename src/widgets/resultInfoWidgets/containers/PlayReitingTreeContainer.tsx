import { ReitingTree } from "./ReitingTree"
import { useCreateReitingTree } from "../model/useCreateReitingTree"
import { suspenseHOCWrapper } from "../../../shared/HOCs"
import { IDiscipline, ITournamentPlayer } from "../../../types"
import { FC } from "react"

interface IProp {
  discipline: IDiscipline | undefined
  tournamentPlayers: ITournamentPlayer[]
}

export const PlayReitingTreeContainer: FC<IProp> = suspenseHOCWrapper(
  ({discipline, tournamentPlayers }) => {
    const { data, isSuccess } = useCreateReitingTree( discipline, tournamentPlayers )
    if( isSuccess ) {
      return(
        <ReitingTree womenPlayers={ data.womenPlayers } menPlayers={ data.menPlayers } discipline_id= { data.discipline_id }/>
      )
    }
    else 
    return null
  }
)