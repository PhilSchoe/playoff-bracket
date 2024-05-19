import Game from "../types/game";
import Series from "../types/series";

export function parseGames(games: Game[]): Map<string, Series> | null {
  if (!games) {
    return null;
  }

  const series = new Map<string, Series>();

  games.forEach((game: Game) => {
    const homeTeam = game.home_team;
    const visitorTeam = game.visitor_team;

    const seriesKey = homeTeam.abbreviation + visitorTeam.abbreviation;
    const reverseSeriesKey = visitorTeam.abbreviation + homeTeam.abbreviation;

    if (series.has(seriesKey)) {
      updateSeries(game, series, seriesKey);
    } else if (series.has(reverseSeriesKey)) {
      updateSeries(game, series, reverseSeriesKey);
    } else {
      createSeries(game, series, seriesKey);
    }
  });

  console.log(series);

  return series;
}

function createSeries(
  game: Game,
  seriesMap: Map<string, Series>,
  key: string
): void {
  const series = new Series(game.home_team, game.visitor_team);
  series.updateWins(game);

  seriesMap.set(key, series);
}

function updateSeries(
  game: Game,
  seriesMap: Map<string, Series>,
  key: string
): void {
  const currentSeries = seriesMap.get(key);
  if (currentSeries) {
    currentSeries.updateWins(game);
    seriesMap.set(key, currentSeries);
  }
}
