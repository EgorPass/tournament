import { UnitInfoBlock } from "../../../entities/unit";
import { useCurrentUnitTournamentDeclare } from "../../model/Unit/useCurrentUnitTournamentDeclare";
import { ScrollContainerWrapper } from "../../../shared/components/groupComponents";
import { suspenseHOCWrapper } from "../../../shared/HOCs";
import { CurrentUnitHeaderWidget } from "../../../widgets/headerWidgets";
import { useGetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";
import { CurrentUnitPlayAndOverDisciplineListWidget } from "../../../widgets/listWidgets";
import { PlayerModalReitingContainer } from "../../../widgets/resultInfoWidgets";
import { FC, useEffect, useState } from "react";


interface IProp {
discipline_id: string, 
player_id: string, 
disciplineName: string, 
tournamentName: string,
setDisciplineInfo:React.Dispatch<React.SetStateAction<{
    tournamentName: string;
    disciplineName: string;
} | null>>
}

const DisciplinInfo: FC<IProp> = ({ disciplineName, discipline_id, tournamentName, player_id, setDisciplineInfo  }) => {

  useEffect( () => {
    return () => { setDisciplineInfo( null ) }
  }) 
  return (
    <>
      <h4>{ tournamentName } - { disciplineName }</h4>
      <PlayerModalReitingContainer 
        discipline_id = { discipline_id} 
        player_id = { player_id }
      />
    </>
  )
}

const CurrentUnit = suspenseHOCWrapper(
  () => {
    // console.log( "current unit page ")
    const { unit, data, isSuccess  } = useCurrentUnitTournamentDeclare()
    const playerModalReiting = useGetPlayerModalReiting()
    const [ disciplineInfo, setDisciplineInfo ] = useState<{ tournamentName: string, disciplineName: string } | null>( null )

    if( isSuccess )
    return (
      <>
        <CurrentUnitHeaderWidget />
        <ScrollContainerWrapper>
          <UnitInfoBlock unit = { unit! } type = "current_unit"/>
          {
            playerModalReiting.status && disciplineInfo ? (
              <DisciplinInfo 
                { ...disciplineInfo! } 
                { ...playerModalReiting! } 
                setDisciplineInfo = { setDisciplineInfo }
              />
            ) : (
              <>
                <CurrentUnitPlayAndOverDisciplineListWidget
                  head = "Заявки на участие"
                  unitTournamentsData = { data.prepare }
                  setDisciplineInfo = { setDisciplineInfo }
                />

                <CurrentUnitPlayAndOverDisciplineListWidget
                  head = "Участник в соревнованиях"
                  unitTournamentsData = { data.play }
                  setDisciplineInfo = { setDisciplineInfo }
                />
                <CurrentUnitPlayAndOverDisciplineListWidget 
                  head = "Законченные соревнования"
                  unitTournamentsData = { data.gameOver }
                  setDisciplineInfo = { setDisciplineInfo }
                />
              </>
            )
          }

        </ScrollContainerWrapper> 
      </>
    ) 
    return null
  }
)
export default CurrentUnit