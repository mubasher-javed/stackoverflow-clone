import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { Question, QuestionResponse } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  URL = config.API_URL + 'questions';
  headers = new HttpHeaders().append(
    'x-auth-token',
    localStorage.getItem('token') || ''
  );
  constructor(private http: HttpClient) {}

  createQuestion(data: Question) {
    return this.http.post(this.URL, data, { headers: this.headers });
  }

  listQuestion() {
    return this.http.get<QuestionResponse[]>(this.URL);
  }
}
