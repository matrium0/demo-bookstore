import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class YourBooksStateService {

  showIntroductionMessage = new BehaviorSubject(true);

  constructor() { }
}
