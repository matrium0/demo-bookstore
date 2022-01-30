import {DateTime} from 'luxon';
import {delay, Observable, of} from 'rxjs';
import {Book} from './Book';
import {
  getDefaultBookCover,
  gunslingerCover,
  king112263cover,
  mistbornCover1,
  mistbornCover2,
  mistbornCover3,
  shiningCover
} from '../author/default-fotos';
import {findUserBookAssignmentsForUser} from '../user/user-book-assignment-mockservice';

export function createOrUpdateBook(newElement: Book): Observable<Book> {
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

export function findBooksForUser(username: string): Observable<Book[]> {
  let assignments = findUserBookAssignmentsForUser(username).map(ass => ass.bookId);
  return of(data.filter(b => assignments.indexOf(b.id!) !== -1)).pipe(delay(300));
}

export function findAllBooks(): Observable<Book[]> {
  return of(data).pipe(delay(600));
}

export function findBooksOfAuthor(id: number): Observable<Book[]> {
  return of(data.filter(a => a.authorId === id)).pipe(delay(300));
}

export function findBookById(id: number): Observable<Book> {
  return of(data.filter(a => a.id === id)[0]).pipe(delay(300));
}

export function deleteBook(id: number): Observable<void> {
  data = data.filter(elem => elem.id !== id);
  return of(void 0);
}

const initialData: Book[] = [
  {
    id: 1,
    title: "The Final Empire",
    firstPublished: DateTime.local(2006, 7, 17),
    series: "The Mistborn Saga",
    numberWithinSeries: 1,
    genre: "Fantasy Fiction",

    authorId: 1,

    description: "For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the \"Sliver of Infinity,\" reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler's most hellish prison. Kelsier \"snapped\" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.\n" +
      "\n" +
      "Kelsier recruited the underworld's elite, the smartest and most trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a high-stakes challenge. Then Kelsier reveals his ultimate dream, not just the greatest heist in history, but the downfall of the divine despot.\n" +
      "\n" +
      "But even with the best criminal crew ever assembled, Kel's plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into his life. Like him, she's a half-Skaa orphan, but she's lived a much harsher life. Vin has learned to expect betrayal from everyone she meets. She will have to learn trust if Kel is to help her master powers of which she never dreamed.\n" +
      "\n" +
      "Brandon Sanderson, fantasy's newest master tale-spinner and Book of the acclaimed debut Elantris, dares to turn a genre on its head by asking a simple question: What if the prophesied hero failed to defeat the Dark Lord? The answer will be found in the Misborn Trilogy, a saga of surprises that begins with the book in your hands. Fantasy will never be the same again.",
    image: mistbornCover1
  },
  {
    id: 2,
    title: "The Well of Ascension",
    firstPublished: DateTime.local(2007, 8, 21),
    series: "The Mistborn Saga",
    numberWithinSeries: 2,
    genre: "Fantasy Fiction",

    authorId: 1,

    description: "The impossible has been accomplished. The Lord Ruler—the man who claimed to be god incarnate and brutally ruled the world for a thousand years—has been vanquished. But Kelsier, the hero who masterminded that triumph, is dead too, and now the awesome task of building a new world has been left to his young protégé, Vin, the former street urchin who is now the most powerful Mistborn in the land, and to the idealistic young nobleman she loves.\n" +
      "\n" +
      "As Kelsier's protégé and slayer of the Lord Ruler she is now venerated by a budding new religion, a distinction that makes her intensely uncomfortable. Even more worrying, the mists have begun behaving strangely since the Lord Ruler died, and seem to harbor a strange vaporous entity that haunts her.\n" +
      "\n" +
      "Stopping assassins may keep Vin's Mistborn skills sharp, but it's the least of her problems. Luthadel, the largest city of the former empire, doesn't run itself, and Vin and the other members of Kelsier's crew, who lead the revolution, must learn a whole new set of practical and political skills to help. It certainly won't get easier with three armies - one of them composed of ferocious giants - now vying to conquer the city, and no sign of the Lord Ruler's hidden cache of atium, the rarest and most powerful allomantic metal.\n" +
      "\n" +
      "As the siege of Luthadel tightens, an ancient legend seems to offer a glimmer of hope. But even if it really exists, no one knows where to find the Well of Ascension or what manner of power it bestows.",
    image: mistbornCover2
  },
  {
    id: 3,
    title: "The Hero of Ages",
    firstPublished: DateTime.local(2008, 10, 14),
    series: "The Mistborn Saga",
    numberWithinSeries: 3,
    genre: "Fantasy Fiction",

    authorId: 1,

    description: "To end the Final Empire and restore freedom, Vin killed the Lord Ruler. But as a result, the Deepness—the lethal form of the ubiquitous mists—is back, along with increasingly heavy ashfalls and ever more powerful earthquakes. Humanity appears to be doomed.\n" +
      "\n" +
      "Having escaped death at the climax of The Well of Ascension only by becoming a Mistborn himself, Emperor Elend Venture hopes to find clues left behind by the Lord Ruler that will allow him to save the world. Vin is consumed with guilt at having been tricked into releasing the mystic force known as Ruin from the Well. Ruin wants to end the world, and its near omniscience and ability to warp reality make stopping it seem impossible. Vin can't even discuss it with Elend lest Ruin learn their plans!",
    image: mistbornCover3
  },
  {
    id: 4,
    title: "The Gunslinger",
    firstPublished: DateTime.local(1982, 7, 1),
    series: "The Dark Tower",
    numberWithinSeries: 1,
    genre: "Fantasy Fiction",

    authorId: 2,

    description: "In the first book of this brilliant series, Stephen King introduces readers to one of his most enigmatic heroes, Roland of Gilead, The Last Gunslinger. He is a haunting figure, a loner on a spellbinding journey into good and evil. In his desolate world, which frighteningly mirrors our own, Roland pursues The Man in Black, encounters an alluring woman named Alice, and begins a friendship with the Kid from Earth called Jake. Both grippingly realistic and eerily dreamlike, The Gunslinger leaves readers eagerly awaiting the next chapter.",
    image: gunslingerCover
  },
  {
    id: 5,
    title: "11/22/63",
    firstPublished: DateTime.local(2011, 11, 8),
    genre: "Fiction Historical Fiction Science Fiction Time Travel",

    authorId: 2,

    description: "On November 22, 1963, three shots rang out in Dallas, President Kennedy died, and the world changed. What if you could change it back? Stephen King’s heart-stoppingly dramatic new novel is about a man who travels back in time to prevent the JFK assassination—a thousand page tour de force. Following his massively successful novel Under the Dome, <strong>King sweeps</strong> readers back in time to another moment—a real life moment—when everything went wrong: the JFK assassination. And he introduces readers to a character who has the power to change the course of history.\n" +
      "\n" +
      "Jake Epping is a thirty-five-year-old high school English teacher in Lisbon Falls, Maine, who makes extra money teaching adults in the GED program. He receives an essay from one of the students—a gruesome, harrowing first person story about the night 50 years ago when Harry Dunning’s father came home and killed his mother, his sister, and his brother with a hammer. Harry escaped with a smashed leg, as evidenced by his crooked walk. Not much later, Jake’s friend Al, who runs the local diner, divulges a secret: his storeroom is a portal to 1958. He enlists Jake on an insane—and insanely possible—mission to try to prevent the Kennedy assassination.\n" +
      "\n" +
      "So begins Jake’s new life as George Amberson and his new world of Elvis and JFK, of big American cars and sock hops, of a troubled loner named Lee Harvey Oswald and a beautiful high school librarian named Sadie Dunhill, who becomes the love of Jake’s life—a life that transgresses all the normal rules of time.",
    image: king112263cover
  },
  {
    id: 6,
    title: "The Shining",
    firstPublished: DateTime.local(2008, 10, 14),
    series: "The Shining",
    numberWithinSeries: 1,
    genre: "Horror Fiction Thriller",

    authorId: 2,

    description: "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he'll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote...and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old.",
    image: shiningCover
  },
  {
    id: 7,
    title: "On Writing: A Memoir of the Craft",
    firstPublished: DateTime.local(2000, 1, 1),
    genre: "Nonfiction Writing Memoir Biography",

    authorId: 2,

    description: "\"Long live the King\" hailed Entertainment Weekly upon the publication of Stephen King's On Writing. Part memoir, part master class by one of the bestselling authors of all time, this superb volume is a revealing and practical view of the writer's craft, comprising the basic tools of the trade every writer must have. King's advice is grounded in his vivid memories from childhood through his emergence as a writer, from his struggling early career to his widely reported near-fatal accident in 1999 -- and how the inextricable link between writing and living spurred his recovery. Brilliantly structured, friendly and inspiring, On Writing will empower and entertain everyone who reads it -- fans, writers, and anyone who loves a great story well told.",
    image: getDefaultBookCover()
  },
  {
    id: 8,
    title: "Interview with the Vampire ",
    firstPublished: DateTime.local(2008, 10, 14),
    series: "The Vampire Chronicles",
    numberWithinSeries: 1,
    genre: "Horror Fiction Vampires Fantasy",

    authorId: 3,

    description: "This is the story of Louis, as told in his own words, of his journey through mortal and immortal life. Louis recounts how he became a vampire at the hands of the radiant and sinister Lestat and how he became indoctrinated, unwillingly, into the vampire way of life. His story ebbs and flows through the streets of New Orleans, defining crucial moments such as his discovery of the exquisite lost young child Claudia, wanting not to hurt but to comfort her with the last breaths of humanity he has inside. Yet, he makes Claudia a vampire, trapping her womanly passion, will, and intelligence inside the body of a small child. Louis and Claudia form a seemingly unbreakable alliance and even \"settle down\" for a while in the opulent French Quarter. Louis remembers Claudia's struggle to understand herself and the hatred they both have for Lestat that sends them halfway across the world to seek others of their kind. Louis and Claudia are desperate to find somewhere they belong, to find others who understand, and someone who knows what and why they are.\n" +
      "\n" +
      "Louis and Claudia travel Europe, eventually coming to Paris and the ragingly successful Theatre des Vampires--a theatre of vampires pretending to be mortals pretending to be vampires. Here they meet the magnetic and ethereal Armand, who brings them into a whole society of vampires. But Louis and Claudia find that finding others like themselves provides no easy answers and in fact presents dangers they scarcely imagined.\n" +
      "\n" +
      "Originally begun as a short story, the book took off as Anne wrote it, spinning the tragic and triumphant life experiences of a soul. As well as the struggles of its characters, Interview captures the political and social changes of two continents. The novel also introduces Lestat, Anne's most enduring character, a heady mixture of attraction and revulsion. The book, full of lush description, centers on the themes of immortality, change, loss, sexuality, and power.",
    image: getDefaultBookCover()
  }
];
let data = [...initialData];
