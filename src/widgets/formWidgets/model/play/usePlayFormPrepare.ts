import { usePlayLayoutContextConsumer } from "../../../../features/layoutFeatures"
import { ExcludeTypePlayerReiting, IPLayLayoutContext } from "../../../../types"

export const usePlayFormPrepare = () => {
  const { level, levelList, levelListItem, tournamentPlayers, fullFinished,  currentLevelReitingList  } = usePlayLayoutContextConsumer() as IPLayLayoutContext

  let playersData: ExcludeTypePlayerReiting[]  = []
  let plyaerInGame: string[] = []

  if( !fullFinished && !!levelListItem ) {
    const players = tournamentPlayers.filter( player => levelListItem!.data.includes( player.id ) )
  
    playersData = players.reduce( (acc, item) => {
      const playerReiting = currentLevelReitingList.find(  crl => crl.tournament_player_id === item.id )
  
      if( !!playerReiting ) 
        acc.push({
                  ...item, 
                  levelReiting: playerReiting.levelReiting,
                  levelStatus: playerReiting.levelStatus
                })
      return acc
    }, [] as ( ExcludeTypePlayerReiting)[])
  
    const idWithOutDQ = currentLevelReitingList.filter( it => !it.levelStatus.startsWith("DQ")).map( it => it.tournament_player_id)
  
    plyaerInGame = !levelListItem 
                          ? [] as string[] 
                          :levelListItem.data.filter( id => idWithOutDQ.includes( id ) )
  }

  return { 
    plyaerInGame,
    fullFinished, level, levelList, levelListItem, 
    playersData 
  }
}