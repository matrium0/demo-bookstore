import Author from "../../../../mock-backend/author/Author";

export function enrichWithCalculatedFields(original: Author): EnrichedAuthor{
  const age = calculateAge(original.birthdate);
  return {
    ...original, age: age
  }
}

export interface EnrichedAuthor extends Author {
  age: number;
}

function calculateAge(birthDate: Date) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
