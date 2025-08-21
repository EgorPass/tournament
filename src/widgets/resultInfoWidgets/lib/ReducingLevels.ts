import { IDiscipline, ILevel, ILevelReitingList, ITournamentPlayer } from "../../../types";
import { IReducingLevels } from "./types";

/**
 * первй класс в наследовании,
 * от него наследуеются 
 * 
 * ReducingFutureLevels
 */
export class ReducingLevels {

  protected pastLevels: ILevel[] = []
  protected futureLevels: ILevel[] = []
  protected levelReitingList: ILevelReitingList[] = []
  protected tournamentPlayers: ITournamentPlayer[] = []
  protected discipline: IDiscipline
  
  constructor( { levels, levelReitingList, tournamentPlayers, discipline} : IReducingLevels ) {
    this.discipline = discipline
    this.tournamentPlayers = tournamentPlayers;
    this.levelReitingList = levelReitingList;

    this.pastLevels = levels
      .filter( level => level.status === "gameOver" || level.status === "play" )
      .sort( (x, y) => +x.levelPosition - +y.levelPosition )

    this.futureLevels = levels
      .filter( level =>  level.status === "prepare" )
      .sort( (x, y) => +x.levelPosition - +y.levelPosition )
  }

  
}
