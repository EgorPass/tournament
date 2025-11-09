import { RedirectToPlayPageFeature } from "../containers/RedirectToPlayPageFeature"
import { useDisciplineData } from "../model/useDisciplineData"
import { useGetSuspenseStateList } from "../../shared/hooks/state/useGetDBState/getStateWithSuspense/useGetSuspenseStateList"
import { suspenseHOCWrapper } from "../../shared/HOCs"
import { ILevel } from "../../types"


const DisciplineRedirect = suspenseHOCWrapper (
  () => {

    console.log( " procces for discipline ..... ")
    const { discipline, isSuccess } = useDisciplineData()
    const { data: levels, isSuccess: levelIsSuccess } = useGetSuspenseStateList<ILevel>("level", "discipline_id", discipline!.id )

    let page = "discipline";
    let redirect = discipline!.status === "play"

    if( redirect ) {
      if( levels.length === 0 ) {
        redirect = false
      }
      else if( !levels.find( it => it.status === "play" ) ) {
        page += "/prepare_level" 
      }
      if( levels.length === 0 ) {
        // поставить сообщение об остутствии этапов в дисциплине.
        console.log( "ни единого этапа для соревнования !!!!")
      }
    }


    if( isSuccess && levelIsSuccess )
    return (
      <RedirectToPlayPageFeature 
        to = { page }
        redirect = { redirect }
      />
    )
    return null
  }
)

const DisciplineRedirectPage = () => <DisciplineRedirect />
export default DisciplineRedirectPage