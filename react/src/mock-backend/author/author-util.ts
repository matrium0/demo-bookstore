import type {DateTime} from 'luxon';
import type {Author}from './Author';
import type {EnrichedAuthor} from './EnrichedAuthor';

export function enrichWithCalculatedFields(original: Author): EnrichedAuthor {
  const age = calculateAge(original.birthdate!);
  return {
    ...original, age: age
  }
}

function calculateAge(birthDate: DateTime) {
  return Number(Math.abs(birthDate.diffNow("years").get('years')).toFixed(0));
}
