export const pageActions: {[key: string]: any } = {
  
  tournament: [ 
    {
      type: "start-tournament",
      to: "api/*",
      title: "Старт соревнования",
    },
    {
      to: "api/create/discipline",
      title: "Добавить дисциплину",
    },
    // возможно на хуй, так как есть кнопка ИЗМЕНИТЬ
    {
      to: "api/create/tournament",
      title: "Изменить соревнование",
    },
    {
      type: "remove-tournament",
      to: "api/*",
      title: "Удалить соревнование",
    },
  ],
  tournament_unit: [
    {
      to: "api/create/tournament_unit",
      title: "Изменить участника"
    },
    {
      type: "remove-tournament_unit", //
      to: "api/*",
      title: "Удалить участника"
    }
  ],

  tournaments: [
    {
      to: "api/create/current_unit",
      title: "Создать спортсмена",
    },
    {
      to: "api/create/tournament",
      title: "Создать соревнование"
    }
  ],
  
  unit_list: [
    {
      to: "api/create/current_unit",
      title: "Создать спортсмена",
    },
    {
      to: "api/create/tournament",
      title: "Создать соревнование"
    }
  ],
  
  discipline: [
    {
      to: "api/add/tournament_unit",
      title: "Добавить участника дисциплины",
    },
    {
      to: "api/create/level",
      title: "Добавить этап дисциплины",
    },
    {
      to: "api/create/discipline",
      title: "Изменить дисциплину",
    },
    {
      type: "remove-discipline",
      to: "api/*",
      title: "Удалить дисциплину",
    },
  ],
  level: [
    {
      to: "api/create/level",
      title: "Изменить этап",
    },
    {
      type: "remove-level",
      to: "api/*",
      title: "Удалить этап",
    },
  ],
  current_unit: [
    {
      to: "api/create/tournament_unit",
      title: "Добавить в соревнования",
    },
    {
      to: "api/create/current_unit",
      title: "Изменить спортсмена",
    },
    {
      type: "remove-current_unit", //
      to: "api/*",
      title: "Удалить спортсмена",
    },
  ]

}
