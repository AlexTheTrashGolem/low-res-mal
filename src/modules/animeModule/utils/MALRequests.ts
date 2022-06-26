import axios, {AxiosPromise} from "axios";
import {MALOptions} from "../types/animeTypes";
import {logger} from "../../../logger/winlog";

export const fetchFiltered = async (options: MALOptions): Promise<AxiosPromise> => {
  logger.info(options);
  let query = `https://api.jikan.moe/v4/anime?limit=1`;
  const type = options.type ? `&type=${options.type}` : ``;
  const minScore = options.minScore ? `&min_score=${options.minScore}` : ``;
  const maxScore = options.maxScore ? `&max_score=${options.maxScore}` : ``;
  const status = options.status ? `&status=${options.status}` : ``;
  const orderBy = options.orderBy ? `&order_by=${options.orderBy}` : ``;
  query = [query, type, minScore, maxScore, status, orderBy].join("");
  return axios({
    method: "GET",
    url: query
  });
};



