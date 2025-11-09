import { FC } from "react";
import { LinksBlock } from "../../../shared/components/groupComponents";
import { IDiscipline } from "../../../types";
import { TournamentUnitLinkBox } from "../components/TournamentUnitLinkBox";
import { useDisciplineLevelList } from "../model/useDisciplineLevelList";
import { useGetDisciplineUnitList } from "../model/useGetDisciplineUnitList";
import { DisciplineEmptyUnitList } from "../../../entities/discipline";


const DisiplineUnitsList: FC<{discipline: IDiscipline }> = ({ discipline }) => {
  
  const { units } = useGetDisciplineUnitList( discipline )
  return (
    <LinksBlock head = "Участники">
      {
        units.map( ( it ) => (
          <TournamentUnitLinkBox key = { it.id } { ...it } />
        ))
      }
    </LinksBlock>

  )
}

export const DisciplineUnitListWidget: FC<{discipline: IDiscipline }> = ( { discipline } ) => {
  const { levels } = useDisciplineLevelList();
  const firstLevel = levels.sort( (x, y ) => +x.levelPosition - +x.levelPosition )[0]
  if( !!firstLevel ){
    return (
      <>
        {
          firstLevel.createLevel === "fromDisciplineResult" ? (
            <DisciplineEmptyUnitList level = { firstLevel }/>
          ) : (
            <DisiplineUnitsList discipline = { discipline }/>
          )
        }
    </>
    )
  }
  else return null
}

