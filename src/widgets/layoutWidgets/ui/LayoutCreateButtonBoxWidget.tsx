import { BackButtonFeature, ResetButtonFeature, SaveButtonFeature } from "../../../features/layoutFeatures";
import { LayoutButtonBox } from "../components/LayoutButtonBox";

export const LayoutCreateButtonBoxWidget = () => (
  <LayoutButtonBox type = "create-buttons-container">
    <ResetButtonFeature />
    <SaveButtonFeature title = "Сохранить"/>
    <BackButtonFeature />
  </LayoutButtonBox>
)