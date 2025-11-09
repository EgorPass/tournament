import { ReactNode } from "react"
import { FormRenderProps } from "react-final-form"

///////// DB && Redux ORM //////////////////

export type TObjectStrings = { [k: string]: string }

export type TPlayStatus = "prepare" | "play" | "gameOver" | "paused"

export interface ITournament {
  name: string
  family: string
  date: string
  organizer: string
  status: TPlayStatus
  id: string
  address: {
    city: string
    street: string
    structure: string
    build: string
    place: string
  }
}

export type TTreeDate = [string, ITournament[]]
export type TGetTournamentListResponse = Array<[string, {
  actual: ITournament[];
  finished: ITournament[];
  fuckup: ITournament[];
}]>


export interface ICategoriesItem {
  from: string,
  to: string,
}
export type ICategoriesItems = Array<ICategoriesItem>

export type DQTypes = { qual: string, name: string, description: string, type: "discipline" | "level", reiting: string[], looser: string[] }

export interface IDiscipline {
  id: string
  name: string
  categories: string
  condition: string
  status: TPlayStatus
  tournament_id: string
  menCategories: ICategoriesItems
  womenCategories: ICategoriesItems
  dqs: Array<DQTypes>
}

export interface ILevel {
  createLevel: string
  discipline_id: string
  tournament_id: string,
  status: TPlayStatus
  try: string
  categories: {
    check: string;
    mensList: string[];
    womensList: string[];
  }
  fromResult: {
    tournament: string,
    discipline: string,
    level: string
  },
  levelPosition: string,
  id: string
  name: string
  sort: {
    qual: string,
    type: string,
    versus: string,
  } 
  units: {
    condition: string,
    from: string,
    qual: string
  }
  win: {
    condition: string,
    qual: string,
    roundWinner: string,
  }
}

export interface IUnit {
  id: string
  firstName: string
  lastName: string
  secondName: string
  birthday: string
  gender: string
  borncity: string
  club: string
  rate: string
  trener: string
  weight: string
  // orm?: SessionBoundModel
}

export interface ITournamentUnit {
  id: string,
  age: string,
  weight: string,
  number:  string,
  current_unit_id: string,
  tournament_id: string,
  // orm?:SessionBoundModel,
}

export interface ITournamentUnitDiscipline {
  id: string,
  current_unit_id: string,
  discipline_id: string,
  discipline_name?: string,
  discipline_range?: string,
  tournament_id: string,
  tournament_unit_id: string,
  tournament_unit_number?: string,
}

export type TDisciplineList = Array<{ title: string, data: ITournamentUnitDiscipline}>

export interface IUnitTournamentData {
  tournament: ITournament,
  discipline: IDiscipline[]

}

export interface IUnitDiscipineData {
  tournament: ITournament,
    discipline: {
      unit_id: string,
      discipline: IDiscipline
    }[]
}

export type TUnitDisciplineData = {
  [status: string] : {
    tournament: ITournament,
    discipline: {
      unit_id: string,
      discipline: IDiscipline
    }[]
  }[]
}

//////////////// components /////////////////////


type TPathData = {  
  id: string | undefined,
  pathname: string,
}

export interface ILinkBoxStyled {
  $to: string,
  $state?: {
    from: TPathData,
  }
}

export interface ILinkBox {
  children: ReactNode,
  to: string,
  state?: {
    from: TPathData,
  }
}

export interface INavRadioMenuItem {
  title: string
  value: string
  storeValue: string
  callback: () => void
}
type INavMenuListItem = Pick<INavRadioMenuItem, "title" | "value">
export type INavMenuList = Array<INavMenuListItem>


export interface ITournamentUnitData {
  unit: IUnit
  tournamentUnit: ITournamentUnit 
  range?: string
  id: string
}

////////////////////////////////////

export interface IOutletContext {
  props?: FormRenderProps
  titleMod?: string
}

//////////////// pages ////////////////////

export interface IInputObject {
  name: string
  type: "text" | "date" | "number" | "radio"
  title?: string
  placeholder?: string
}




//////// admin ////////////////

export interface IExportDataItems {
  typeForExport: string[],

  selectUnits: string,
  selectTours: string,
  chooseUnits: string,
  chooseTours: string,
      
  current_unit_list: IUnit[],
  tournaments_list: ITournament[],
  tournamentUnits: string[]

  update: boolean

  fileName: string

  importData: {
    current_unit: IUnit[],
    tournament_unit: ITournamentUnit[],
    tournament_unit_discipline: ITournamentUnitDiscipline[],
    tournament: ITournament[],
    discipline: IDiscipline[],
    level: ILevel[],
  }
}

export type TPlayerStatus = "play" | "gameOver"
export type TLevelPlayerStatus = "play" | "looser" | "winner" | `DQ - ${ string }`

