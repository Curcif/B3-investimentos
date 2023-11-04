import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestimentoComponent } from './investimento.component';
import { By } from '@angular/platform-browser';
import { ApiHttpService } from '../core/services/api-http';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('InvestimentoComponent', () => {
  let component: InvestimentoComponent;
  let fixture: ComponentFixture<InvestimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestimentoComponent],
      providers: [{ provide: ApiHttpService },
      { provide: HttpClient },
      { provide: HttpHandler }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Teste de criação do componente', () => {
    expect(component).toBeTruthy();
  });

  it("Desabilitar botao calcular ao preencher os campos", () => {
    component.QtdMesesInvestidos = '';
    component.ValorAplicado = '';
    debugger;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css(".botao-calcular"));
    console.log(button);
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it("Habilitar botao calcular ao preencher os campos", () => {
    component.QtdMesesInvestidos = '2';
    component.ValorAplicado = '200'
    debugger;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css(".botao-calcular"));
    console.log(button);
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it("Valida se o valor não é um numerico", () => {
    component.ValorAplicado = 'abc';
    let isNumeric: boolean = true;
    try {
      Number(component.ValorAplicado)
    } catch (e) {
      isNumeric = false;
    }
    fixture.detectChanges();
    expect(isNumeric).toBeTruthy();
  });

});
