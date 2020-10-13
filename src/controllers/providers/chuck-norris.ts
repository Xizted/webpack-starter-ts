import { joke } from "../models/jokeChuckNorris";

const apiChuckNorrisApi: string = "https://api.chucknorris.io/jokes/random";

const getJoke = async (): Promise<joke> => {
  const resp = await fetch(apiChuckNorrisApi);

  const data: joke = await resp.json();

  return data;
};

export { getJoke };
