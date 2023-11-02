import { Component } from '@angular/core';
import { ApiHttpService } from '../core/services/api-http';

@Component({
  selector: 'app-home',
  templateUrl: './investimento.component.html',
})
export class InvestimentoComponent {
  investimentosCalculados: any;
  constructor(private service: ApiHttpService) {
  }

  emplist: any;
  valorAplicado = "";
  QtdMesesInvestidos = "";

  options = { "headers": "Access-Control-Allow-Origin: https://localhost:7009"}

  CalcularInvestimento() {
    let dadosInvestimento = { "ValorAplicado": this.valorAplicado, "QtdMesesInvestidos": this.QtdMesesInvestidos };
    this.service.CalcularRendimento("https://localhost:7009/Investimento/CalcularInvestimento", dadosInvestimento, this.options).subscribe(result => {
      this.investimentosCalculados = result;
    });

    alert("worked");
    this.ValidarCampos();
  }

  ValidarCampos() {
    alert("validou");
    var teste = this.valorAplicado;
    alert(teste);
    return 0;
  }

  LimparCampos() {
    this.valorAplicado = "";
    this.QtdMesesInvestidos = "";
    alert("Campos resetados com sucesso!")
  }
}
