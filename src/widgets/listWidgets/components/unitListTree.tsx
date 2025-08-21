import { FC } from "react";
import { IUnit } from "../../../types";
import { useFilterUnitList } from "../../../features/searchFilterFeatures";
import { CurrentUnitCardInfo } from "../../../entities/unit";
import { LinkBox } from "../../../shared/components/buttonsAndLinks";

export const UnitsListTree:FC<{units: IUnit[]}> = ( {units }) => {
  units = useFilterUnitList( units )
  return (
    <>
      {
        units.length > 0 ? (
          units.map( it => (
            <LinkBox
              key = { it.id }
              to = "/api/view/current_unit"
              state = {{
                from: {
                  id: it.id,
                  pathname: "current_unit"
                }
              }}
            >
              <CurrentUnitCardInfo { ...it } />
            </LinkBox>
        ))
        ) : (
          <p>Нет ни одного спортсмена в базе</p>
        )
      }
    </>
  )
}