export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const capitalizeTR = (s: string) =>
  s.charAt(0).toLocaleUpperCase("tr-TR") +
  s.slice(1).toLocaleLowerCase("tr-TR");
