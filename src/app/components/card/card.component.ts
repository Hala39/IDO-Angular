import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Importance } from 'src/app/entities/importance';
import { Task } from 'src/app/entities/task';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('keyword') keyword: string = '';
  @Input('task') task: Task | null = null;

  @ViewChild('host') host!: ElementRef<HTMLDivElement>;
  @ViewChild('titleRef') titleRef!: ElementRef<HTMLDivElement>;

  importance = Importance;
  editMode = false;

  save() {
    this.editMode = false;
  }

  changePriority($event: any) {

  }

  @HostListener('document:click', ['$event'])
  escapeEditMode($event: any) {
    if (!this.titleRef.nativeElement.contains($event.target)) {
      this.editMode = false;
    }
  }

}
