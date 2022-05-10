import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, Subject, from } from 'rxjs';
import { catchError, retry, map, tap, connect} from 'rxjs/operators';

@Injectable(
  // { providedIn: 'root' }
)
export class ApiService {

  private URL: string = 'https://api.hatchways.io/assessment/sentences';
  private sentenceSubject = new BehaviorSubject('');
  originalSentence$ = this.sentenceSubject.asObservable();

  testSentence$ : Observable<any> = new Observable();
  private subscribers : number = 0;

  constructor(
    private http: HttpClient
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

  getAlternative(counter: number): void {
    console.log('getting sentence: ', counter)
    let endPoint = `${this.URL}/${counter}`;
    this.testSentence$ = this.http.request('GET', endPoint, {responseType:'json'})
      .pipe(
        tap(
          {
          subscribe: () => {
            this.subscribers ++;
            console.log('total subscribers: ', this.subscribers)
          },
          next: (n : any) => console.log('next value: ', n)
          }
        )
      )
      .pipe(
        connect(
          shared$ =>
            shared$.pipe(map(n => n.data.sentence)),
        )
      )
  }


}
