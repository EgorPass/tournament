import { FC } from "react"
import { useSetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting"
import { IUnitDiscipineData } from "../../../types"
import { TournamentCard } from "../../../entities/tournament"
import { LinkButtonStyle } from "../../../shared/components/buttonsAndLinks"
import { LinksBlock, GroupLinks } from "../../../shared/components/groupComponents"
import { UnitDeclareItem } from "../components/unitDeclareItem"
import styled from "styled-components"

const DisciplineButton = styled.button`
  background-color: transparent;
  ${ LinkButtonStyle }
  cursor: pointer;
`

interface IProp {
  head: string, 
  unitTournamentsData: IUnitDiscipineData[], 
  setDisciplineInfo:React.Dispatch<React.SetStateAction<{
    tournamentName: string;
    disciplineName: string;
} | null>>
}

export const CurrentUnitPlayAndOverDisciplineListWidget: FC<IProp> = ({ unitTournamentsData, head, setDisciplineInfo  }) => {

  const { setPlayerModalReiting } = useSetPlayerModalReiting()

  return (
    <LinksBlock head = { `${ head }: `}>
      {
        unitTournamentsData.length > 0 ? 
          unitTournamentsData
          .map( it => {
            return (
              <UnitDeclareItem key = { it.tournament.id } >
                <TournamentCard { ...it.tournament} />
                <h5>На дисциплины:</h5>
                <GroupLinks>
                    {
                      it.discipline.map( disc => (
                        <DisciplineButton 
                          key = { disc.discipline.id }
                          onClick={ (e) => {
                            e.preventDefault() 
                            setPlayerModalReiting({ discipline_id: disc.discipline.id, player_id: disc.unit_id})
                            setDisciplineInfo( { tournamentName: it.tournament.name,
                              disciplineName: disc.discipline.name
                            })
                          }}
                        >{ disc.discipline.name } </DisciplineButton>
                      ))
                    }
                  </GroupLinks>
              </UnitDeclareItem>
            )
          })
          : (
          <UnitDeclareItem>
            Заявки отсутствуют
          </UnitDeclareItem>
        )
      }
    </LinksBlock>
  )
}