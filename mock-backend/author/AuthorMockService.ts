import {DateTime} from 'luxon';
import {delay, Observable, of} from 'rxjs';
import Author from './Author';
import dataURItoBlob from './DefaultAuthorFoto';

const initialData: Author[] = [
  {
    id: 1,
    firstname: "Brandon",
    lastname: "Sanderson",
    gender: "MALE",
    penName: false,
    birthdate: DateTime.local(1975, 12, 19),
    placeOfBirth: "Lincoln, Nebraska, The United States",
    website: "http://brandonsanderson.com",
    note: "Brandon Sanderson (born December 19, 1975) is an American author of epic fantasy and science fiction. He is best known for the Cosmere fictional universe, in which most of his fantasy novels, most notably the Mistborn series and The Stormlight Archive, are set. Outside of the Cosmere, he has written several young adult[a] and juvenile series including The Reckoners, the Skyward series, and the Alcatraz series. He is also known for finishing Robert Jordan's high fantasy series The Wheel of Time and has created several graphic novel fantasy series including the White Sand and Dark One.\n" +
        "\n" +
        "He created Sanderson's Laws of Magic and popularized the terms \"hard and soft magic systems\". In 2008, Sanderson started a podcast with author Dan Wells and cartoonist Howard Tayler called Writing Excuses, involving topics about creating genre writing and webcomics.",
    foto: dataURItoBlob()
  },
  {
    id: 2,
    firstname: "Stephen",
    lastname: "King",
    gender: "MALE",
    penName: false,
    birthdate: DateTime.local(1947, 9, 21),
    placeOfBirth: "Portland, Maine, The United States",
    website: "https://stephenking.com/",
    note: "Stephen Edwin King (born September 21, 1947) is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the \"King of Horror\", a play on his surname and a reference to his high standing in pop culture,[2] his books have sold more than 350 million copies,[3] and many have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books.[4] He has also written approximately 200 short stories, most of which have been published in book collections.",
    foto: dataURItoBlob()
  },
  {
    id: 3,
    firstname: "Anne",
    lastname: "Rice",
    gender: "FEMALE",
    penName: false,
    birthdate: DateTime.local(1941, 10, 4),
    placeOfBirth: "New Orleans, Louisiana, The United States",
    dateOfDeath: DateTime.local(2021, 12, 1),
    placeOfDeath: "Rancho Mirage, California, United States",
    website: "http://annerice.com",
    note: "Anne Rice[1] (born Howard Allen Frances O'Brien; October 4, 1941 – December 11, 2021) was an American author of gothic fiction, erotic literature, and Christian literature. She was best known for her series of novels The Vampire Chronicles. Books from The Vampire Chronicles were the subject of two film adaptations—Interview with the Vampire (1994) and Queen of the Damned (2002).",
    foto: dataURItoBlob()
  },
  {
    id: 4,
    firstname: "Richard",
    lastname: "Bachman",
    gender: "MALE",
    penName: true,
    birthdate: DateTime.local(1947, 9, 21),
    placeOfBirth: "Portland, Maine, The United States",
    note: "Stephen Edwin King (born September 21, 1947) is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the \"King of Horror\", a play on his surname and a reference to his high standing in pop culture,[2] his books have sold more than 350 million copies,[3] and many have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books.[4] He has also written approximately 200 short stories, most of which have been published in book collections.",
    foto: dataURItoBlob()
  },
];

let data = [...initialData];

export function createOrUpdateAuthor(newElement: Author): Observable<Author> {
  let existingElement = data.filter(a => a.id === newElement.id);

  if (existingElement?.length === 1) {
    let foundIndex = data.indexOf(existingElement[0]);
    data[foundIndex] = newElement;
  } else {
    newElement.id = Math.max(...data.map(e => e.id)) + 1;
    data.push(newElement);
  }
  return of(newElement);
}

export function findAllAuthors(): Observable<Author[]> {
  return of(data).pipe(delay(500));
}

export function findAuthorById(id: number): Observable<Author> {
  return of(data.filter(a => a.id === id)[0]).pipe(delay(5000));
}

export function deleteAuthor(id: number): Observable<void> {
  data = data.filter(elem => elem.id !== id);
  return of(void 0);
}
