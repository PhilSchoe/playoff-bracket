import { useEffect, useState } from "react";
import { getAllPlayoffGames } from "../api/games-controller";
import { parseGames } from "../logic/games-parser";
import Game from "../types/game";
import Series from "../types/series";
import PlayoffSeries from "../components/playoff-series";

export default function PlayoffBracket() {
  const [series, setSeries] = useState<Series[]>();
  useEffect(() => {
    getAllPlayoffGames()
      .then((games: Game[]) => {
        const result = parseGames(games);
        if (result) {
          setSeries(Array.from(result.values()));
        }
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  const playoffBracket = [];
  if (series) {
    series.forEach((series: Series) => {
      playoffBracket.push(<PlayoffSeries series={series}></PlayoffSeries>);
    });
  } else {
    playoffBracket.push(<h1>Loading Data</h1>);
  }

  return <div>{playoffBracket}</div>;
}
