import styles from "./playoff-series.module.scss";
import Series from "../types/series";

export default function PlayoffSeries({ series }: { series: Series }) {
  return (
    <div className={styles["playoff-series"]}>
      <div className={styles["playoff-series__first-team"]}>{`${
        series.getFirstTeam().name
      } ${series.getFirstTeamWins()}`}</div>
      <div className={styles["playoff-series__second-team"]}>{`${
        series.getSecondTeam().name
      } ${series.getSecondTeamWins()}`}</div>
    </div>
  );
}
