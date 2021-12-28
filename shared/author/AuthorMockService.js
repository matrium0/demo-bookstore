var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { EMPTY, of } from 'rxjs';
var initialData = [
    {
        id: 1,
        firstname: "Brandon",
        lastname: "Sanderson",
        isPenName: false,
        birthDate: new Date("1975-12-19"),
        birthLocation: "Lincoln, Nebraska, The United States",
        website: "http://brandonsanderson.com",
        note: "Brandon Sanderson (born December 19, 1975) is an American author of epic fantasy and science fiction. He is best known for the Cosmere fictional universe, in which most of his fantasy novels, most notably the Mistborn series and The Stormlight Archive, are set. Outside of the Cosmere, he has written several young adult[a] and juvenile series including The Reckoners, the Skyward series, and the Alcatraz series. He is also known for finishing Robert Jordan's high fantasy series The Wheel of Time and has created several graphic novel fantasy series including the White Sand and Dark One.\n" +
            "\n" +
            "He created Sanderson's Laws of Magic and popularized the terms \"hard and soft magic systems\". In 2008, Sanderson started a podcast with author Dan Wells and cartoonist Howard Tayler called Writing Excuses, involving topics about creating genre writing and webcomics."
    }
];
var data = __spreadArray([], initialData, true);
export function createOrUpdate(newElement) {
    var existingElement = data.filter(function (a) { return a.id === newElement.id; });
    if ((existingElement === null || existingElement === void 0 ? void 0 : existingElement.length) === 1) {
        var foundIndex = data.indexOf(existingElement[0]);
        newElement.id = Math.max.apply(Math, data.map(function (e) { return e.id; })) + 1;
        data[foundIndex] = newElement;
    }
    else {
        data.push(newElement);
    }
    return newElement;
}
export function findAll() {
    return of(data);
}
export function findById(id) {
    return of(data.filter(function (a) { return a.id === id; })[0]);
}
export function remove(id) {
    data = data.filter(function (elem) { return elem.id !== id; });
    return EMPTY;
}
