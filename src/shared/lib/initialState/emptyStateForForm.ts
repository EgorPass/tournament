export const emptyStateForForm = {
  data: {
    tournament: {
      id: "",
      name: "",
      date: "",
      family: "",
      organizer: "",
      address: {
        city: "",
        street: "",
        structure: "",
        build: "",
        place: "",
      },
      status: "prepare",
    },
  
    discipline: {
      id: "",
      name: "",
      condition: "time",
      categories: "age",
      menCategories: [
        {from: "", to: ""},
      ],
      womenCategories: [
        {from: "", to:""}
      ],
      dqs: [
        {
          type: "",
          qual: '', // количестов для дискавалификации
          name: "", 
          description: "",
          reiting: [],
        },
      ],
      status: "prepare",
      tournament_id: ""
    },
  
    level: {
      id: "",
      status: "prepare",
      name: "",
      discipline_id: "",
      tournament_id: '',
      levelPosition: "",
      createLevel: "", // new, fromLevelResult, fromDisciplineResult, fromPastLevel
      fromResult: {
        tournament: "",
        discipline: "",
        level: "",
      },
      categories: {
        check: "not-use", // not-use use
        mensList: [], // массив строк
        womensList: [], // массив строк
      },
      units: {
        condition: "all", // all qual
        qual: "2", // колличество участников для этапа
        from: "" // bestUnits badUnits
      },
      sort: {
        type: "timeTrial", // timeTrial group
        qual: "", // по сколько ставить участников
        versus: "", // fromFirst fromLast -- fromBest fromBad bestVsBad equals
      },
      win: {
        condition: "bestTry", // bestTry argTry roundWinner
        qual: "", // количество побед над соперником
        roundWinner: "" // bestTry argTry qualWin
      },
      try: "circle" // circle, oneToOne
    },
  
    current_unit: {
      id: "",
      firstName: "",
      secondName: "",
      lastName: "",
      gender: "",
      birthday: "",
      borncity: "",
      weight: "",
    },

    tournament_unit: {
      list: [],
      unit: {
        id: "",
        age: "",
        number: "",
        weight: "",
        current_unit: "",
        tournament_id: "",
      }
    },

    tournament_unit_discipline: {
      "id": "",
      "discipline_id": "",
      "tournament_id": "",
      "tournament_unit_id": "",
      "current_unit_id": "",
    },

    
    // data for playing

    tournament_player: {
      "id": "",
      "reiting": "", // position | DQ-[type]
      "status": "play", // play | gameOver | DQ-[type]
      "age": "", 
      "gender": "",
      "number": "", 
      "weight": "",
      "name": "", 
      "current_unit_id": "",
      "tournament_unit_id": "",
      "tournament_id": "",
      "discipline_id": "",
    },

    level_list: {
      id: "",
      level_id: "",
      discipline_id: "",
      tournament_id: "",
      currentPosition: 1,
      finishedPosition: [],
      list: [ ], // массив объектов 
    },

    tournament_dqs: {
      id: "",
      level_id: "",
      tournament_id: "",
      discipline_id: "",
      tournament_player_id: "",
      level_try: "",
      dq: ""
    },

    level_result: {
      "id": "",
      "level_id": "",
      "dicipline_id": "",
      "tournament_id": "",
      "tournament_player_id": "",
      "try": "",
      "fuckup":  [],
      result: "",
      status: "dns", // "dns" | "timeTrial" | "winner | looser" | DQ
    },



    // export dataItems
    exportDataItems: {
      typeForExport: [],
      
      selectUnits: "all",
      selectTours: "all",
      chooseUnits: "all",
      chooseTours: "all",
      tournamentUnits: [ ],
      // tournamentUnits: [ "tournamentUnits" ],
      current_unit_list: [],
      tournaments_list: [],
      update: "false",
      fileName: "",
      importData: {
        current_unit: [],
        tournament_unit: [],
        tournament_unit_discipline: [],
        tournament: [],
        discipline: [],
        level: [],
        // tournament_player
    // level_result
    // level_list
      }
    }

  },
  getState( pathname: string ) {
    return ( this.data as { [key: string]: any } )[ pathname ]
  }
  }
