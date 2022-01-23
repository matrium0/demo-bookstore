import {DateTime} from 'luxon';
import Author from './Author';
import {EnrichedAuthor} from './EnrichedAuthor';

export function enrichWithCalculatedFields(original: Author): EnrichedAuthor {
  const age = calculateAge(original.birthdate!);
  return {
    ...original, age: age
  }
}

function calculateAge(birthDate: DateTime) {
  return Number(Math.abs(birthDate.diffNow("years").get('years')).toFixed(0));
}
