export interface IMovie {
  id: number;
  title: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  release_date: string;
  movieUrl: string;
  genres: string[] | { value: string, label: string }[];
  poster_path?: string | undefined;
  overview: string;
  runtime: number | string | undefined;
}
