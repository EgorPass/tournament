import { FC } from "react";
import { LayoutButtonBox } from "../components/LayoutButtonBox";
import { BackButtonFeature, SaveButtonFeature } from "../../../features/layoutFeatures";

export const LayoutAdminButtonBoxWidget: FC<{title: string}> = ({ title }) => (
  <LayoutButtonBox type = "create-buttons-container">
    <SaveButtonFeature title = { title }/>
    <BackButtonFeature />
  </LayoutButtonBox>
)