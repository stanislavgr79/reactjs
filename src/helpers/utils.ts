export const createClassList = (classesArray: string[]) =>
  classesArray
    .filter((className) => typeof className === 'string' && className.length > 0)
    .join(' ')
    .trim();

export function transformGenresToStringArray(genres: { value: string, label: string }[]) {
  const genresArray: string[] = [];
  genres.map((it) => genresArray.push(it.value));
  return genresArray;
}

export function transformGenresToArrayObjects(genres: string[]) {
  const genresArray: { value: string, label: string }[] = [];
  genres.map((it: string) =>
    genresArray.push({
      label: it,
      value: it,
    }),
  );
  return genresArray;
}
