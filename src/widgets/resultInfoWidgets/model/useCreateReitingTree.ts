import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ITournamentPlayer} from "../../../types"
import { PlayerReitingTree } from "../lib/PlayerReitingTree"
import { useReducingLevelData } from "./ useReducingLevelData"

export const useCreateReitingTreeFunction = () => {
  const getLevelListData = useReducingLevelData()

  return async (discipline_id: string, discipline: IDiscipline, tournamentPlayers: ITournamentPlayer[] ) => {
    const listData = await getLevelListData( discipline_id, discipline!, tournamentPlayers )
    const playerReitingTree = new PlayerReitingTree({
      boy: [], girl: [], tournamentPlayers, dqs: !!discipline ? discipline.dqs : [] 
    })
    const data = playerReitingTree.run( listData ).get()
    return {
      ...data,
      discipline_id
    }
  }
}

export const useCreateReitingTree = (discipline: IDiscipline, tournamentPlayers: ITournamentPlayer[]) => {
  
  const { currentNodeId } = useLocationHooks()
  const queryFunc = useCreateReitingTreeFunction()
  // const { tournamentPlayers , discipline } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  
  return useSuspenseQuery({
    queryKey: [ "discipline-get-game-reiting-tree", { "id": currentNodeId }],
    queryFn: async() => await queryFunc( currentNodeId, discipline!, tournamentPlayers )
  })
}