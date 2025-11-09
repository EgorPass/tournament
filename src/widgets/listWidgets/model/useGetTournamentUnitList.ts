import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import {  ITournamentUnit, ITournamentUnitData, IUnit } from "../../../types"
import { useGetSuspenseStateStore } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore"

export const useGetTournamentUnitList = () => {
	const { currentNodeId } = useLocationHooks()
	const { data: current_units } = useGetSuspenseStateStore<IUnit>("current_unit")
	const { data: tournamentUnits } = useGetSuspenseStateList<ITournamentUnit>( "tournament_unit", "tournament_id", currentNodeId! )
	const idList = tournamentUnits.map( it => it.current_unit_id )
	const currentUnits = current_units.filter( it => idList.includes( it.id ) )

	const units: ITournamentUnitData[] = []
		currentUnits.forEach( unit => {
			// const { data } = it
			tournamentUnits?.forEach( it => {
				const { current_unit_id } = it
				if( current_unit_id === unit.id ) {
					units.push( {
						id: it.id,
						unit,
						tournamentUnit: it,
					})
				}
			})
		})

	return units
}