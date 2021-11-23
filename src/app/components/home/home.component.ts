import { Component, OnInit } from '@angular/core';
import { QuestionResponse } from 'src/app/interfaces/question.interface';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allQuestions: QuestionResponse[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.listQuestion().subscribe((questions) => {
      this.allQuestions = questions;
    });
  }
}
