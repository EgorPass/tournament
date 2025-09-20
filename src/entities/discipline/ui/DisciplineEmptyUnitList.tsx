import { FC } from "react"
import { IDiscipline, ILevel, ITournament } from "../../../types"
import { useDBGetMethods } from "../../../shared/store/offlineDB"
import { useSuspenseQuery } from "@tanstack/react-query"
import { GroupContentWrapper } from "../../../shared/components/groupComponents"


export const DisciplineEmptyUnitList: FC<{ level: ILevel }> = ({ level }) => {


  //нужно по другому выбирать информацию о дисциплине и соревновании на основе которой это всё проходит 
  console.log( level )
  const { getItemFromDB } = useDBGetMethods()

  const { data, isSuccess } = useSuspenseQuery({
    queryKey: [ "discipline", { "id": level.fromResult.discipline }],
    queryFn: async( ) => {
      
      let tournament: ITournament | undefined

      const discipline = await getItemFromDB<IDiscipline>("discipline", "id", level.fromResult.discipline )

      if( !!discipline ) {  
        tournament = await getItemFromDB<ITournament>("tournament", "id", discipline.tournament_id )
      }

      console.log( discipline, tournament )


      return { discipline, tournament }
    }
  })


  console.log( data )

  if( isSuccess ) {

    return (
      <GroupContentWrapper>
        <div>
          участники будут выбраны на основе результатов дисциплины { !!data.discipline && data.discipline.name } проходящей в соревнованиях { !!data.tournament && data.tournament.name }
        </div>

      </GroupContentWrapper>
    )
  }
  else return null

}
