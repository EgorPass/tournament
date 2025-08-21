import { Form } from "react-final-form"
import arrayMutators from 'final-form-arrays'

import { LayoutContentBoxWidget } from "../../widgets/layoutWidgets"
import { LayoutPlayButtonBoxWidget } from "../../widgets/layoutWidgets/ui/LayoutPlayButtonBoxWidget"
import { usePlayLayoutSubmitData } from "./model/playLayout/usePlayLayoutSubmitData"
import { PlayLayoutProvider } from "../../features/layoutFeatures"
import { useInitialValuesToModalMode } from "./model/playLayout/useInitialValuesToModalMode"
import { suspenseHOCWrapper } from "../../shared/HOCs"
import { ContextModalPlayLayoutProvieder } from "../../features/layoutFeatures/model/contextPlayLayoutProvider"

const PlayLayoutContainer = suspenseHOCWrapper(
  () => {
    // console.log( "2 - play layout contaijner .... >>>")
    const mutate = usePlayLayoutSubmitData()
    const data = useInitialValuesToModalMode()
    return (
      <ContextModalPlayLayoutProvieder.Provider value = { data } >

        <Form
          mutators = { { ...arrayMutators } }
          initialValues = { 
            data.status 
            ? { ...data.initialValuesForForm, "returnToPosition": [] } 
            : { } }
          onSubmit = { async( values: any ) => {
          // console.log( 'on submit...')
            mutate.mutate( values )
          } }
          render = { () => (
            <>
              <LayoutContentBoxWidget />
              <LayoutPlayButtonBoxWidget />
            </>
          )}
        />
      </ContextModalPlayLayoutProvieder.Provider>
    )
  }
)

const PlayLayout = () => (
  <PlayLayoutProvider>
    <PlayLayoutContainer />
  </PlayLayoutProvider>
)

export default PlayLayout