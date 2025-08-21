import { ILevelList } from "../../../../types";
import { findEmptyPosition } from "./findEmptyPosition";

export const setNextPositionAtLevelList = (levelList:  ILevelList ) => {

  const { currentPosition, finishedPosition } = levelList      

  let newPosition = +currentPosition + 1 

  newPosition = findEmptyPosition( finishedPosition, newPosition, levelList.list.length ) as number
  
  newPosition = newPosition > 0 ? newPosition : 1
  // console.log( "new position ", newPosition )
  
  
  return { ...levelList, currentPosition: newPosition } satisfies ILevelList

}