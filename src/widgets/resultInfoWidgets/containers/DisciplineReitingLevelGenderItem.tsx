import { FC, Fragment } from "react";
import { DisciplineReitingPlayerData } from "../components/DisciplineReitingPlayerData";
import {  ILevel,  } from "../../../types";
import { useSetPlayerModalData } from "../../../shared/store/redux/slices/playerModalData";
import { TReitingCategoryList } from "../lib/types";
import { CategoryItemGroup, CategoryWrapper, PlayerGround } from "../components/wrapperComponents";
import { CategoryHeader } from "../components/reitingHeaders";
import { GenderWrapperComponent } from "../components/GenderWrapper";


interface IProp {
  gender: "" | "boy" | "girl",
  list: TReitingCategoryList[]
  level : ILevel
}

export const DisciplineReitingLevelGenderItem: FC<IProp> = ({ gender, list = [], level  }) => {
  const { setPlayerModalData } = useSetPlayerModalData()
  return (
    <GenderWrapperComponent gender = { gender }>
      {
          list.map( ( [ category, items ] )  => (
            <CategoryWrapper key = { `${ category }` }>
                {
                  items.length > 0 && <CategoryHeader title = { category } />
                }
                  {
                    items.map( ( item, index) => (
                      <CategoryItemGroup
                        key = { `${category}-item-group-${index}`}
                        $status = { !!level ? level.status === "play": false }
                        $isSingle = { item.playersData.length === 1 }
                        onClick={ () => {
                          if( level!.status === "play" ){
                            const playersId = item.playersData.map( it => it.id ) 
                            setPlayerModalData({ category, gender, playersId, position: item.position })
                          }

                        }}  
                      >
                        {
                          item.playersData.map( ( playerData, index ) => (
                            <Fragment 
                              key = {`current-player-${ playerData.id}`}
                            >
                              {
                                item.playersData.length > 1 ? ( 
                                  <PlayerGround>
                                    <DisciplineReitingPlayerData
                                      { ...playerData }
                                    />
                                  </PlayerGround>

                                ) : (
                                  <DisciplineReitingPlayerData
                                    { ...playerData }
                                  />
                                )
                              }
                            </Fragment>
                          ))
                        }
                      </CategoryItemGroup>
                    ) )
                  }
            </CategoryWrapper>
          ))
        }
    </GenderWrapperComponent>
  )
}