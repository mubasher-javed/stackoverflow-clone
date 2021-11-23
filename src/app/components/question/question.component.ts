import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  @Input() totalAnswers!: number;
  @Input() title!: string;
  @Input() tags!: string[];
  @Input() text!: string;
  @Input() views!: string | number;
  @Input() votes!: string | number;

  constructor() {}

  ngOnInit(): void {}
}
