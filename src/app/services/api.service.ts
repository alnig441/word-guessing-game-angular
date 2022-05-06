import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

@Injectable(
  // { providedIn: 'root' }
)
export class ApiService {

  constructor(
  ) {}

  async getStudents(): Promise<any> {
    const response = await fetch('https://api.hatchways.io/assessment/students')
    const data = await response.json()
    const population = data.students;
    console.log(population)
  }

}
