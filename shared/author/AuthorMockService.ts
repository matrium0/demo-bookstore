import {EMPTY, Observable, of} from 'rxjs';
import Author from './Author';

const initialData: Author[] = [
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

let data = [...initialData];

export function createOrUpdate(newElement: Author): Author {
  let existingElement = data.filter(a => a.id === newElement.id);

  if (existingElement?.length === 1) {
    let foundIndex = data.indexOf(existingElement[0]);
    newElement.id = Math.max(...data.map(e => e.id)) + 1;
    data[foundIndex] = newElement;
  } else {
    data.push(newElement);
  }
  return newElement;
}

export function findAll(): Observable<Author[]> {
  return of(data);
}

export function findById(id: number): Observable<Author> {
  return of(data.filter(a => a.id === id)[0]);
}

export function remove(id: number): Observable<never> {
  data = data.filter(elem => elem.id !== id);
  return EMPTY;
}
