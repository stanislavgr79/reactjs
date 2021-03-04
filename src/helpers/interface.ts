export interface IMovie {
  title: string;
  releaseDate: Date | string;
  movieUrl: string;
  genre: string;
  image: string;
  overview?: string;
  runtime?: number | string;
}
