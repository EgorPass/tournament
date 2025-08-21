import { getFullUnitName } from "../../../entities/unit/lib/getFullUnitName"
import { ILevel, ITournamentPlayerResult, ITournamentPlayer, ITournamentUnit, IUnit, ITournamentPlayerDQ, IFuckUpResultItem } from "../../../types"

interface ICreateTournamentUnit {
  age: string, 
  number: string, 
  weight: string, 
  tournament_id: string, 
  current_unit_id: string,
} 

interface ICreateTournamentUnitDiscipline {
  discipline_id: string, 
  tournament_id: string
  current_unit_id: string,
  tournament_unit_id: string,
}

interface ICreateTournamentPlayer {
  unit: IUnit,
  tour_unit: ITournamentUnit,
  tournament_id: string,
  discipline_id: string
}

interface ICreateLevelResult {
  level: ILevel,
  tournament_player_id: string
  tryAtLevel: number,
  result: number,
  errors: IFuckUpResultItem[]
  status?:  "dns" | "play" | "winner" | "looser" | `DQ`
  subTry?: number
}

interface ICreateTournamentPlayerDQ {
  level: ILevel,
  tournament_player_id: string
  tryAtLevel: number,
  dq: string,
  desc: string,
  subTry: number,
}

export const apiForCreateData = {

  createUniqeId(){
    const cryptoId = crypto.randomUUID()
    const timestamp = Date.now().toString(16)
    const tour_unit_id = cryptoId + "-" + timestamp
    return tour_unit_id
  },

  createTournamentUnit_( { age, number, weight, tournament_id, current_unit_id} : ICreateTournamentUnit ) {
    const id = this.createUniqeId()
    return {
      id, age, number, weight, tournament_id, current_unit_id
    }
  },

  createTournamentUnitDiscipline ( { discipline_id, tournament_unit_id, current_unit_id, tournament_id} : ICreateTournamentUnitDiscipline) {
    const id = this.createUniqeId()
    return {
      id, 
      discipline_id, tournament_unit_id, tournament_id, current_unit_id
    }
  },

  createTournamentPlayer ({
    unit, tour_unit, tournament_id, discipline_id
  }: ICreateTournamentPlayer) :ITournamentPlayer {

    return {
      id: "",
      // reiting: "no-result",
      age: tour_unit!.age,
      gender: unit.gender,
      number: tour_unit!.number,
      weight: tour_unit!.weight,
      name: getFullUnitName( unit ),
      current_unit_id: unit.id,
      tournament_unit_id: tour_unit.id,
      tournament_id, discipline_id,
      status: "play",
    } satisfies ITournamentPlayer
  },
  createLevelResult( {level, tournament_player_id, result = 0, errors, tryAtLevel, status = "play", subTry = 1 } : ICreateLevelResult) {
    return{
      id: "",
      level_id: level.id,
      discipline_id: level.discipline_id,
      tournament_id: level.tournament_id,
      tournament_player_id,
      try: tryAtLevel,
      fuckup: errors,
      result,
      status,
      subTry
    } satisfies ITournamentPlayerResult
  },
  createTournamentPlayerDQ( { level, tournament_player_id, tryAtLevel,dq, desc, subTry = 1 } : ICreateTournamentPlayerDQ ) {
    return {
      id: "", level_id: level.id, discipline_id: level.discipline_id, tournament_id: level.tournament_id, tournament_player_id,
      try: tryAtLevel,
      dq: dq,
      desc: desc,
      restart: false,
      subTry
    } satisfies ITournamentPlayerDQ
          
  }
}
