import { useForm } from "react-final-form";
import { ChangeEvent } from "react";

export const useHandleChooseFile = () => {
  const form = useForm()
  const handleChooseFile = ( e: ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault()
    const { target: { files }, } = e
    if( files ) {
      const data = files[0]
      const fileReader = new FileReader();
            fileReader.onload = () => {
              const data = JSON.parse( fileReader.result as string )
              form.change( "importData", data )
              form.change( "chooseTours", "choose")
              form.change( "chooseUnits", "choose")
            
              if( fileReader.DONE === 2 ) {
                console.log( fileReader.DONE )
                e.target.value = "" 
              }
            }
            fileReader.onerror = () => {
              console.log( fileReader.error )
            }
            fileReader.readAsText( data )
    }
  }

  return handleChooseFile
}