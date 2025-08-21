import { IInputObject } from "../../../../types";

export const tournamentAddressData: Array<IInputObject> = [
  {
    title: "место проведения",
    name: "place",
    type: "text",
    placeholder: "название комплекса"
  },
  {
    title: "город",
    name: "city",
    type: "text",
    placeholder: "город"
  },
  {
    title: "улица",
    name: "street",
    type: "text",
    placeholder: "улица"
  },
  {
    title: "дом",
    name: "structure",
    type: "number",
    placeholder: "дом"
  },
  {
    title: "строение",
    name: "build",
    type: "number",
    placeholder: "строение"
  },
]