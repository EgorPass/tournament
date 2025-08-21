
export const initialStructureForDB =  [
  {
    name: "current_unit", 
    index: [ 
            "id", 
            "firstName", 
            "secondName", 
            "lastName", 
            "birthday", 
            "gender", 
            "weight",
            "borncity"
          ]
  },
  {
    name: "tournament",
    index: [ 
              "id", 
              "name", 
              "date", 
              "family", 
              "address",
              "organizer",
              "status" // prepare | play | gameOver
            ]
  },
  {
    name: "discipline",
    index: [ 
              "id", 
              "name", 
              "condition", 
              "categories", 
              "menCategories",
              "womenCategories",
              "dqs",
              "status", // prepare | play | gameOver
              "tournament_id", 
            ]
  },
  {
    name: "level",
    index: [
              "id", 
              "name",
              "status", // prepare | play | gameOver
              "discipline_id",
              "tournament_id",
              "levelPosition",
              "createLevel",
              "fromResult",
              "categories",
              "units", 
              "sort", 
              "win", 
              "try",
    ]
  },
  {
    name: "tournament_unit",
    index: [
              "id",
              "age",
              "weight",
              "number",
              "current_unit_id",
              "tournament_id",
            ]
  },
  {
    name: "tournament_unit_discipline", 
    index: [
            "id",
            "discipline_id",
            "tournament_id",
            "tournament_unit_id",
            "current_unit_id",
          ]
  },
  
  {
    name: "tournament_player",
    index: [
      "id",
      "current_unit_id",
      "tournament_unit_id",
      "tournament_id",
      "discipline_id",
      "number", "gender",
      "name", "age", "weight",
      "dqs",
      // "reiting",
      "status",
      "levelStatus",
      "levelReiting",
    ]
  },
  {
    name: "level_list",
    index: [
      "id",
      "level_id",
      "tournament_id",
      "discipline_id",
      "try",
      "currentPosition",
      "finishedPosition",
      "list"
    ]
  },
  {
    name: "level_reiting_list",
    index: [
      "id",
      "boy",
      "girl",
      "level_id",
      "tournament_id",
      "discipline_id",
    ]
  },
  {
    name: "level_result",
    index: [
      "id",
      "level_id",
      "tournament_id",
      "discipline_id",
      "tournament_player_id",
      "try",
      "fuckup",
      "result",
      "status"
    ]
  },
  {
    name: "tournament_player_dq",
    index: [
      "id",
      "level_id",
      "tournament_id",
      "discipline_id",
      "tournament_player_id",
      "try",
      "dq",
    ]
  }

]
