import styles from "./playoff-bracket.module.scss";
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

  const easternSeries = [];
  const westernSeries = [];
  if (series) {
    series.forEach((series: Series) => {
      const playoffSeriesComponent = <PlayoffSeries series={series} />;

      if (series.getConference() === "East") {
        easternSeries.push(playoffSeriesComponent);
      } else if (series.getConference() === "West") {
        westernSeries.push(playoffSeriesComponent);
      }
    });
  } else {
    easternSeries.push(<h1>Loading Data</h1>);
    westernSeries.push(<h1>...</h1>);
  }

  return (
    <div className={styles["playoff-bracket"]}>
      <div>{easternSeries}</div>
      <div>{westernSeries}</div>
    </div>
  );
}
