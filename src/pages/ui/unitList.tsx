import { UnitSearchFilterFeature } from "../../features/searchFilterFeatures"
import { UnitsHeaderWidget } from "../../widgets/headerWidgets"
import { UnitsPageListwWidget } from "../../widgets/listWidgets"

const UnitList = () => {
  // console.log( " render unit list page")
  return (
    <>
      <UnitsHeaderWidget />
      <UnitSearchFilterFeature />
      <UnitsPageListwWidget />  
    </>
  ) 
}

export default UnitList