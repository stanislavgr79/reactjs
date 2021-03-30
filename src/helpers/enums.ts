/* eslint-disable no-unused-vars */

/**
 * Enum for common SelectGenres.
 * @readonly
 * @enum {{label: string, value: string}}
 */
export const selectGenres = Object.freeze([
  { label: 'Action', value: 'Action' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Animation', value: 'Animation' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Documentary', value: 'Documentary' },
  { label: 'Drama', value: 'Drama' },
  { label: 'Family', value: 'Family' },
  { label: 'Horror', value: 'Horror' },
  { label: 'Mystery', value: 'Mystery' },
  { label: 'Thriller', value: 'Thriller' },
]);

/**
 * Enum for common Genres.
 * @readonly
 * @enum { string }
 */
export enum Genres {
  ALL = '',
  DOCUMENTARY = 'documentary',
  COMEDY = 'comedy',
  HORROR = 'horror',
  CRIME = 'crime',
}

/**
 * Enum for common SortBy.
 * @readonly
 * @enum { string }
 */
export enum SortBy {
  TITLE = 'title',
  RELEASE = 'release_date',
  RUNTIME = 'runtime',
  RATING = 'vote_average',
}

/**
 * Enum for common SortOrder.
 * @readonly
 * @enum { string }
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
