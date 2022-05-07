import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.css']
})
export class SentenceComponent implements OnInit {

  sentence: string = '';

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.originalSentence$.subscribe(value => this.sentence = value);
  }



}
