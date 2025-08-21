import { FC } from "react";
import { Field } from "react-final-form";
import { textFieldValidator } from "../../lib/form/textFieldValidator";
import { IDiscipline, ILevel, ITournament, ITournamentUnit, ITournamentUnitDiscipline, IUnit } from "../../../types";

interface IValueField {
  name: string,
  type: 'radio' | "checkbox",
  value: any,
  // value:  undefined | string | IUnit | ITournament | ITournamentData | IDiscipline | ILevel | ITournamentUnit | ITournamentUnitDiscipline
  valid?: boolean
}

export const ValueField: FC<IValueField> = ( { name, type, value, valid = true }) => (
  <Field 
    name = { name }
    type = { type }
    value = { value }
    component = "input"
    validate = { valid ? textFieldValidator : undefined }
  />
)