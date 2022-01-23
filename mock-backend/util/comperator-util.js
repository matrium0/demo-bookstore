function compare(a, b, sortDirection, key) {
    const isAsc = sortDirection === "asc";
    switch (key) {
        case 'age':
            return compareFields(a.age, b.age, isAsc);
        case 'firstname':
            return compareFields(a.firstname, b.firstname, isAsc);
        case 'lastname':
            return compareFields(a.lastname, b.lastname, isAsc);
        case 'penName':
            return booleanCompare(a.penName, b.penName, isAsc);
        case 'birthdate':
            return dateCompare(a.birthdate, b.birthdate, isAsc);
        case 'gender':
            return compareFields(a.gender, b.gender, isAsc);
        case 'dateOfDeath':
            return dateCompare(a.dateOfDeath, b.dateOfDeath, isAsc);
        default:
            return 0;
    }
}
export function dateCompare(a, b, isAsc) {
    const directionMultiplier = (isAsc ? 1 : -1);
    if (!a) {
        return -1 * directionMultiplier;
    }
    if (!b) {
        return 1 * directionMultiplier;
    }
    return (a.toMillis() - b.toMillis()) * directionMultiplier;
}
export function compareFields(a, b, isAsc) {
    const directionMultiplier = (isAsc ? 1 : -1);
    if (!a) {
        return -1 * directionMultiplier;
    }
    if (!b) {
        return 1 * directionMultiplier;
    }
    return (a < b ? -1 : 1) * directionMultiplier;
}
export function booleanCompare(a, b, isAsc) {
    return (Number(a) - Number(b)) * (isAsc ? -1 : 1);
}
