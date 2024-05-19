import { useEffect, useState } from "react";
import "./App.css";
import { getAllPlayoffGames } from "./api/games-controller";
import { parseGames } from "./logic/games-parser";
import Game from "./types/game";
import Series from "./types/series";

function App() {
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
      playoffBracket.push(<h1>{series.getFirstTeam().name}</h1>);
    });
  } else {
    playoffBracket.push(<h1>Loading Data</h1>);
  }

  return <div>{playoffBracket}</div>;
}

export default App;
