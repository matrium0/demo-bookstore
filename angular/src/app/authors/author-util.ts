import Author from "../../../../mock-backend/author/Author";
import {DateTime} from 'luxon';

export function enrichWithCalculatedFields(original: Author): EnrichedAuthor {
  const age = calculateAge(original.birthdate);
  return {
    ...original, age: age
  }
}

export interface EnrichedAuthor extends Author {
  age: number;
}

function calculateAge(birthDate: DateTime) {
  return Number(Math.abs(birthDate.diffNow("years").get('years')).toFixed(0));
}
