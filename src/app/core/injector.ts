import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[injector-host]',
})
export class InjectorDirective
{
  constructor(public viewContainerRef: ViewContainerRef) { }
}