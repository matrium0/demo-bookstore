import {DateTime} from 'luxon';
import {delay, Observable, of} from 'rxjs';
import Author from './Author';
import {getDefaultAuthorFoto} from './default-fotos';

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
    genre: "Science Fiction & Fantasy, Young Adult",
    note: "Brandon Sanderson (born December 19, 1975) is an American author of epic fantasy and science fiction. He is best known for the Cosmere fictional universe, in which most of his fantasy novels, most notably the Mistborn series and The Stormlight Archive, are set. Outside of the Cosmere, he has written several young adult[a] and juvenile series including The Reckoners, the Skyward series, and the Alcatraz series. He is also known for finishing Robert Jordan's high fantasy series The Wheel of Time and has created several graphic novel fantasy series including the White Sand and Dark One.\n" +
        "\n" +
        "He created Sanderson's Laws of Magic and popularized the terms \"hard and soft magic systems\". In 2008, Sanderson started a podcast with author Dan Wells and cartoonist Howard Tayler called Writing Excuses, involving topics about creating genre writing and webcomics.",
    foto: getDefaultAuthorFoto()
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
    genre: "Horror, Mystery, Literature & Fiction",
    note: "Stephen Edwin King was born the second son of Donald and Nellie Ruth Pillsbury King. After his father left them when Stephen was two, he and his older brother, David, were raised by his mother. Parts of his childhood were spent in Fort Wayne, Indiana, where his father's family was at the time, and in Stratford, Connecticut. When Stephen was eleven, his mother brought her children back to Durham, Maine, for good. Her parents, Guy and Nellie Pillsbury, had become incapacitated with old age, and Ruth King was persuaded by her sisters to take over the physical care of them. Other family members provided a small house in Durham and financial support. After Stephen's grandparents passed away, Mrs. King found work in the kitchens of Pineland, a nearby residential facility for the mentally challenged.\n" +
        "<br /><br />" +
        "Stephen attended the grammar school in Durham and Lisbon Falls High School, graduating in 1966. From his sophomore year at the University of Maine at Orono, he wrote a weekly column for the school newspaper, THE MAINE CAMPUS. He was also active in student politics, serving as a member of the Student Senate. He came to support the anti-war movement on the Orono campus, arriving at his stance from a conservative view that the war in Vietnam was unconstitutional. He graduated in 1970, with a B.A. in English and qualified to teach on the high school level. A draft board examination immediately post-graduation found him 4-F on grounds of high blood pressure, limited vision, flat feet, and punctured eardrums.\n" +
        "<br /><br />" +
        "He met Tabitha Spruce in the stacks of the Fogler Library at the University, where they both worked as students; they married in January of 1971. As Stephen was unable to find placement as a teacher immediately, the Kings lived on his earnings as a laborer at an industrial laundry, and her student loan and savings, with an occasional boost from a short story sale to men's magazines.\n" +
        "<br /><br />" +
        "Stephen made his first professional short story sale (\"The Glass Floor\") to Startling Mystery Stories in 1967. Throughout the early years of his marriage, he continued to sell stories to men's magazines. Many were gathered into the Night Shift collection or appeared in other anthologies.\n" +
        "<br /><br />" +
        "In the fall of 1971, Stephen began teaching English at Hampden Academy, the public high school in Hampden, Maine. Writing in the evenings and on the weekends, he continued to produce short stories and to work on novels.",
    foto: getDefaultAuthorFoto()
  },
  {
    id: 3,
    firstname: "Anne",
    lastname: "Rice",
    gender: "FEMALE",
    penName: true,
    fullRealName: "Howard Allen Frances O'Brien",
    birthdate: DateTime.local(1941, 10, 4),
    placeOfBirth: "New Orleans, Louisiana, The United States",
    dateOfDeath: DateTime.local(2021, 12, 1),
    placeOfDeath: "Rancho Mirage, California, United States",
    website: "http://annerice.com",
    genre: "Horror, Historical Fiction, Romance",
    note: "Anne Rice[1] (born Howard Allen Frances O'Brien; October 4, 1941 – December 11, 2021) was an American author of gothic fiction, erotic literature, and Christian literature. She was best known for her series of novels The Vampire Chronicles. Books from The Vampire Chronicles were the subject of two film adaptations—Interview with the Vampire (1994) and Queen of the Damned (2002).",
    foto: getDefaultAuthorFoto()
  },
  {
    id: 4,
    firstname: "Richard",
    lastname: "Bachman",
    gender: "MALE",
    penName: true,
    fullRealName: "Stephen King",
    birthdate: DateTime.local(1947, 9, 21),
    placeOfBirth: "Portland, Maine, The United States",
    genre: "Crime, Horror",
    note: "Stephen Edwin King (born September 21, 1947) is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the \"King of Horror\", a play on his surname and a reference to his high standing in pop culture,[2] his books have sold more than 350 million copies,[3] and many have been adapted into films, television series, miniseries, and comic books. King has published 63 novels, including seven under the pen name Richard Bachman, and five non-fiction books.[4] He has also written approximately 200 short stories, most of which have been published in book collections.",
    foto: getDefaultAuthorFoto()
  },
];

let data = [...initialData];

export function createOrUpdateAuthor(newElement: Author): Observable<Author> {
  let existingElement = data.filter(a => a.id === newElement.id);

  if (existingElement?.length === 1) {
    let foundIndex = data.indexOf(existingElement[0]);
    data[foundIndex] = newElement;
  } else {
    newElement.id = Math.max(...data.map(e => e.id!)) + 1;
    data.push(newElement);
  }
  return of(newElement);
}

export function findAllAuthors(): Observable<Author[]> {
  return of(data).pipe(delay(1500));
}

export function findAuthorById(id: number): Observable<Author> {
  return of(data.filter(a => a.id === id)[0]).pipe(delay(300));
}

export function deleteAuthor(id: number): Observable<void> {
  data = data.filter(elem => elem.id !== id);
  return of(void 0);
}

export function getAuthorFullName(id: number): string {
  const author = data.filter(a => a.id === id)[0];
  return author.firstname + " " + author.lastname;
}
