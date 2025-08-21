import { useSuspenseQuery } from "@tanstack/react-query"
import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { IDiscipline, ILevel, ILevelList,  ILevelListItem,  ILevelReitingList,  IPlayerReitingData,  ITournament,  ITournamentPlayer, ITournamentPlayerDQ, ITournamentPlayerResult, TPlayersReitingLevelListItem } from "../../../types"
import { useDBGetMethods } from "../../../shared/store/offlineDB"

export const usePlayLayoutProvider = () => {
  const { getItemFromDB, getItemsFromDB  } = useDBGetMethods()
  const { currentNodeId, pathname, } = useLocationHooks()

  // console.log( "render use layout.....")
  // console.log( "current node id ", currentNodeId )

  async function disciplineGetGameData() {
    // console.log( "update data ......")
    let fullFinished = false
    let dqsState: boolean = false
    let resultState: boolean = false
    let level: ILevel | undefined = undefined;
    let discipline: IDiscipline | undefined = undefined
    let tournament: ITournament | undefined = undefined
    let levelList: ILevelList | undefined = undefined
    let levelListItem: ILevelListItem | undefined = undefined
    let levelReitingList: ILevelReitingList | undefined = undefined
    let currentLevelReitingList: IPlayerReitingData[] = []
    let tournamentPlayers: ITournamentPlayer[] = []
    let tournamentPlayerDQs: ITournamentPlayerDQ[] = []
    let tournamentPlayerResults: ITournamentPlayerResult[] = []
    let isLastLevel: boolean = false
    if( pathname === "discipline" ) {

      discipline = await getItemFromDB<IDiscipline>(pathname, "id", currentNodeId )
      tournamentPlayers = await getItemsFromDB<ITournamentPlayer>("tournament_player", "discipline_id", currentNodeId)
      const tournament_id = discipline ? discipline.tournament_id : ""
      tournament = await getItemFromDB<ITournament>("tournament", "id", tournament_id)
      const levels = await getItemsFromDB<ILevel>("level", "discipline_id", currentNodeId )
      level = levels.find( it => it.status === "play")
      const lastLevel = levels.sort( ( x, y ) => +x.levelPosition - +y.levelPosition )[ levels.length -1 ]
      isLastLevel = (!!level && level.levelPosition === lastLevel.levelPosition ) 

      if( !!level ) {
        levelList = await getItemFromDB<ILevelList>("level_list", "level_id", level.id )
        levelReitingList = await getItemFromDB<ILevelReitingList>("level_reiting_list", "level_id", level.id )
      }

      if( !!levelList ) {
        const { finishedPosition, list } = levelList 
        fullFinished =  finishedPosition.length === list.length;
        const { currentPosition } = levelList
        levelListItem = levelList.list.find( it => it.position === currentPosition )
      }

      if( !!level && !!levelListItem ) {
        const gender = levelListItem!.gender
        const category = levelListItem!.category
        
        currentLevelReitingList = ( levelReitingList as unknown as { [key: string]: TPlayersReitingLevelListItem[]} )[gender]
          .filter(it => it.category === category )
          .map( it => it.players )
          .flat()
     
        const playerIdList = levelListItem!.data
        tournamentPlayerDQs = await getItemsFromDB<ITournamentPlayerDQ>("tournament_player_dq", "level_id", level.id)
        tournamentPlayerResults = await getItemsFromDB<ITournamentPlayerResult>("level_result", "level_id", level.id )
        resultState = tournamentPlayerResults.filter( it => playerIdList.includes(it.tournament_player_id )).length > 0
        dqsState = tournamentPlayerDQs.filter( it => playerIdList.includes(it.tournament_player_id )).length > 0
      }
      
    }

    // console.log( fullFinished )

    return {
      isLastLevel,
      fullFinished, resultState, dqsState, 
      tournamentPlayers, tournamentPlayerDQs, tournamentPlayerResults,
      levelList, levelListItem, 
      levelReitingList, currentLevelReitingList,
      level, discipline, tournament,
    }
  }

  return useSuspenseQuery({
    queryKey: [ "discipline-get-game-data", { "id": currentNodeId } ],
    queryFn: disciplineGetGameData
  })
}