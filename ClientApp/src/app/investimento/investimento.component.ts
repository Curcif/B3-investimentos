import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './investimento.component.html',
})
export class InvestimentoComponent {
  valorInvestimento = "";
  mesesCalcular = "";

  CalcularInvestimento() {
    alert("worked");
    this.ValidarCampos();
  }

  ValidarCampos() {
    alert("validou");
    var teste = this.valorInvestimento;
    alert(teste);
    return 0;
  }

  LimparCampos() {
    this.valorInvestimento = "";
    this.mesesCalcular = "";
    alert("Campos resetados com sucesso!")
  }
}
