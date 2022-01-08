import {DateTime} from 'luxon';
import {delay, Observable, of} from 'rxjs';
import {Book} from './Book';
import {getDefaultBookCover} from '../author/default-fotos';

const initialData: Book[] = [
  {
    id: 1,
    title: "The Final Empire",
    firstPublished: DateTime.local(2020, 7, 17),
    series: "The Mistborn Saga",
    numberWithinSeries: 1,
    genre: "Fantasy Fiction",

    authorFullName: "Brandon Sanderson",
    authorId: 1,

    description: "For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in misery and lived in fear. For a thousand years the Lord Ruler, the \"Sliver of Infinity,\" reigned with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the depths of the Lord Ruler's most hellish prison. Kelsier \"snapped\" and found in himself the powers of a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with the Lord Ruler himself as the mark.\n" +
        "\n" +
        "Kelsier recruited the underworld's elite, the smartest and most trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a high-stakes challenge. Then Kelsier reveals his ultimate dream, not just the greatest heist in history, but the downfall of the divine despot.\n" +
        "\n" +
        "But even with the best criminal crew ever assembled, Kel's plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into his life. Like him, she's a half-Skaa orphan, but she's lived a much harsher life. Vin has learned to expect betrayal from everyone she meets. She will have to learn trust if Kel is to help her master powers of which she never dreamed.\n" +
        "\n" +
        "Brandon Sanderson, fantasy's newest master tale-spinner and Book of the acclaimed debut Elantris, dares to turn a genre on its head by asking a simple question: What if the prophesied hero failed to defeat the Dark Lord? The answer will be found in the Misborn Trilogy, a saga of surprises that begins with the book in your hands. Fantasy will never be the same again.",
    image: getDefaultBookCover()
  }]


let data = [...initialData];

export function createOrUpdateBook(newElement: Book): Observable<Book> {
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

export function findAllBooks(): Observable<Book[]> {
  return of(data).pipe(delay(300));
}

export function findBookById(id: number): Observable<Book> {
  return of(data.filter(a => a.id === id)[0]).pipe(delay(300));
}

export function deleteBook(id: number): Observable<void> {
  data = data.filter(elem => elem.id !== id);
  return of(void 0);
}
