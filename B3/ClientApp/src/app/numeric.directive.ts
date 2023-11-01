import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[numeric]"
})

export class NumericDirective {
  @Input("decimals") decimals = 2;

  private check(value: string) {
    const regExpString =
      "^((\\d+(\\.\\d{0," +
      this.decimals +
      "})?)|((\\d*(\\.\\d{1," +
      this.decimals +
      "}))))$";

    return String(value).match(new RegExp(regExpString));
  }

  private run(oldValue: any) {
    setTimeout(() => {
      const currentValue: string = this.el.nativeElement.value;
      if (currentValue !== "" && !this.check(currentValue)) {
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
