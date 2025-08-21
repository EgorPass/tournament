import { FC } from "react";
import {  RemoveDisciplineButtonFeature, RemoveLevelButtonFeature, RemoveTournamentButtonFeature, RemoveTournamentUnitButtonFeature, RemoveUnitButtonFeature, PlayActionTournamentButtonFeature } from "../../../features/addRemoveFeatures";

export const ButtonSwitch:FC<{type: string, title: string }> = ({ type, title  }) => (
  <>
    {
      type === "start-tournament" && (
        <PlayActionTournamentButtonFeature />
      )
    }
    {
      type === "remove-tournament" && (
          <RemoveTournamentButtonFeature
            key = { type + "-" + title }
            title = { title }
          />
        )
      }
      {  type === "remove-current_unit" && (
          <RemoveUnitButtonFeature
            key = { type + "-" + title }
            title = { title }
          />
        )
      }
      {  type === "remove-tournament_unit" && (
          <RemoveTournamentUnitButtonFeature 
            key = { type + "-" + title }
            title = { title }
          />
        )
      }
      {  type === "remove-discipline" && (
          <RemoveDisciplineButtonFeature
            key = { type + "-" + title }
            title = { title }
          />
        )
      }
      {  type === "remove-level"  && (
          <RemoveLevelButtonFeature
            key = { type + "-" + title }
            title = { title }
          />
        )
      }
  </>
)