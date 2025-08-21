import { BackButtonFeature } from "../../../features/layoutFeatures";
import { LayoutButtonBox } from "../components/LayoutButtonBox";

export const LayoutAddButtonBoxWidget = () => (
  <LayoutButtonBox type = "add-buttons-container">
    <BackButtonFeature />
  </LayoutButtonBox>
)