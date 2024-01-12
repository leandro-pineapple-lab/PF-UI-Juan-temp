import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSecurityAccessSettings]'
})
export class SecurityAccessSettingsDirective {

  constructor(private ele: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    let securityAccess = localStorage.getItem('securityAccess') as any;
    if (securityAccess !== "P" && securityAccess !== "D" && securityAccess !== "L") {
      this.renderer.setStyle(this.ele.nativeElement, 'display', 'none');
    }
  }

}
