import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDBSetMethods } from "../../../../shared/store/offlineDB"
import { apiForCreateData } from "../../../../shared/lib/api/apiForCreateData"
import { useCreateTournamentUnit } from "../useCreateTournamentUnit"

interface IProps {
  tournament_id: string, 
  discipline_id: string
  current_unit_id: string
}

export const useAddUnitButton = () => {

  const queryClient = useQueryClient()
  const { changeAtDB } = useDBSetMethods()
  const createTournamentUnit = useCreateTournamentUnit()

  const mutate = useMutation({
    mutationFn: async ( props: IProps ) => {
      const { current_unit_id, tournament_id, discipline_id } = props
      const tournamentUnit = await createTournamentUnit( tournament_id, current_unit_id )
      
      const tournamentUnitDiscipline = apiForCreateData.createTournamentUnitDiscipline({
        discipline_id, tournament_id, current_unit_id, tournament_unit_id: tournamentUnit!.id
      })
      await changeAtDB("tournament_unit_discipline", tournamentUnitDiscipline )
      
      return {
        tournamentUnitDiscipline
      }
    },
    async onSettled(data, error, variables, context) {
      if( error ) {
        console.log( error )
      }
      await queryClient.invalidateQueries() 
      // await queryClient.refetchQueries()
    },
  })

  return mutate
}