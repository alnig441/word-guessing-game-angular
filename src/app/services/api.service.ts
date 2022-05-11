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

  private errorSubject = new Subject();
  error$ = this.errorSubject.asObservable();

  testSentence$ : Observable<any> = new Observable();
  private subscribers : number = 0;

  constructor(
    private http: HttpClient
  ) {}

  get(counter: number): void {
    let endPoint =`${this.URL}/${counter}`;

    this.http.request('GET', endPoint, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          this.sentenceSubject.next(response.data.sentence)
        },
        (error: any) => {
          this.errorSubject.next({ status: error.status, message: error.error.error})
        }
      )

    return;
  }


}
