export function enrichWithCalculatedFields(original) {
    const age = calculateAge(original.birthdate);
    return {
        ...original, age: age
    };
}
function calculateAge(birthDate) {
    return Number(Math.abs(birthDate.diffNow("years").get('years')).toFixed(0));
}
