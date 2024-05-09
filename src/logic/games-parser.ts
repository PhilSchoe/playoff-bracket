import Game from "../types/game";

export function parseGames(gamesJson: []): void {
  if (!gamesJson) {
    return;
  }

  const series = new Map<string, Series>();

  gamesJson.forEach((game: Game) => {
    console.log(game);

    const homeTeam = game.home_team;
    const visitorTeam = game.visitor_team;

    const seriesKey = homeTeam.abbreviation + visitorTeam.abbreviation;
    if (series.has(seriesKey)) {
    } else {
    }
  });
}

function createSeries(games: Game): Series {}
