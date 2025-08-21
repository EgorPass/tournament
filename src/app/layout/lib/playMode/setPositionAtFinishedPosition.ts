import { ILevelList } from "../../../../types";

export const setPositionAtFinishedPosition = ( levelList: ILevelList ) => {
  const { currentPosition, finishedPosition } = levelList
  finishedPosition.push( currentPosition )
  levelList = {
    ...levelList,
    finishedPosition: Array.from( new Set( [...finishedPosition] ))
  }
  return levelList
}