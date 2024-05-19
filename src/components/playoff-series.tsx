import Series from "../types/series";

export default function PlayoffSeries({ series }: { series: Series }) {
  return (
    <div>
      <div>{`${series.getFirstTeam().name} ${series.getFirstTeamWins()}`}</div>
      <div>{`${
        series.getSecondTeam().name
      } ${series.getSecondTeamWins()}`}</div>
      <br></br>
    </div>
  );
}
