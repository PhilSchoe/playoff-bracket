import RestConnectionHandler from "./rest-connection-handler";

const TEAM_URL = "https://api.balldontlie.io/v1/teams";

export async function getAllTeams() {
  try {
    RestConnectionHandler.get(
      TEAM_URL,
      import.meta.env.VITE_BALL_DONT_LIE_API_KEY
    );
  } catch (error) {
    return Promise.reject(error);
  }
}
