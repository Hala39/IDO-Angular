import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Importance } from 'src/app/entities/importance';
import { units } from 'src/app/entities/units';
import { sidebarAnimations } from 'src/app/helpers/sidebar.animation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [sidebarAnimations]
})
export class SidebarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.addForm = new FormGroup({
      category: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      estimateNumber: new FormControl(1, Validators.required),
      estimateUnit: new FormControl(1, Validators.required),
      importance: new FormControl(1, Validators.required),
      status: new FormControl(0)
    })
  }

  ngOnInit(): void {
  }

  @ViewChild('sidebarRef') sidebarRef!: ElementRef<HTMLDivElement>;
  visible = false;

  importance = Importance;
  units = units;

  addForm: FormGroup;

  keys() : Array<string> {
    var keys = Object.keys(this.importance);
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
    console.log(this.addForm.value)
  }
}
