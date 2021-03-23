export interface IMovie {
  [x: string]: unknown;
  id?: number;
  title: string;
  tagline?: string;
  budget?: number;
  vote_average?: number;
  vote_count?: number;
  revenue?: number;
  release_date: string;
  genres: string[];
  poster_path?: string | undefined;
  overview: string;
  runtime: number;
}

export interface IData {
  [x: string]: unknown;
  totalAmount: number;
  data: IMovie[];
  offset: number;
  limit: number;
}
