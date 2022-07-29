import { DatePipe } from '@angular/common';
import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  HostListener, 
  Input, 
  OnChanges, 
  OnInit, 
  Output, 
  SimpleChanges, 
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Importance } from 'src/app/entities/importance';
import { Task } from 'src/app/entities/task';
import { MaxLengthPipe } from 'src/app/helpers/maxlength.pipe';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [DatePipe, MaxLengthPipe]
})
export class CardComponent implements OnInit, OnChanges {

  constructor(
    private datePipe: DatePipe,
    private maxLengthPipe: MaxLengthPipe, 
    private taskService: TaskService) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    let task = changes['task']?.currentValue;
    this.addForm = new FormGroup({
      title: new FormControl(task ? task.title : null, [Validators.required, Validators.maxLength(500)]),
      category: new FormControl(task ? task.category : null, Validators.maxLength(50)),
      dueDate: new FormControl(task ? this.datePipe.transform(task.dueDate, 'yyyy-MM-dd') : null),
      estimatedTime: new FormControl(task ? task.estimatedTime : 1),
      estimationUnit: new FormControl(task ? task.estimationUnit : 'hour', Validators.maxLength(20)),
      importance: new FormControl(task? task.importance : 0),
      status: new FormControl(task? task.status : 0)
    });
    if (task) this.id.patchValue(task.id); 
  }

  ngOnInit(): void {
    this.addForm.controls['estimatedTime'].valueChanges.subscribe(value => {
      if (value < 0)
        this.addForm.get('estimatedTime')?.patchValue(1)
    })
    this.addForm.controls['title'].valueChanges.subscribe(value => {
      this.addForm.get('title')?.patchValue(this.maxLengthPipe.transform(value, 500))
    })
    this.addForm.controls['category'].valueChanges.subscribe(value => {
      this.addForm.get('category')?.patchValue(this.maxLengthPipe.transform(value, 50))
    })
    this.addForm.controls['estimationUnit'].valueChanges.subscribe(value => {
      this.addForm.get('estimationUnit')?.patchValue(this.maxLengthPipe.transform(value, 20))
    })
  }

  resize($event: any) {
    this.textareaRef.nativeElement.style.height = 'auto';
    this.textareaRef.nativeElement.style.height = $event.target.scrollHeight + 'px';
  }
  id = new FormControl();

  @Input('keyword') keyword: string = '';
  @Input('task') task!: Task;
  @Input('editMode') editMode = false;
  @Input('add') add = false;
  @Output('onItemChanged') onItemChanged = new EventEmitter();

  @ViewChild('host') host!: ElementRef<HTMLDivElement>;
  @ViewChild('addCardRef') addCardRef!: ElementRef<HTMLDivElement>;
  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

  @Output('onFocus') onFocus = new EventEmitter();

  importance = Importance;
  addForm!: FormGroup;

  importanceKeys() : Array<string> {
    var keys = Object.keys(this.importance);
    return keys.slice(keys.length / 2);
  }

  changeTask() {
    if (this.addForm.valid) {
      let importance = +this.addForm.get('importance')?.value;
      this.addForm.get('importance')?.patchValue(importance);
      
      if (this.add) 
        this.taskService.addTask(this.addForm.value).subscribe(response => {
          this.onItemChanged.emit(response);
          this.editMode = false;
      });

      else {
        this.addForm.addControl('id', this.id);
        this.addForm.get('dueDate')?.patchValue(this.task.dueDate)
        this.taskService.updateTaskTitle(this.addForm.value).subscribe(response => {
          this.editMode = false;
          this.onItemChanged.emit(response);
        })
      }
      
    } 
  }

  editModeOn() {
    this.editMode = true;
    this.onFocus.emit(this.task.id)
  }

  @HostListener('document:click', ['$event'])
  change($event: any) {
    if (this.editMode 
      && !this.addCardRef?.nativeElement.contains($event.target) 
      && this.addForm.dirty) {
        this.changeTask();
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  blurOnRightClick($event: any) {
    if (this.editMode && !this.addCardRef?.nativeElement.contains($event.target) 
    && !this.addForm.dirty) {
      this.onFocus.emit(null);
    }
  }
  
  @HostListener('document:keydown.enter', ['$event'])
  save($event: any) {
    if (this.editMode 
      && this.addCardRef?.nativeElement.contains($event.target) 
      && this.addForm.dirty)  
        this.changeTask();
  }

}
