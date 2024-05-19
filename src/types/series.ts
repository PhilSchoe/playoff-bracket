import Game from "./game";
import Team from "./team";

/**
 * Represents a playoff series of between two teams.
 * Keeps track of the number of wins for each team in the series.
 */
export default class Series {
  private firstTeam: Team;
  private secondTeam: Team;
  private wins: Map<number, number>;

  /**
   * Initializes a new instance of the Series class with the specified first and second teams.
   * @param firstTeam The first team in the series.
   * @param secondTeam The second team in the series.
   */
  constructor(firstTeam: Team, secondTeam: Team) {
    this.firstTeam = firstTeam;
    this.secondTeam = secondTeam;

    this.wins = new Map<number, number>([
      [firstTeam.id, 0],
      [secondTeam.id, 0],
    ]);
  }

  /**
   * Updates the number of wins for the corresponding team based on the outcome of the provided game.
   * If the home team wins, the wins count for the home team is incremented by 1.
   * If the visitor team wins, the wins count for the visitor team is incremented by 1.
   * @param game The game to update the wins for.
   * @throws Error if the game data is broken or the team IDs from the game do not match the team IDs in the series.
   */
  public updateWins(game: Game): void {
    if (!game || !game.home_team || !game.visitor_team || !game.status) {
      throw new Error("Game data is broken! Cannot update win!");
    }

    // Only count finished games
    if (game.status != "Final") {
      return;
    }

    if (!this.checkTeamIds(game.home_team.id, game.visitor_team.id)) {
      throw new Error(
        "Team IDs from game do not match team IDs in the series!"
      );
    }

    const homeTeamId = game.home_team.id;
    const visitorTeamId = game.visitor_team.id;

    const homeTeamWins = this.wins.get(homeTeamId)!;
    const visitorTeamWins = this.wins.get(visitorTeamId)!;

    if (game.home_team_score > game.visitor_team_score) {
      this.wins.set(homeTeamId, homeTeamWins + 1);
    } else {
      this.wins.set(visitorTeamId, visitorTeamWins + 1);
    }
  }

  public getFirstTeam(): Team {
    return this.firstTeam;
  }

  /**
   * Checks if the provided home team ID and visitor team ID match the IDs of the first and second teams in the series.
   * @param homeTeamId The ID of the home team.
   * @param visitorTeamId The ID of the visitor team.
   * @returns True if the IDs match, false otherwise.
   */
  private checkTeamIds(homeTeamId: number, visitorTeamId: number): boolean {
    return (
      (homeTeamId === this.firstTeam.id || homeTeamId === this.secondTeam.id) &&
      (visitorTeamId === this.firstTeam.id ||
        visitorTeamId === this.secondTeam.id)
    );
  }
}
