import { FC } from "react"
import { LayoutButton } from "../../../../shared/components/buttonsAndLinks"
import { useNextLevelButton } from "../../model/buttons/useNextLevelButton"

export const NextLevelButtonFeature: FC<{layoutPlace: string}> = ({layoutPlace}) => {
  const mutate = useNextLevelButton()
  return (
    <LayoutButton
      $actionType = { layoutPlace }
      $callback = { () => { mutate.mutate() } }
      $disabled = { false }
    >
      Сл. этап
    </LayoutButton>
  )
}