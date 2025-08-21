import { useLayoutEffect } from "react"
import {  IDiscipline, ILevel, TCategoryFabric } from "../../types"
import { useCreateLevelList } from "../model/useCreateLevelList"
import { useLocationHooks } from "../../shared/hooks/useLocationHook"
import { useDBGetMethods } from "../../shared/store/offlineDB"
import { useGetListItmeFromFirstLevel } from "../model/useGetListItmeFromFirstLevel"
import { useGetListItmeFromPastLevel } from "../model/useGetListItmeFromPastLevel"
import { useGetListItemFromDiscipline } from "../model/useGetListItemFromDiscipline"

let render = 1
const PlayDisciplinePrepareLevelFeature =  () => {
  console.log( "prepare level page render ---- ", render++)
  const { currentNodeId } = useLocationHooks()
  const createLevelList = useCreateLevelList()
  const { getItemFromDB, getItemsFromDB} = useDBGetMethods()
  const getListItemFromPastLevel = useGetListItmeFromPastLevel()
  const getListItemFromFirstLevel = useGetListItmeFromFirstLevel()
  const getListItemFromDiscipline = useGetListItemFromDiscipline()
  
  useLayoutEffect( () => {
    let menPlayers: TCategoryFabric[] = [];
    let womenPlayers: TCategoryFabric[]  = [];
    let state: "accept" | "error" = "error";

    ;( async() => {

      const discipline = await getItemFromDB<IDiscipline>("discipline", "id", currentNodeId )
      const levels = await getItemsFromDB<ILevel>("level", "discipline_id", currentNodeId )

      const finishedLevels = levels.filter( it => it.status === "gameOver" )
      const gameIsEnd = levels.length === finishedLevels.length || ( discipline && discipline.status === "gameOver" )
      const isPlayLevel = !!levels.find(it => it.status === "play" )
      const currentLevel = levels
                      .sort( (x, y) => +x.levelPosition - +y.levelPosition )
                      .find( it => {
                        // return isPlayLevel ? false : it.status === "prepare" 
                        return it.status === "prepare"
                      })
      
      let createLevel = "";
      let fromDiscipline = ""
      if( !gameIsEnd && !!currentLevel ) {
        ( { createLevel, fromResult: { discipline: fromDiscipline } } = currentLevel )
      }
      
      if( !isPlayLevel && !gameIsEnd && discipline && currentLevel && (  createLevel === "fromPastLevel" || createLevel === "fromLevelResult")   ) {
        console.log( "prepare level from past ");
        ( { menPlayers, womenPlayers, state } = await getListItemFromPastLevel( currentLevel, levels,  discipline! ) )

      }
      if( !isPlayLevel && !gameIsEnd && discipline && currentLevel && (  createLevel === "new" ) ) {
        console.log( "prepare level from first item " );
        ( { menPlayers, womenPlayers, state } = await getListItemFromFirstLevel(currentLevel ) )
      }

      if(  !isPlayLevel && !gameIsEnd && discipline && currentLevel && (  createLevel === "fromDisciplineResult" ) && !!fromDiscipline ) {
        ;( { menPlayers, womenPlayers, state } = await getListItemFromDiscipline( currentLevel ) )
      }

      if( !isPlayLevel && !gameIsEnd && discipline && currentLevel ) {


        createLevelList.mutate( { level: currentLevel, discipline: discipline, menPlayers: menPlayers, womenPlayers: womenPlayers, state } )

      }
      if( gameIsEnd ) {
        // делаем навигацию на страницу с результатами
      }
      

    })();

  } , [] ) 

  return (
    <> 
      prepare level!!!
    </>
  )
}
// )

export default PlayDisciplinePrepareLevelFeature