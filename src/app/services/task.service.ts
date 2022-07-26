import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../entities/result';
import { Status } from '../entities/stage';
import { Task } from '../entities/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = environment.apiUrl + 'task/';
  
  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<Result<Task[]>>(this.baseUrl).pipe(
      map((response: Result<Task[]>) => {
        if (!response.isSuccess) {
          console.log(response.error)
        }
          return response.value;
      })
    )
  }

  getTaskById(id: number) {
    return this.httpClient.get<Result<Task>>(this.baseUrl + id.toString()).pipe(
      map((response: Result<Task>) => {
        if (!response.isSuccess) {
          console.log(response.error)
        }
        return response.value;
      })
    );
  }

  addTask(task: Task) {
    return this.httpClient.post<Result<Task>>(this.baseUrl, task).pipe(
      map((response: Result<Task>) => {
        if (!response.isSuccess) {
          console.log(response.error)
        }
          return response.value;
      })
    );
  }

  updateTaskTitle(params: {id: number, title: string, status: Status}) {
    return this.httpClient.put<Result<Task>>(this.baseUrl, params).pipe(
      map((response: Result<Task>) => {
        if (!response.isSuccess) {
          console.log(response.error)
        }
          return response.value;
      })
    );
  }

  updateTaskStatus(params: {taskId: number, targetStatusIndex: number}) {
    return this.httpClient.put<Result<Task>>(this.baseUrl + 'status', params).pipe(
      map((response: Result<Task>) => {
        if (!response.isSuccess) {
          console.log(response.error)
        }
          return response.value;
      })
    )
  }

}


