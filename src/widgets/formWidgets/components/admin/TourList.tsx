import { FC } from "react";
import { ITournament } from "../../../../types";
import { TournamentCard } from "../../../../entities/tournament";
import { BorderForListItem } from "./BorderForListItem";
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem";
import { GroupContentForCardItem } from "./GroupContentForCardItem";

interface ITourListForExport {
    data: ITournament[],
    check_list: ITournament[]
}
export const TourList: FC<ITourListForExport> = ({data, check_list}) => (
  <GroupContentForCardItem>
    {
      data.map( it => (
        <BorderForListItem 
          key = { it.id }
          $check = { check_list.includes( it ) }
        >
          <Checkbox
            key = { it.id }
            name = "tournaments_list"
            value = { it }
          >
            <TournamentCard {...it} />
          </Checkbox>
        </BorderForListItem>
      ))
    }
  </GroupContentForCardItem>
)