import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/entities/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('searchBoxRef') searchBoxRef!: ElementRef<HTMLDivElement>;
  @ViewChild('searchIconRef') searchIconRef!: ElementRef<HTMLDivElement>;

  @ViewChild('quoteRef') quoteRef!: ElementRef<HTMLDivElement>;
  @ViewChild('removeIconRef') removeIconRef!: ElementRef<HTMLImageElement>;

  @ViewChild('overlayRef') overlayRef!: ElementRef<HTMLDivElement>;

  overlay = false;

  tasks: Task[] = [
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 1,
      importance: 2
    },
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 1,
      importance: 1
    },
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 1,
      importance: 1
    },
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 2,
      importance: 1
    },
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 0,
      importance: 2
    },
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 0,
      importance: 0
    },
    {
      title: 'A title',
      dueDate: new Date(),
      estimate: '3 hours',
      date: new Date(2020, 5, 6),
      category: 'Work',
      stage: 0,
      importance: 1
    },
  ]

  @HostListener('document:mouseover', ['$event']) 
  hideSearchBox($event: any) {
    if (!this.searchBoxRef.nativeElement.contains($event.target) 
      && !this.searchIconRef.nativeElement.contains($event.target)) {
      this.searchBoxRef.nativeElement.style.display = 'none';
      this.searchIconRef.nativeElement.style.display = 'block';
    }

    if (!this.quoteRef.nativeElement.contains($event.target)) {
      this.removeIconRef.nativeElement.style.display = 'none';
    }
  }

  @HostListener('document:click', ['$event'])
  hideOverlay($event: any) {
    if (
        this.overlay 
        && !this.overlayRef.nativeElement.contains($event.target)
        && !$event.target.classList.contains('avatar')
        ) {
      this.overlay = false;
    }
  }
}
