import { useLocationHooks } from "../../../shared/hooks/useLocationHook"
import { useGetSuspenseStateList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { useGetSuspenseStateItemsFromList } from "../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateItemsFromList"
import {  ITournamentUnit, ITournamentUnitData, IUnit } from "../../../types"

export const useGetTournamentUnitList = () => {
	const { currentNodeId } = useLocationHooks()
	const { data: tournamentUnits } = useGetSuspenseStateList<ITournamentUnit>( "tournament_unit", "tournament_id", currentNodeId! )
	const currentUnits = useGetSuspenseStateItemsFromList<ITournamentUnit, IUnit>( tournamentUnits, "current_unit", "id", "current_unit_id" )

	const units: ITournamentUnitData[] = []
	currentUnits.forEach( it => {
		const { data } = it
		tournamentUnits?.forEach( it => {
			const { current_unit_id } = it
			if( current_unit_id === data?.id ) {
				units.push( {
					id: it.id,
					unit: data,
					tournamentUnit: it,
				})
			}
		})
	})
	return { units }
}