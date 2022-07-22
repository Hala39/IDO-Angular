import { Directive, Input, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective implements OnInit {

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit(): void {
    this.tooltipElement.className = 'tooltip';
    this.element.nativeElement.appendChild(this.tooltipElement);
    this.element.nativeElement.classList.add('tooltip-container')
  }

  @Input('blockHover') blockHover = false;
  tooltipElement = document.createElement('div');
  visible = false;


  @Input() set tooltip(value: string) {
    this.tooltipElement.textContent = value;
  }

  @HostListener('mouseenter') onMouseEnter() {

    let x, y;


    this.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hide();
  }

  show() {
    this.tooltipElement.classList.add('tooltip-bottom');
    this.tooltipElement.style.display = 'block';
  }

  hide() {
    this.tooltipElement.classList.remove('tooltip-bottom');
    this.tooltipElement.style.display = 'none';
  }
  
}
