import { FC } from "react";
import { IUnit } from "../../../../types";
import { CurrentUnitCardInfo } from "../../../../entities/unit";
import { BorderForListItem } from "./BorderForListItem";
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem";

interface IUnitListForExport {
  data: IUnit[],
  check_list: IUnit[]
}
export const UnitList: FC<IUnitListForExport> = ({data, check_list}) => (
  <>
    {
      data.map( it => (
        <BorderForListItem 
          key = { it.id }
          $check = { check_list.includes( it )}
        >
          <Checkbox
            key = { it.id }
            name = "current_unit_list"
            value = { it }
            >
            <CurrentUnitCardInfo { ...it } />
          </Checkbox>
        </BorderForListItem>
      ))
    }
  </>
)