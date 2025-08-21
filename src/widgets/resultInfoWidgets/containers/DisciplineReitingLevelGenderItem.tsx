import { FC } from "react";
import { DisciplineReitingPlayerData } from "../components/DisciplineReitingPlayerData";
import {  ILevel,  } from "../../../types";
import { useSetPlayerModalData } from "../../../shared/store/redux/slices/playerModalData";
import { TReitingCategoryList } from "../lib/types";
import { CategoryItemGroup, CategoryWrapper, GenderGround, GenderWrapper } from "../components/wrapperComponents";
import { CategoryHeader, GenderHeader } from "../components/reitingHeaders";

const translate: {[key:string]: string } = {
  "boy": "Мужской пол",
  "girl": "Женский пол"
}


interface IProp {
  gender: "" | "boy" | "girl",
  list: TReitingCategoryList[]
  level : ILevel
}

export const DisciplineReitingLevelGenderItem: FC<IProp> = ({ gender, list = [], level  }) => {
  const { setPlayerModalData } = useSetPlayerModalData()
  return (
    <GenderWrapper>
      <GenderHeader>{ translate[ gender ] }</GenderHeader>
      <GenderGround>
        {
          list.map( ( [ category, items ] )  => (
            <CategoryWrapper key = { `${ category }` }>
                <CategoryHeader title = { category } />
                  {
                    items.map( ( item, index) => (
                      <CategoryItemGroup
                        key = { `${category}-item-group-${index}`}
                        $status = { !!level ? level.status === "play": false }
                        onClick={ () => {
                          if( level!.status === "play" ){
                            const playersId = item.playersData.map( it => it.id ) 
                            setPlayerModalData({ category, gender, playersId, position: item.position })
                          }

                        }}  
                      >
                        {
                          item.playersData.map( ( playerData, index ) => (
                            <DisciplineReitingPlayerData
                              key = {`current-player-${ playerData.id}`}
                              { ...playerData }
                            />
                          ))
                        }
                      </CategoryItemGroup>
                    ) )
                  }
            </CategoryWrapper>
          ))
        }
      </GenderGround>
    </GenderWrapper>
  )
  // return null
}