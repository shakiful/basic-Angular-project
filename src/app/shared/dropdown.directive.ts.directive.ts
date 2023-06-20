import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdownDirectiveTs]'
})
export class DropdownDirectiveTsDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen : false;
  }

  constructor(private elRef:ElementRef) { }

}
