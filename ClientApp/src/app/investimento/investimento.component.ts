import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from '../core/services/api-http';
import { NumericDirective } from '../helpers/numeric.directive';
declare var $: any;

@Component({
  selector: 'app-investimento',
  templateUrl: './investimento.component.html',
  styleUrls: ['./investimento.component.css']
})
export class InvestimentoComponent implements OnInit {
  investimentosCalculados: any;
  constructor(private service: ApiHttpService, private numericValidations: NumericDirective) {
  };

  ValorAplicado: string = "";
  QtdMesesInvestidos = "";
  
  ngOnInit() : void{
    $(".money").on('keydown', function () {
      $(".money").mask("##0.00", { reverse: true });
    });
  }

  CalcularInvestimento() {
    let valoresArr: string[] = [this.ValorAplicado, this.QtdMesesInvestidos];
    let dadosInvestimento = { "ValorAplicado": this.ValorAplicado, "QtdMesesInvestidos": this.QtdMesesInvestidos };

    if (this.ValidarCampos(valoresArr)) {
      this.service.CalcularRendimento("https://localhost:7009/Investimento/CalcularInvestimento", dadosInvestimento).subscribe(result => {
        this.investimentosCalculados = result;
      });

    }
  };

  ValidarCampos(valoresArr: string[]) {

    let camposValidados = this.numericValidations.ValidarCamposNulosOuVazios(valoresArr);
    let formatosValidados = this.numericValidations.ValidarNumeros(valoresArr);

    if (camposValidados && formatosValidados) {
      return true;
    }

    return false;
  };

  LimparCampos() {
    this.ValorAplicado = "";
    this.QtdMesesInvestidos = "";
    alert("Campos resetados com sucesso!")
  };

  ChecarCamposPreenchidos(): boolean {
    return this.ValorAplicado == "" || this.QtdMesesInvestidos == "";
  }
}