export interface ITournamentPlayer {
  id: string,
  age: string, 
  gender: string,
  number: string,
  weight: string,
  name: string, 
  current_unit_id: string,
  tournament_unit_id: string,
  tournament_id: string,
  discipline_id: string,
  status: TPlayerStatus,
  // reiting: string,
  // levelStatus: TLevelPlayerStatus
  // levelReiting: number | null
}



export interface ICategoryPlayersList {
  category: string; 
  players: ITournamentPlayer[] 
}

export interface IPlayerReitingData {
  tournament_player_id: string,
  levelStatus: TLevelPlayerStatus
  levelReiting: number | null
}

export type TPlayersReitingLevelListItem = {
  category: string,
  players: IPlayerReitingData[]
}

export type  ExcludeTypePlayerReiting =  ITournamentPlayer &  Omit<IPlayerReitingData, "tournament_player_id">

export type TCategoryFabric = { 
  category: string
  players: ( ITournamentPlayer &  ExcludeTypePlayerReiting)[]
}
export interface ILevelListItem {
  category: string,
  gender: string,
  position: number
  data: Array<string> // players id 
}
export interface ILevelList {
  id: string,
  level_id: string,
  discipline_id: string,
  tournament_id: string,
  try: number,
  currentPosition: number,
  finishedPosition: number[],
  list: Array<ILevelListItem>
  
  // playersReiting: {
  //   [ key:string ]: TPlayersReitingLevelListItem[]
  // }
}

export interface ILevelReitingList {
  id: string,
  level_id: string,
  discipline_id: string,
  tournament_id: string,
  boy: TPlayersReitingLevelListItem[]
  girl: TPlayersReitingLevelListItem[]

}

export interface ITournamentPlayerDQ {
  id: string,
  level_id: string,
  tournament_id: string,
  discipline_id: string,
  tournament_player_id: string,
  try: number,
  subTry: number,
  dq: string,
  desc: string,
  restart: boolean
}

export interface IFuckUpResultItem {
  // [ key: string ]: ( string | number )
  data: number
  desc: string
}

export interface ITournamentPlayerResult{
  id: string,
  level_id: string,
  discipline_id: string,
  tournament_id: string,
  tournament_player_id: string,
  try: number,
  subTry: number,
  fuckup: Array<IFuckUpResultItem> //| null,
  result: number,
  status: "dns" | "play" | "winner" | "looser" | `DQ`
}

export type TBookMark = "info" | "reiting" | "play"


export interface IPLayLayoutContext {
  tournament: ITournament | undefined,
  discipline: IDiscipline | undefined,
  level: ILevel | undefined,
  levelList: ILevelList | undefined,
  levelListItem: ILevelListItem | undefined,
  levelReitingList: ILevelReitingList | undefined
  currentLevelReitingList: IPlayerReitingData[]
  tournamentPlayers: ITournamentPlayer[],
  fullFinished: boolean,
  resultState: boolean
  dqsState: boolean
  tournamentPlayerDQs: ITournamentPlayerDQ[]
  tournamentPlayerResults: ITournamentPlayerResult[]
  isLastLevel: boolean
}


export interface IPlayerModalData {
    status: boolean;
    gender: "" | "boy" | "girl",
    category: string,
    playersId: string[]
    position: number
}

export interface IPlayerModalReiting {
  status: boolean
  player_id: string
  discipline_id: string
}

export interface IPlayerResults {
  errors: IFuckUpResultItem[]
  results: { [ k: string ]: string | number }
}

export interface IInitialResultObj {
  [key: string] : IPlayerResults
}

export interface IInitialDqObj  {
  [key: string]: {
    [k: string]: string 
  }[]
}

export type TDataToTreeModalForm = {
  tryAtLevel: number, 
  data: {
    tryAtLevel: number, 
    subTry: number, 
    tournament_player_id: string,
    player: ITournamentPlayer
  }[][]
}

export type TResults =  { results?: TObjectStrings, errors: TObjectStrings[] }
export type TDq = []
export type TResultCorteg = [string, TResults ]
export type TDqCorteg = [string, TObjectStrings[] ]
export type TResultsModalForm = {
  [ idx: string ] : { 
    [ id: string ] :TResults
  }
}
export type TDqModalFrom = {
  [ idx: string ] : {
    [id: string ] : TObjectStrings[]
  }
}
export type TInitialValuesForModalForm = {
  dq: TDqModalFrom
  results: TResultsModalForm,
}

export type TModalResultCorteg =[ string, { [id :string]: TResults  } ]
export type TModalDqCorteg = [ string, { [id: string]: TObjectStrings[]} ]

export interface IModalPlayerLayoutConsummer {
  resetState: {}
  setResetState: React.Dispatch<React.SetStateAction<{}>>
  status: boolean, 
  dqsList: DQTypes[], 
  players: ITournamentPlayer[],
  pastLevelDqs: ITournamentPlayerDQ[], 
  dataToTreeModalForm : TDataToTreeModalForm[], 
  initialValuesForForm: TInitialValuesForModalForm, 
}