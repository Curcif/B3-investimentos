import { Component } from '@angular/core';
import { ApiHttpService } from '../core/services/api-http';
import { NumericDirective } from '../helpers/numeric.directive';
@Component({
  selector: 'app-home',
  templateUrl: './investimento.component.html',
})
export class InvestimentoComponent {
  investimentosCalculados: any;
  constructor(private service: ApiHttpService, private numericValidations: NumericDirective) {
  }

  valorAplicado = "";
  QtdMesesInvestidos = "";

  CalcularInvestimento() {
    let valoresArr: string[] = [this.valorAplicado, this.QtdMesesInvestidos];
    let dadosInvestimento = { "ValorAplicado": this.valorAplicado, "QtdMesesInvestidos": this.QtdMesesInvestidos };

    if (this.ValidarCampos(valoresArr)) {
      this.service.CalcularRendimento("https://localhost:7009/Investimento/CalcularInvestimento", dadosInvestimento).subscribe(result => {
        this.investimentosCalculados = result;
      });

    };
  }

  ValidarCampos(valoresArr: string[]) {

    let camposValidados = this.numericValidations.ValidarCamposNulosOuVazios(valoresArr);
    let formatosValidados = this.numericValidations.ValidarNumeros(valoresArr);

    if (camposValidados && formatosValidados) {
      return true;
    }

    return false;
  }

  LimparCampos() {
    this.valorAplicado = "";
    this.QtdMesesInvestidos = "";
    alert("Campos resetados com sucesso!")
  }
}
