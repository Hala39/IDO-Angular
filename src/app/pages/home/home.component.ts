import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Status } from 'src/app/entities/stage';
import { Task } from 'src/app/entities/task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private taskService: TaskService) { 
    this.getTasks();
  }

  status = {
    TODO: 0,
    DOING: 1,
    DONE: 2

  };

  statusKeys() : Array<string> {
    var keys = Object.keys(this.status);
    return keys.slice(keys.length / 2);
  }

  getTasks() {
    this.taskService.getTasks().subscribe((response: any) => {
      this.sets.push(response.filter((t: any) => t.status === 0));
      this.sets.push(response.filter((t: any) => t.status === 1));
      this.sets.push(response.filter((t: any) => t.status === 2));
      // this.toDos = response.filter((t: any) => t.status === 0);
      // this.doings = response.filter((t: any) => t.status === 1);
      // this.dones = response.filter((t: any) => t.status === 2);
      this.tasksCount = response.length;
    });
  }

  ngOnInit(): void {
  }

  sets: Task[][] = [];

  @ViewChild('searchBoxRef') searchBoxRef!: ElementRef<HTMLDivElement>;
  @ViewChild('searchIconRef') searchIconRef!: ElementRef<HTMLDivElement>;

  @ViewChild('quoteRef') quoteRef!: ElementRef<HTMLDivElement>;
  @ViewChild('removeIconRef') removeIconRef!: ElementRef<HTMLImageElement>;

  @ViewChild('overlayRef') overlayRef!: ElementRef<HTMLDivElement>;

  overlay = false;
  searchKey: string = '';
  task!: Task;
  tasksCount: number = 0;
  fill = false;

  logout() {
    this.authService.logout();
  }

  @HostListener('document:mouseover', ['$event']) 
  hideSearchBox($event: any) {
    if (!this.quoteRef.nativeElement.contains($event.target)) {
      this.removeIconRef.nativeElement.style.display = 'none';
    }
  }

  drop(event: CdkDragDrop<Task[]>, target: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0,
      );
      this.taskService.updateTaskStatus({
          taskId: event.container.data[event.currentIndex].id, targetStatusIndex: target
        }).subscribe((response => {
          if (response) this.sets[target].splice(event.currentIndex, 1, response);
        }));
      
    }
  }

  email: string | null = localStorage.getItem('email');

  addTask($event: Task) {
    this.sets[0].unshift($event);
    this.fill = false;
  }

  editTask($event: Task, status: number) {
    let index = this.sets[status].findIndex(t => t.id === $event.id);
    this.sets[status].splice(index, 1, $event);
  }

}