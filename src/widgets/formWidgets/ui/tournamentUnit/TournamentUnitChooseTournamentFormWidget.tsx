import { OptionItem } from "../../../../shared/components/inputFields/optionItem";
import { suspenseHOCWrapper } from "../../../../shared/HOCs";
import { useGetSuspenseStateStore } from "../../../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateStore";
import { ITournament } from "../../../../types";
import { FormRowAtSelect } from "../../components/generic/formRow/formRowAtSelect";

export const TournamentUnitChooseTournamentFormWidget = suspenseHOCWrapper(
  () => {
    const { data: tournaments } = useGetSuspenseStateStore<ITournament>("tournament")
    return (
      <FormRowAtSelect name = "tournament_id" title = "Cоревнования:" >
        {   
          tournaments
          .filter(it=> it.status === "prepare" )
          .map( ( it) => (
            <OptionItem
              key = { it.id }
              value = { it.id }
              title = { it.name }
            />
          ))
        }
      </FormRowAtSelect>
    )
  }
)