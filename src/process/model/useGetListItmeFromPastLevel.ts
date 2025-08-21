import { useDBGetMethods } from "../../shared/store/offlineDB"
import { ITournamentPlayer, ILevel, ILevelReitingList, IDiscipline, TCategoryFabric } from "../../types"
import { PlayerReitingListConstructorToCategoryFabrica } from "../../widgets/resultInfoWidgets/lib/PlayerReitingListConstructorToCategoryFabrica"
import { ReducingFutureLevels } from "../../widgets/resultInfoWidgets/lib/ReducingFutureLevels"

export const useGetListItmeFromPastLevel = () => {

  const { getItemsFromDB } = useDBGetMethods()
 
  return async( currentLevel: ILevel, levels: ILevel[], discipline: IDiscipline ) => {
    const levelReitingList = await getItemsFromDB<ILevelReitingList>( "level_reiting_list", "discipline_id", discipline.id )
    const tournamentPlayers = await getItemsFromDB<ITournamentPlayer>("tournament_player", "discipline_id", discipline.id )

    const reducingFutureLevel = new ReducingFutureLevels({ levels, discipline, tournamentPlayers: [], levelReitingList })

     const { 
      createLevel,
      levelPosition,
      fromResult: { level: fromLevelId },
      categories: { mensList, womensList },
    } = currentLevel

    let pastLevel: ILevel | undefined = undefined 
    if( createLevel === "fromLevelResult" ){
      pastLevel = levels.find( it => it.id === fromLevelId )
    }
    if( createLevel === "fromPastLevel" ){
      pastLevel = levels.find( it => +it.levelPosition === +levelPosition - 1 )
    }

    const boy = reducingFutureLevel.recurtionForReduceResults({ currentLevel, pastLevel, genderList: mensList, gender: "boy", results: []})
    const girl = reducingFutureLevel.recurtionForReduceResults({ currentLevel, pastLevel, genderList: womensList, gender: "girl", results: []})

    const data = new PlayerReitingListConstructorToCategoryFabrica( { boy, girl, tournamentPlayers }).get()

    return { ...data, state: "accept" } as { 
      womenPlayers: TCategoryFabric[]
      menPlayers: TCategoryFabric[]
      state: "accept" | "error" }
    }
}
