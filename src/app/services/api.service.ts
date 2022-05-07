import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, Subject, from } from 'rxjs';
import { catchError, retry, map, tap} from 'rxjs/operators';

@Injectable(
  // { providedIn: 'root' }
)
export class ApiService {

  private URL: string = 'https://api.hatchways.io/assessment/sentences';
  private sentenceSubject = new BehaviorSubject('');
  originalSentence$ = this.sentenceSubject.asObservable();

  constructor(
  ) {}

  async get(counter: number): Promise<any> {
    try {
      const response = await fetch(`${this.URL}/${counter}`)
      const result = await response.json()
      this.sentenceSubject.next(result.data.sentence);
    } catch(error) {
      console.log('error: ',error)
    }

  }


}
