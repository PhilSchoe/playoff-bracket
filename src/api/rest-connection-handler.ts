export default class RestConnectionHandler {
  public static async get(
    url: string,
    authorization: string = ""
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
      });

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async put<T extends BodyInit>(
    url: string,
    data: T,
    filetype: string
  ): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": filetype,
          "Access-Control-Allow-Origin": "*",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}
