import { FC } from "react";
import { ExcludeTypePlayerReiting, TCategoryFabric } from "../../../types";
import { CategoryHeader } from "../components/reitingHeaders";
import { CategoryWrapper, CategoryItemGroup, Title } from "../components/wrapperComponents";
import { useSetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";
import { GenderWrapperComponent } from "../components/GenderWrapper";

interface IProp {
  data: TCategoryFabric[]
  gender: string
  discipline_id: string
}

const PlayerReitnig: FC<{player:ExcludeTypePlayerReiting}> = ({player}) => {
  const isDq = player.levelStatus.startsWith("DQ")
  const isNull = player.levelReiting === null || player.levelReiting === 0
  return (
    <div style = {{textAlign: "center", paddingBottom: "5px"}}>
      место в рейтинге:&nbsp;
      {
        isNull && isDq 
          ? player.levelStatus 
          : ( isDq && !isNull ) 
            ? `${ player.levelReiting } - ${ player.levelStatus }`
            : ( !!player.levelReiting && player.levelReiting )
      }
    </div>
  )
}

export const DisciplineReitingTreeGender:FC<IProp> = ( { data, gender, discipline_id } ) => {
  const { setPlayerModalReiting } = useSetPlayerModalReiting()
  return (
    <GenderWrapperComponent gender= { gender }>
       {
          data.map( ({category, players}) => (
            <CategoryWrapper key = { `womenPlayers-${ category }` }>
              <CategoryHeader title = { category } />
              {
                players.map( player => (
                  <CategoryItemGroup 
                    key = { player.id } $status = { true }
                    $isSingle = { true  }
                    onClick = { () => {
                      setPlayerModalReiting( { player_id: player.id , discipline_id: discipline_id })
                    }}  
                  >
                      <Title>
                        <PlayerReitnig player = { player } />
                        <span>
                          №{player.number} { player.name }
                        </span>
                      </Title>
                  </CategoryItemGroup>
                ) )
              }

            </CategoryWrapper>
          ))
        }
    </GenderWrapperComponent>
  )
}