import { ExcludeTypePlayerReiting, IDiscipline, ILevel, ILevelReitingList, ITournamentPlayer, TLevelPlayerStatus, TPlayersReitingLevelListItem } from "../../../types"

export type TDqState = {
                status: boolean,
                reiting: boolean,
                dq: string
              }

export type TResultState = {
                data: string | number | null,
                qualWins: boolean
                wins: string
              } | null


export type TReitingPlayerData = {
  name: string,
  dqList: string[]
  dqState: TDqState
  resultState: TResultState
  levelStatus: TLevelPlayerStatus
  levelReiting: number | null
  id: string
}

export type TCategoryReitingData = { 
  position: number,
  playersData: Array<TReitingPlayerData>
}


export type TReitingCategoryObject = {
  [category: string ] : Array<TCategoryReitingData>
}

export type TReitingCategoryList = [ string, Array<TCategoryReitingData> ]

export type TCategoryPlayerList = {
  [ category: string ]: ExcludeTypePlayerReiting[]
}

export type TPlayerReitingData = {
  [ gender: string ]: TCategoryPlayerList,
}

export interface IPlayerReitingListConstructor {
  boy: TPlayersReitingLevelListItem[]
  girl: TPlayersReitingLevelListItem[]
  tournamentPlayers: ITournamentPlayer[]
}

export interface IReducingLevels {
  levels: ILevel[],
  discipline: IDiscipline
  levelReitingList: ILevelReitingList[], 
  tournamentPlayers: ITournamentPlayer[]
}

export type TReducingLevelData = { level: ILevel, boy: TReitingCategoryList[], girl: TReitingCategoryList[] }

export type TError = {
  desc: string,
  data: string
}
export type TSubTry = {
  result: string,
  errors: TError[],
  subTry: number
}
export type TLevelData = {
  level_name: string
  level_dqs: string[]
  level_results: [ string | number, TSubTry[] ][]
}