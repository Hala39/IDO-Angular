import { fn, FnParam } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnChanges, ControlValueAccessor {

  constructor(@Self() @Optional() public control: NgControl, private cdRef: ChangeDetectorRef) {
    if (this.control) this.control.valueAccessor = this;
  }

  onTouch!: Function;
  onModelChange!: Function;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']?.currentValue === 'number') 
      this.maxContent = false;
    if (this.required) {
      this.control.control?.addValidators(Validators.required);
    }
    if (this.type === 'email') {
      this.control.control?.addValidators(Validators.pattern(this.emailRegEx))
    }
    if (this.type === 'number') {
      this.control.control?.addValidators(Validators.pattern(/^[0-9]*$/))
    }
    if (this.type === 'text') {
      this.control.control?.addValidators([Validators.minLength(this.min), Validators.maxLength(this.max)])
    }
  }

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  @Input('type') type = 'text';
  @Input('label') label = '';
  @Input('placeholder') placeholder = '';
  @Input('required') required = true;
  @Input('min') min = 2;
  @Input('max') max = 500;
  @Input('class') class = '';
  @Input('minDate') minDate = '';
  @Input('maxContent') maxContent = true;
  @Input('light') light = false;
  value: any = '';

  emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  onChange($event: any) {
    if (this.type === 'number') {
      $event < this.min ? this.value = this.min : $event > this.max ? this.value = this.max : this.value = $event;
    }
    this.value = $event; 
    this.onTouch();
    this.onModelChange(this.value);
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

}
