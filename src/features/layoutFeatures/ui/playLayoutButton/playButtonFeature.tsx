import { FC, MouseEvent } from "react";
import { LayoutButton } from "../../../../shared/components/buttonsAndLinks";
import { useClickPlayButton } from "../../model/buttons/useClickPlayButton";

interface IProp {
  title: string,
  action: string,
  disabled: boolean, 
  layoutPlace: string
}

export const PlayButtonFeature: FC<IProp> = ({disabled, action, layoutPlace,  title  }) => {
  const click = useClickPlayButton() 
  return (
    <LayoutButton
      $actionType = { layoutPlace }
      $callback = { ( e: MouseEvent<HTMLButtonElement> ) => {  
        e.preventDefault()
        click( action ) 
      } }
      $disabled = { disabled }
    >
      { title }
    </LayoutButton>
  )
}