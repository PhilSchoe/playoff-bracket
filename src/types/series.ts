import Team from "./team";

export default interface Series {
  firstTeam: Team;
  secondTeam: Team;
  firstTeamWins: number;
  secondTeamWins: number;
}
