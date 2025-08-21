import { Form } from "react-final-form";
import arrayMutators from 'final-form-arrays'

import { useInitialValuesForForm } from "../../shared/hooks/state/useGetDBState/getStateForForm/useInitialValuesForForm";

import { LayoutCreateButtonBoxWidget, LayoutContentBoxWidget } from "../../widgets/layoutWidgets";
import { useChangeDataAtCreateLayout } from "./model/createLayout/useChangeDataAtCreateLayout";

const CreateLayout = () => {
  console.log( "render create layout ......")
  
  const { initialValues } = useInitialValuesForForm( )
  const mutate = useChangeDataAtCreateLayout();
 
  return (
    <Form
      mutators = { { ...arrayMutators } }
      initialValues = { initialValues }
      onSubmit = { async ( values: any ) => { 
        mutate.mutate( values ) }
      }
      render = { ( props ) => {
        return (
          <>
            <LayoutContentBoxWidget />
            <LayoutCreateButtonBoxWidget />
          </>
        )
      }}
    />
    )
  }

export default CreateLayout