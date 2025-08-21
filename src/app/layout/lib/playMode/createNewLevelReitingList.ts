import { ILevelReitingList, IPlayerReitingData, TPlayersReitingLevelListItem } from "../../../../types";

interface IProp {
  gender: string, 
  category: string,  
  levelReitingList: ILevelReitingList, 
  playerReitingList: IPlayerReitingData[]
}

/**
 * создаём новый levelReitingList исходя из обновлённого currentReitingLevelList
 */
export const createNewLevelReitingList = ( { levelReitingList, gender, category,  playerReitingList} : IProp ) => {
  const boy = levelReitingList.boy.slice()
  const girl = levelReitingList.girl.slice()
  return {
    ...levelReitingList,
    boy: gender === "boy" ? mapLevelReitingListGender( boy, playerReitingList, category ) : boy ,
    girl: gender === "girl" ? mapLevelReitingListGender( girl, playerReitingList, category ) : girl
  } as ILevelReitingList
}
function mapLevelReitingListGender( data: TPlayersReitingLevelListItem[ ], playerReitingList:  IPlayerReitingData[], category: string ) {
    return data.map( it => {
      if( it.category === category ) {
        return {
          ...it,
          players: playerReitingList
        }
      }
      else return it
    })
  }