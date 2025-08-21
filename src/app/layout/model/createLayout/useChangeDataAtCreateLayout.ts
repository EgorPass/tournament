import { useLocationHooks } from "../../../../shared/hooks/useLocationHook"
import { useDBSetMethods } from "../../../../shared/store/offlineDB"
import { ITournamentUnitDiscipline } from "../../../../types"
import { setBackDataToMutation, useClearTournamentUnitDiscipline, useCreateTournamentUnit, useMutateButton, useRemoveTournamentUnitWithLuftList } from "../../../../features/addRemoveFeatures"


export const useChangeDataAtCreateLayout = () => {

  const createTournamentUnit = useCreateTournamentUnit()
  const removeTourUnitDiscipline = useClearTournamentUnitDiscipline()
  const removeTournamentUnit = useRemoveTournamentUnitWithLuftList()
  const { addToDB, changeAtDB } = useDBSetMethods()
  const { 
          pathname, fromPathname, fromId,
          locationState, currentNodeId,
          createDatafromData, createNewData, saveChangeData, 
        } = useLocationHooks()
  
  return useMutateButton({
    func: async (values: any ) => {
            
      if( saveChangeData ) {
        console.log( "СОХРАНЯЕМ ИЗМЕНЕНИЯ!!!!!!!!!" )

        if( pathname === "tournament_unit") {
          await removeTourUnitDiscipline( values.unit.id )
          
          if( values.list.length === 0 ) {
            await removeTournamentUnit( values.unit.id, values.unit.tournament_id )
            return setBackDataToMutation( "tournament", values.unit.tournament_id )
          }
          else {
            await changeAtDB( "tournament_unit_discipline", values.list )
            return setBackDataToMutation( pathname, currentNodeId )
          }
        }
        else {
          await changeAtDB( pathname, values )
          return setBackDataToMutation( pathname, currentNodeId )
        } 
      }
      // /////////////////////////////////////////////////////
      else if( createDatafromData ){
        console.log( "ЧТО ТО СОЗДАЁМ НА ОСНОВЕ :", locationState.from.pathname)
        
        if( fromPathname === "current_unit" && pathname === "tournament_unit") {
          const { list, tournament_id } = values 
          const tournamentUnit = await createTournamentUnit( tournament_id, fromId )

          if( !!tournamentUnit ) { 

            await removeTourUnitDiscipline( tournamentUnit.id )

            const disciplineList = ( list as ITournamentUnitDiscipline[])
            .filter(it => it.tournament_id === tournament_id )
            .map(it => ({
              ...it,
              tournament_unit_id: tournamentUnit.id
            }))

            if( !!tournamentUnit && !!tournament_id && disciplineList.length === 0 ){
              await removeTournamentUnit( tournamentUnit.id,tournament_id )
            }
            else if( !!tournamentUnit && !!tournament_id && disciplineList.length > 0 ){
              await changeAtDB( "tournament_unit_discipline", disciplineList )              
            }
          }
          return setBackDataToMutation("current_unit", fromId )
        }
        else {
          const fromId = {
            titleId: ( locationState.from.pathname + "_id" ),
            id: locationState.from.id
          }
          const data = { ...values, [fromId.titleId]: fromId.id }
          const newData = await addToDB( pathname, data ) 
          return setBackDataToMutation( pathname, newData[0].id )
        }
      }
      // ///////////////////////////////////////////////////////
      else if( createNewData ) {
        console.log( "СОЗДАЁМ ЧТО ТО НОВОЕ!!!!!!!! :")
        
        if( pathname === "tournament_unit") {
          console.log( "save:", values.list)
          console.log( "по идее не должно ни когда сработать")
        }
        else {
          const newData = await addToDB( pathname, values )
          return setBackDataToMutation( pathname, newData[0].id )
        }
      }

      return {
        state: null, replace: true, dirname: "/api/view/home"
      }
    }
  })
}