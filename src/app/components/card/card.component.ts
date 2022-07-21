import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  @Input('task') task: Task | null = null;

  importance = Importance;

  keys() : string[] {
    var keys = Object.keys(this.importance);
    return keys.slice(keys.length / 2);
  }

  changePriority($event: any) {

  }
}
