export const sort = [
  {
    name: "sort.type",
    title: "Одиночный",
    value: "timeTrial" ,
  },
  {
    name: "sort.type",
    title: "группами",
    value: "group",
  },
]

export const sortVersusSingleFromResult = [
  {
    name: "sort.versus",
    value: "fromBad",
    title: "от худшего к лучшему результату",
  } ,
  {
    name: "sort.versus",
    value: "fromBest",
    title: "от лучшего к худшему результату",
  } 
]

export const sortVersusSingleFromNew = [
  {
    name: "sort.versus",
    value: "fromFirst",
    title: "от первого к последнему номеру",
  }, 
  {
    name: "sort.versus",
    value: "fromLast",
    title: "от последнего к первому номеру",
  }, 
]

export const sortVersusGroupFromResult = [
  {
    name: "sort.versus",
    value: "equals",
    title: "по уровню",
  },
  {
    name: "sort.versus",
    value: "bestVsBad",
    title: "лучший с худшим",
  },
]

export const exludeVersusTypeForNew = [
  "bestVsBad", "equals", "fromBad", "fromBest"
]
export const exludeVersusTypeForNotNew = [
  "fromFirst", "fromLast"
]

export const excludeVersusTypeForTimeTrial = [
"bestVsBad", "equals"
]
export const excludeVersusTypeForGroup = [
"fromBest", "fromBad"
]