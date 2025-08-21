import { GroupContentWrapper } from "../../../../shared/components/groupComponents";
import { useImportData } from "../../model/admin/useImportData";
import { FormRowComponentWithTitle } from "../../components/generic/formRowComponentWithTitle";
import { InputFile } from "../../../../shared/components/inputFields/inputFile";
import { useHandleChooseFile } from "../../model/admin/useHandleChooseFile";
import { useResetImportButton } from "../../model/admin/useResetImportButton";
import { ChooseSelectItemsForImport } from "../../components/admin/ChooseSelectItemsForImport";

export const ChooseFileForImportFormWidget = () => {
  const { current_unit, tournament } = useImportData()
  const handleChooseFile = useHandleChooseFile()
  const reset = useResetImportButton()
  
  return (
    <GroupContentWrapper>
      <FormRowComponentWithTitle title = "Выборать хранилище">
        <InputFile
          title = "нажми на меня"
          callback = { handleChooseFile }
        />
      </FormRowComponentWithTitle> 
      <FormRowComponentWithTitle title = "Сбросить загруженные">
        <div
          onClick = { reset }
        >сбросить</div>
      </FormRowComponentWithTitle>
      { 
        tournament.length > 0 && (
          <ChooseSelectItemsForImport
            field = "selectTours"
            title = "Соревнования"
          />
       )
      }
      {
        current_unit.length > 0 && (
          <ChooseSelectItemsForImport 
            field = "selectUnits"
            title = "Спортсмены"
          />
        )
       }
    </GroupContentWrapper>
  )
} 
