import { GroupContentWrapper, StyledGridListContainer } from "../../../../shared/components/groupComponents"
import { Checkbox } from "../../../../shared/components/inputFields/checkBoxItem"
import { ChooseItemForExport } from "../../components/admin/ChooseItemForExport"
import { tourRadio } from "../../config/admin/tourRadio"
import { unitRadio } from "../../config/admin/unitradio"
import { FormRowText } from "../../components/generic/formRow/formRowText"
import { FormRowComponentWithTitle } from "../../components/generic/formRowComponentWithTitle"

export const ChooseTypeForExportFormWidget = () => (
  <GroupContentWrapper>
    
    <FormRowText
      name = "fileName" 
      title = "Название для файла"
      placeholder = "база для соревнований до 2024 года"
    />
    <FormRowComponentWithTitle
      title = "Выборка будет по:"
    >
      <StyledGridListContainer>
        
        <ChooseItemForExport 
          value = 'спортсмены'
          list = { unitRadio }
        />

        <ChooseItemForExport 
          value = "соревнования"
          list = { tourRadio }
        >
          <Checkbox
            name = "tournamentUnits"
            value = "tournamentUnits"
            title = "с информацией об участниках"
          />
        </ChooseItemForExport>

      </StyledGridListContainer>
    </FormRowComponentWithTitle> 

  </GroupContentWrapper>
)
