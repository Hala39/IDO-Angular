import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/entities/task';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  @ViewChild('searchBoxRef') searchBoxRef!: ElementRef<HTMLDivElement>;
  @ViewChild('searchIconRef') searchIconRef!: ElementRef<HTMLDivElement>;

  @ViewChild('quoteRef') quoteRef!: ElementRef<HTMLDivElement>;
  @ViewChild('removeIconRef') removeIconRef!: ElementRef<HTMLImageElement>;

  @ViewChild('overlayRef') overlayRef!: ElementRef<HTMLDivElement>;

  overlay = false;
  searchKey: string = '';
  results: Task[] = [];

  tasks: Task[] = [
    {
      title: 'First Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 1,
      importance: 2
    },
    {
      title: 'Second Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 1,
      importance: 1
    },
    {
      title: 'Third Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 1,
      importance: 1
    },
    {
      title: 'Fourth Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 2,
      importance: 1
    },
    {
      title: 'Fifth Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 0,
      importance: 2
    },
    {
      title: 'Sixth Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 0,
      importance: 0
    },
    {
      title: 'Seventh Task',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      status: 0,
      importance: 1
    },
  ]

  toDos = this.tasks.filter(t => t.status === 0);
  doings = this.tasks.filter(t => t.status === 1);
  dones = this.tasks.filter(t => t.status === 2);

  logout() {
    this.authService.logout();
  }

  search() {
    if (this.searchKey.length > 0)
      this.results = this.tasks.filter(t => t.title.toLowerCase().includes(this.searchKey.toLowerCase()));
    else this.results = [];
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

}
