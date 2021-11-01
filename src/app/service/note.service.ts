import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  example(){
      return 'Hello World!';
  }
}
