import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      category: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      estimatedTime: new FormControl(1, Validators.required),
      estimationUnit: new FormControl(1, Validators.required),
      importance: new FormControl(1, Validators.required),
      status: new FormControl(0)
    })
  }

  ngOnInit(): void {
  }

  @ViewChild('sidebarRef') sidebarRef!: ElementRef<HTMLDivElement>;
  visible = false;

  importance = Importance;
  unit = Unit;
  addForm: FormGroup;

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
    const task: any = {
      title: this.addForm.get('title')?.value,
      category: this.addForm.get('category')?.value,
      dueDate: this.addForm.get('dueDate')?.value,
      estimatedTime: this.addForm.get('estimatedTime')?.value,
      estimationUnit: this.addForm.get('estimationUnit')?.value,
      importance: this.addForm.get('importance')?.value,
    }
    console.log(task)
    // this.taskService.addTask(task).subscribe(response => console.log(response));
  }
}
