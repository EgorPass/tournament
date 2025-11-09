import { GroupContentWrapper, GroupLinks } from "../../../../shared/components/groupComponents";
import { useHandleChooseFile } from "../../model/admin/useHandleChooseFile";
import { useResetImportButton } from "../../model/admin/useResetImportButton";
import { InputFile, ResetFile } from "../../../../shared/components/inputFields/inputFile";
import { GroupContentForButton } from "../../components/admin/GroupContentForButton";



export const ChooseFileForImportFormWidget = () => {
  const handleChooseFile = useHandleChooseFile()
  const reset = useResetImportButton()

  return (
    <GroupContentWrapper>
      <GroupContentForButton>
        <InputFile
          title = "Выбрать базу"
          callback = { handleChooseFile }
        />
        <ResetFile 
          title = "Сбросить базу"
          callback = { reset }
        />
      </GroupContentForButton>
    </GroupContentWrapper>
  )
} 
