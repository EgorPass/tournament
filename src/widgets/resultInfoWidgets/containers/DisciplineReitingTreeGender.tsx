import { FC } from "react";
import { TCategoryFabric } from "../../../types";
import { CategoryHeader, GenderHeader } from "../components/reitingHeaders";
import { CategoryWrapper, CategoryItemGroup, PlayerGround, Title, GenderWrapper, GenderGround } from "../components/wrapperComponents";
import { useSetPlayerModalReiting } from "../../../shared/store/redux/slices/playerModalReiting";

interface IProp {
  data: TCategoryFabric[]
  gender: string
  discipline_id: string
}

export const DisciplineReitingTreeGender:FC<IProp> = ( { data, gender, discipline_id } ) => {
  
  const { setPlayerModalReiting } = useSetPlayerModalReiting()

  return (
    <GenderWrapper>
      <GenderHeader>{ gender }</GenderHeader>
      <GenderGround>
        {
          data.map( ({category, players}) => (
            <CategoryWrapper key = { `womenPlayers-${ category }` }>
              <CategoryHeader title = { category } />
              {
                players.map( player => (
                  <CategoryItemGroup 
                    key = { player.id } $status = { true }
                    onClick = { () => {
                      setPlayerModalReiting( { player_id: player.id , discipline_id: discipline_id })
                    }}  
                  >
                    <PlayerGround>
                      <Title>
                        { player.name }
                        {
                          ( player.levelReiting !== null && player.levelReiting !== 0 ) && ` - ${ player.levelReiting }`
                        } 
                      </Title>
                    </PlayerGround>
                  </CategoryItemGroup>
                ) )
              }

            </CategoryWrapper>
          ))
        }
      </GenderGround>
    </GenderWrapper>
  )
}