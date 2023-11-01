import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './investimento.component.html',
})

export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get(this.configUrl);
  }
}

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

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
        demoUrl: data['demoUrl'],
        filename: data['filename']
      });
  }
}

