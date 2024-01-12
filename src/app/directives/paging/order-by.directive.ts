import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appOrderBy]'
})
export class OrderByDirective {

  constructor(private ele: ElementRef) { }

  ngOnInit() {
    const nativeElement = this.ele.nativeElement;
    nativeElement.classList.add('order-by-column');
  }

}
