export const getClasses = (classes: any) =>
  classes
    .filter((item: any) => item !== '')
    .join(' ')
    .trim();
