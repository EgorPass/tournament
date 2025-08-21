import { FC } from "react";
import { LayoutButton } from "../../../../shared/components/buttonsAndLinks";
import { useSaveButton } from "../../model/buttons/useSaveButton";

export const SaveButtonFeature: FC<{title: string}> = ({ title }) => {
  const { disabled, submit } = useSaveButton()
  return (
    <LayoutButton
      $actionType = "save"
      $callback = { submit }
      $disabled = { disabled }
    >
      { title }
    </LayoutButton>
  )
}