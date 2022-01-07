import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authentication$ = new BehaviorSubject("your-username");

  constructor() { }
}
