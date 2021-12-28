import {EMPTY, Observable, of} from 'rxjs';
import Author from './Author';

const initialData: Author[] = [
  {
    id: 1,
    firstname: "Brandon",
    lastname: "Sanderson",
    gender: "MALE",
    isPenName: false,
    birthdate: new Date("1975-12-19"),
    placeOfBirth: "Lincoln, Nebraska, The United States",
    dateOfDeath: null,
    placeOfDeath: null,
    website: "http://brandonsanderson.com",
    note: "Brandon Sanderson (born December 19, 1975) is an American author of epic fantasy and science fiction. He is best known for the Cosmere fictional universe, in which most of his fantasy novels, most notably the Mistborn series and The Stormlight Archive, are set. Outside of the Cosmere, he has written several young adult[a] and juvenile series including The Reckoners, the Skyward series, and the Alcatraz series. He is also known for finishing Robert Jordan's high fantasy series The Wheel of Time and has created several graphic novel fantasy series including the White Sand and Dark One.\n" +
        "\n" +
        "He created Sanderson's Laws of Magic and popularized the terms \"hard and soft magic systems\". In 2008, Sanderson started a podcast with author Dan Wells and cartoonist Howard Tayler called Writing Excuses, involving topics about creating genre writing and webcomics."
  },
  {
    id: 2,
    firstname: "Stephen",
    lastname: "King",
    gender: "MALE",
    isPenName: false,
    birthdate: new Date("1947-09-21"),
    placeOfBirth: "Portland, Maine, The United States",
    dateOfDeath: null,
    placeOfDeath: null,
    website: "https://stephenking.com/",
    note: "Stephen Edwin King (born September 21, 1947) is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the \"King of Horror\", a play on his surname and a reference to his high standing in pop culture,[2] his books have sold more than 350 million copies,[3] and many have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books.[4] He has also written approximately 200 short stories, most of which have been published in book collections."
  },
  {
    id: 3,
    firstname: "Anne",
    lastname: "Rice",
    gender: "FEMALE",
    isPenName: false,
    birthdate: new Date("1941-10-04"),
    placeOfBirth: "New Orleans, Louisiana, The United States",
    dateOfDeath: new Date("2021-12-11"),
    placeOfDeath: "Rancho Mirage, California, United States",
    website: "http://annerice.com",
    note: "Anne Rice[1] (born Howard Allen Frances O'Brien; October 4, 1941 – December 11, 2021) was an American author of gothic fiction, erotic literature, and Christian literature. She was best known for her series of novels The Vampire Chronicles. Books from The Vampire Chronicles were the subject of two film adaptations—Interview with the Vampire (1994) and Queen of the Damned (2002)."
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