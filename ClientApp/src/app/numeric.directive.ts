import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[numeric]"
})

export class NumericDirective {
  private checkDecimal(value: string) {
    const regExpString = "^((\\d+(\\.\\d{0,2})?)|((\\d*(\\.\\d{1,2}))))$";

    return String(value).match(new RegExp(regExpString));
  }

  private run(oldValue: any) {
    const maxLengthAllowed = 13;

    setTimeout(() => {
      const currentValue: string = this.el.nativeElement.value;
      if (currentValue !== "" && !this.checkDecimal(currentValue) || currentValue.length > maxLengthAllowed) {
        this.el.nativeElement.value = oldValue;
      }
    });
  }

  constructor(private el: ElementRef) { }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.run(this.el.nativeElement.value);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run(this.el.nativeElement.value);
  }
}
