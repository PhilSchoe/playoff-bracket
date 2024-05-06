import RestConnectionHandler from "./rest-connection-handler";

const GAMES_URL = "https://api.balldontlie.io/v1/games";

export async function getAllPlayoffGames(): Promise<string> {
  const endpoint = GAMES_URL + "?postseason=true&per_page=100&seasons[]=2023";

  try {
    const playoffGames = await RestConnectionHandler.get(
      endpoint,
      import.meta.env.VITE_BALL_DONT_LIE_API_KEY
    );
    const playoffGamesData = await playoffGames.json();

    return playoffGamesData;
  } catch (error) {
    return Promise.reject(error);
  }
}
