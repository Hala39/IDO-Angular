import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Importance } from 'src/app/entities/importance';
import { Unit } from 'src/app/entities/unit';
import { sidebarAnimations } from 'src/app/helpers/sidebar.animation';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimations]
})
export class SidebarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private taskService: TaskService) { 
    this.addForm = new FormGroup({
      category: new FormControl(null),
      title: new FormControl(null),
      dueDate: new FormControl(null),
      estimatedTime: new FormControl(1),
      estimationUnit: new FormControl(1),
      importance: new FormControl(1),
      status: new FormControl(0)
    })
  }

  ngOnInit(): void {
  }

  @ViewChild('sidebarRef') sidebarRef!: ElementRef<HTMLDivElement>;
  @Output('taskAdded') taskAddedEmitter = new EventEmitter();

  visible = false;
  today = new Date();
  minDate: string = `${this.today.getFullYear()}-${this.formatMonth(this.today.getMonth())}-${this.today.getDate()}`;

  formatMonth(month: number) : string {
    return month + 1 < 10 ? `0${month + 1}` : (month + 1).toString();
  }

  importance = Importance;
  unit = Unit;
  addForm: FormGroup;
  minlength = 3;

  importanceKeys() : Array<string> {
    var keys = Object.keys(this.importance);
    return keys.slice(keys.length / 2);
  }

  unitKeys() : Array<string> {
    var keys = Object.keys(this.unit);
    return keys.slice(keys.length / 2);
  }

  open() {
    this.document.getElementById('body')?.classList.add('block-scroll');
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.document.getElementById('body')?.classList.remove('block-scroll');
  }

  addTask() {
    if (this.addForm.valid) {
      this.taskService.addTask(this.addForm.value).subscribe(response => {
        if (response) {
          this.taskAddedEmitter.emit(response);
          this.visible = false;
          this.addForm.get('title')?.reset();
          this.addForm.get('category')?.reset();
          this.addForm.get('dueDate')?.reset();
        }; 
      });
    }
  }
}
