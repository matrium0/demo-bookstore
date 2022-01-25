import {EnrichedAuthor} from '../author/EnrichedAuthor';
import {DateTime} from 'luxon';

function compare(a: EnrichedAuthor, b: EnrichedAuthor, sortDirection: "asc" | "desc", key: keyof EnrichedAuthor) {
  const isAsc = sortDirection === "asc";
  switch (key) {
    case 'age':
      return compareFields(a.age, b.age, isAsc);
    case 'firstname':
      return compareFields(a.firstname!, b.firstname!, isAsc);
    case 'lastname':
      return compareFields(a.lastname!, b.lastname!, isAsc);
    case 'penName':
      return booleanCompare(a.penName!, b.penName!, isAsc);
    case 'birthdate':
      return dateCompare(a.birthdate, b.birthdate, isAsc);
    case 'gender':
      return compareFields(a.gender!, b.gender!, isAsc);
    case 'dateOfDeath':
      return dateCompare(a.dateOfDeath, b.dateOfDeath, isAsc);
    default:
      return 0;
  }
}

export function dateCompare(a: DateTime | undefined, b: DateTime | undefined, isAsc: boolean) {
  const directionMultiplier = (isAsc ? 1 : -1);
  if (!a) {
    return -1 * directionMultiplier;
  }
  if (!b) {
    return 1 * directionMultiplier;
  }
  return (a.toMillis() - b.toMillis()) * directionMultiplier;
}

export function compareFields(a: number | string | null, b: number | string | null, isAsc: boolean) {
  const directionMultiplier = (isAsc ? 1 : -1);
  if (!a) {
    return -1 * directionMultiplier;
  }
  if (!b) {
    return 1 * directionMultiplier;
  }
  return (a < b ? -1 : 1) * directionMultiplier;
}

export function booleanCompare(a: boolean, b: boolean, isAsc: boolean) {
  return (Number(a) - Number(b)) * (isAsc ? -1 : 1);
}
