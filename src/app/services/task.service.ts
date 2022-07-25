import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../entities/result';
import { Task } from '../entities/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = environment.apiUrl + 'task/';

  private tasksSource = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getTasks() {
    return this.httpClient.get<Result<Task[]>>(this.baseUrl).pipe(
      map((response: Result<Task[]>) => {
        if (response.value)
          this.tasksSource.next(response.value);
        if (!response.isSuccess) {
          console.log(response.error)
        }

        console.log(response)
      })
    )
  }

  getTaskById(id: number) {
    return this.httpClient.get<Result<Task>>(this.baseUrl + id.toString()).pipe(
      map((response: Result<Task>) => {
        if (!response.isSuccess) {
          console.log(response.error)
        }
      })
    );
  }

  addTask(task: Task) {
    return this.httpClient.post<Result<Task>>(this.baseUrl, task).pipe(
      map((response: Result<Task>) => {
        if (response.value) 
          this.tasksSource.next([...this.tasksSource.value, response.value]);

        if (!response.isSuccess) {
          console.log(response.error)
        }
      })
    );
  }

  updateTaskTitle(params: {id: number, title: string}) {
    return this.httpClient.put<Result<Task>>(this.baseUrl, params).pipe(
      map((response: Result<Task>) => {
        if (response.value) 
          this.tasksSource
            .next([...this.tasksSource.value.filter(t => t.id !== params.id), response.value]);
        
        if (!response.isSuccess) {
          console.log(response.error)
        }
      })
    );
  }
}
