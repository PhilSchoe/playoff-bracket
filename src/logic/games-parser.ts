import Game from "../types/game";

export function parseGames(gamesJson: []): void {
  if (!gamesJson) {
    return;
  }

  gamesJson.forEach((game: Game) => {
    console.log(game);
  });
}
