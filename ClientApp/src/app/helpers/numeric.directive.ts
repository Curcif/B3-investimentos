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

  ValidarCamposNulosOuVazios(valores: string[]) {
    for (var i = 0; i < valores.length; i++) {
      if (valores[i] != null && valores[i].trim() != "") {
        alert("Por favor, preencha os campos corretamente!");
        return false;
      }
    }

    return true;
  }

  //Valida se contém somente números e positivos
  ValidarNumeros(valores: string[]) {
    let regex = /^[-+]?[0-9]+\.[0-9]+$/;
    let isValidated;

    for (var i = 0; i < valores.length; i++) {
      isValidated = regex.test(valores[i]);

      if (!isValidated) {
        alert("formato do valor inválido: informe apenas números")
        return false;
      }

      if (Number(valores[i]) < 1) {
        alert("por favor, informe o valor positivo e superior à 0")
        return false;
      }
    }

    return true;
  }

}
