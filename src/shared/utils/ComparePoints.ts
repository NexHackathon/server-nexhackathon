export function comparePoints(points: number): string {
  let level: string;

  if (points <= 1000) {
    level = 'Calouro';
  } else if (points <= 3000) {
    level = 'Veterano';
  } else {
    level = 'Mestre';
  }

  return level;
}
