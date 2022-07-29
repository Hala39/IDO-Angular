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

  status = ["ToDo", "Doing", "Done"]

  getTasks() {
    this.taskService.getTasks().subscribe((response: any) => {
      this.sets.push(response.filter((t: any) => t.status === 0));
      this.sets.push(response.filter((t: any) => t.status === 1));
      this.sets.push(response.filter((t: any) => t.status === 2));
      this.tasksCount = response.length;
    });
  }

  ngOnInit(): void {
  }

  sets: Task[][] = [];

  @ViewChild('searchBoxRef') searchBoxRef!: ElementRef<HTMLDivElement>;

  @ViewChild('quoteRef') quoteRef!: ElementRef<HTMLDivElement>;
  @ViewChild('removeIconRef') removeIconRef!: ElementRef<HTMLImageElement>;

  @ViewChild('overlayRef') overlayRef!: ElementRef<HTMLDivElement>;

  overlay = false;
  searchKey: string = '';
  tasksCount: number = 0;
  fill = false;
  showQuote = true;
  focusedItemId: number | null = null;

  @HostListener('document:mouseover', ['$event']) 
  hideQuoteRemover($event: any) {
    if (this.showQuote && !this.quoteRef.nativeElement.contains($event.target)) {
      this.removeIconRef.nativeElement.style.display = 'none';
    }
  }

  drop(event: CdkDragDrop<Task[]>, target: number) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0,
      );
      this.taskService.updateTaskStatus({
          taskId: event.container.data[0].id, targetStatusIndex: target
        }).subscribe((response => {
          console.log(event.container.data[0].title)
          if (response) this.sets[target].splice(0, 1, response);
      }));
      
    }
  }

  addTask($event: Task) {
    this.sets[0].unshift($event);
    this.fill = false;
  }

  editTask($event: Task, status: number) {
    if ($event) {
      let index = this.sets[status].findIndex(t => t.id === $event.id);
      this.sets[status].splice(index, 1, $event);
    } 
  }

  email: string | null = localStorage.getItem('email');
  logout() {
    this.authService.logout();
  }
}