import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/entities/task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public tasks$: Observable<Task[]>;

  constructor(private authService: AuthService, private taskService: TaskService) { 
    this.taskService.getTasks().subscribe();
    this.tasks$ = this.taskService.tasks$;
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

  tasks: Task[] = []

  toDos = this.tasks.filter(t => t.status === 0);
  doings = this.tasks.filter(t => t.status === 1);
  dones = this.tasks.filter(t => t.status === 2);

  logout() {
    this.authService.logout();
  }

  @HostListener('document:mouseover', ['$event']) 
  hideSearchBox($event: any) {
    if (!this.quoteRef.nativeElement.contains($event.target)) {
      this.removeIconRef.nativeElement.style.display = 'none';
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  email: string | null = localStorage.getItem('email');
}
