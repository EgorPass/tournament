import { usePlayLayoutContextConsumer } from "../../../features/layoutFeatures"
import { IPLayLayoutContext } from "../../../types"
import { MainHeader } from "../components/mainHeader"


export const DisciplinePlayHeaderWidget = () => {
  const { discipline, tournament } = usePlayLayoutContextConsumer() as IPLayLayoutContext
  return (
    <MainHeader
      secondTitle = { tournament!.name }
      firstTitle = { discipline!.name  }
    />
  )
  
}