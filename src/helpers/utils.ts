export const createClassList = (classesArray: string[]) =>
  classesArray
    .filter((className) => typeof className === 'string' && className.length > 0)
    .join(' ')
    .trim();
