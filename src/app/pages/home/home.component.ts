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
    this.taskService.getTasks().subscribe((response: any) => {
      this.toDos = response.filter((t: any) => t.status.toString() === 'TODO');
      this.doings = response.filter((t: any) => t.status.toString() === 'DOING');
      this.dones = response.filter((t: any) => t.status.toString() === 'DONE');
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
        }).subscribe((response => console.log(response)));
      
    }

    console.log(event.container.data[event.currentIndex].id)
  }

  email: string | null = localStorage.getItem('email');
}
