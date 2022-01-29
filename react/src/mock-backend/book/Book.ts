import {DateTime} from 'luxon';

export interface Book {
  id: number,
  title: string,
  subtitle?: string,
  firstPublished: DateTime,
  series?: string,
  numberWithinSeries?: number,
  genre: string,

  authorId: number,

  description: string,
  image: Blob
}
