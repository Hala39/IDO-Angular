import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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

  getTasks() {
    this.taskService.getTasks().subscribe((response: any) => {
      this.toDos = response.filter((t: any) => t.status === 0);
      this.doings = response.filter((t: any) => t.status === 1);
      this.dones = response.filter((t: any) => t.status === 2);
      this.tasksCount = response.length;
    });
  }

  ngOnInit(): void {
  }

  @ViewChild('searchBoxRef') searchBoxRef!: ElementRef<HTMLDivElement>;
  @ViewChild('searchIconRef') searchIconRef!: ElementRef<HTMLDivElement>;

  @ViewChild('quoteRef') quoteRef!: ElementRef<HTMLDivElement>;
  @ViewChild('removeIconRef') removeIconRef!: ElementRef<HTMLImageElement>;

  @ViewChild('overlayRef') overlayRef!: ElementRef<HTMLDivElement>;

  overlay = false;
  searchKey: string = '';

  toDos!: Task[];
  doings!:  Task[];
  dones!:  Task[];
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
        event.currentIndex,
      );

        this.taskService.updateTaskStatus({
          taskId: event.container.data[event.currentIndex].id, targetStatusIndex: target
        }).subscribe((response => {
          this.getTasks();
        }));
      
    }
  }

  email: string | null = localStorage.getItem('email');

  addTask($event: Task) {
    this.toDos.unshift($event);
    this.fill = false;
  }

  focusedTask!: Task;

  editTask($event: Task, status: number) {
    let index: any;
    switch (status) {
      case 0:
        index = this.toDos.findIndex(t => t.id === $event.id);
        this.toDos.splice(index, 1, $event);
        break;
      case 1: 
        index = this.doings.findIndex(t => t.id === $event.id);
        this.doings.splice(index, 1, $event);
        break;
      case 2:
        index = this.dones.findIndex(t => t.id === $event.id);
        this.dones.splice(index, 1, $event);
        break;
      default:
        break;
    }
  }

}
