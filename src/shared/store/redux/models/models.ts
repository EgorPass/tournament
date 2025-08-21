import { ORM, Model, attr, fk, oneToOne, many } from "redux-orm"

function createModel ( name: string, obj: {},) {
  return class extends Model {
    static modelName = name;
    static fields = obj
  }
}

function forgienKey( className: string, association: string, relatedName: string ) {
  return fk({
    to: className,
    as: association,
    relatedName
  })
}

function uniqueKey( className: string, association: string, relatedName: string) {
  return oneToOne({
    to: className,
    as: association,
    relatedName
  })
}

const Current_unit = createModel( "Current_unit", {
  firstName: attr(),
  secondName: attr(),
  lastName: attr(),
  gender: attr(),
  birthday: attr(),
  borncity: attr(),
  weight: attr(),
  id: attr(),
})

const Tournament = createModel( "Tournament", {
  id: attr(),
  name: attr(),
  date: attr(),
  family: attr(),
  organizer: attr(),
  addres: attr(),
  finished: attr(),
})

const Discipline = createModel( "Discipline", {
  id: attr(),
  name: attr(),
  condition: attr(),
  categories: attr(),
  rangeUnit: attr(),
  fromResult: attr(),
  manCategories: attr(),
  womenCategories: attr(),
  dqs: attr(),
  finished: attr(),

  tournament_id: forgienKey( "Tournament", "tournament", "discipline"),
})

const Level = createModel( "Level", {
  id: attr(),
  name: attr(),
  levelPosition: attr(),
  categories: attr(),
  units: attr(),
  sort: attr(),
  win: attr(),
  try: attr(),
  finished: attr(),
  discipline_id: forgienKey( "Discipline", "discipline", "level" ),
})


const TournamentUnit = createModel( "Tournament_unit", {
  id: attr(),
  age: attr(),
  number: attr(),
  weight: attr(),
  tournament_id: forgienKey("Tournament", "tournament", "tournament_unit" ),
  current_unit_id: forgienKey( "Current_unit", "current_unit", "tournament_unit" ),
})

const TournamentUnitDiscipline = createModel( "Tournament_unit_discipline", {
  id: attr(),
  discipline_name: attr(),
  discipline_range: attr(),
  discipline_id: forgienKey("Discipline", "discipline","tournament_unit_discipline"),
  tournament_unit_id: forgienKey("Tournament_unit", "tournament_unit", "tournament_unit_discipline"),
  tournament_id: forgienKey( "Tournament", "tournament", "tournament_unit_discipline"),
  current_unit_id: forgienKey( "Current_unit", "current_unit", "tournament_unit_discipline" ),
})


////// под вопросом, для создания результатов /////////////////
// const Level_list = createModel( "Level_list", {
//   id: attr(),
//   list: attr(),
//   level_id: uniqueKey( "Level", "level", "level_list" ),
// })

// const Level_result = createModel( "Level_result", {
//   id: attr(),
//   rate: attr(),
//   winner: attr(),
//   level_id: uniqueKey( "Level", "level", "level_result" ),
//   level_list_id: uniqueKey( "Level_list", "level_list", "level_result" ),
//   tournament_unit_id: forgienKey( "Tournament_unit", "tournament_unit", "level_result" ),
// })


/////////////////////
////// под вопросом, для создания результатов /////////////////

// const Tournament_unit_result = createModel( "Tournament_unit_result", {
//   id: attr(),
//   try: attr(),
//   time: attr(),
//   point: attr(),
//   fail: attr(),
//   dq: attr(),
//   roundWinner: attr(),
//   level_id: forgienKey( "Level", "level", "tournament_unit_result" ),
//   level_list_id: forgienKey( "Level_list", "level_list", "tournament_unit_result" ),
//   tournament_unit_id: forgienKey( "Tournament_unit", "tournament_unit",  "tournament_unit_result" )
// })

///////////////////////////////

export const orm = new ORM({
  stateSelector: state => state
})

orm.register( Tournament, Discipline, Level, Current_unit, TournamentUnit, TournamentUnitDiscipline )