import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Question } from 'src/app/interfaces/question.interface';
import { QuestionService } from 'src/app/services/question.service';

export interface Tag {
  name: string;
}
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  maxReached = false;
  questionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  handleSubmit() {
    const tagNames: string[] = [];
    this.tags.forEach((tag) => tagNames.push(tag.name));
    const formData: Question = { ...this.questionForm.value, tags: tagNames };

    this.questionService.createQuestion(formData).subscribe(
      (res) => {
        console.log('server response is', res);
        // todo: if saved then redirect him to /questions page
      },
      (err) => {
        console.log('error from server is', err);
        // todo: show these error to client
      }
    );
  }

  addTag(event: MatChipInputEvent): void {
    if (this.tags.length === 4) {
      this.maxReached = true;
    }

    const value = (event.value || '').trim();
    if (value) {
      this.tags.push({ name: value });
    }
    event.chipInput!.clear();
  }

  removeTag(tag: Tag): void {
    if (this.tags.length < 4) {
      console.log('length is', this.tags.length);
      this.maxReached = false;
    }

    const index = this.tags.indexOf(tag);

    if (index >= 0) this.tags.splice(index, 1);
  }
}
