import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCanSaveSettings]'
})
export class CanSaveSettingsDirective {

  constructor(private ele: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const canSaveSettings = JSON.parse(localStorage.getItem('canSaveSettings') as any);
    if (!canSaveSettings) {
      this.renderer.setStyle(this.ele.nativeElement, 'display', 'none');
    }
  }

}
