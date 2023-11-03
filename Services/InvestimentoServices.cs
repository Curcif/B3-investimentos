using B3.Entidades;
using B3.Interfaces;

namespace B3.Services
{
    public class InvestimentoServices : IInvestimentoServices
    {
        const double TB = 108 / 100;
        const double CDI = 0.9 / 100;
        private Dictionary<int, double> Imposto = new() {
            { 6, 22.5 },
            { 12, 20 },
            { 24, 17.5 },
            { 25, 15 }
        };

        public InvestimentoServices() { }

        public InvestidorEntity CalcularInvestimento(InvestidorEntity dadosInvestidor)
        {
            ValidarDadosInvestidor(dadosInvestidor);

            int index = 1;
            dadosInvestidor.ValorBruto = dadosInvestidor.ValorAplicado;

            while (index <= dadosInvestidor.QtdMesesInvestidos)
            {
                dadosInvestidor.ValorBruto = dadosInvestidor.ValorBruto * (1 + (CDI * TB));
                index++;
            }

            dadosInvestidor.Imposto = CalcularImposto(dadosInvestidor.QtdMesesInvestidos);
            dadosInvestidor.Rendimento = dadosInvestidor.ValorBruto - dadosInvestidor.ValorAplicado;
            dadosInvestidor.ValorLiquido = dadosInvestidor.ValorBruto - (dadosInvestidor.Rendimento * dadosInvestidor.Imposto);


            return dadosInvestidor;
        }

        private InvestidorEntity ValidarDadosInvestidor(InvestidorEntity dadosInvestidor)
        {
            if (dadosInvestidor.ValorAplicado <= 1)
            {
                throw new Exception($"Valor Aplicado inválido: {dadosInvestidor.ValorAplicado}. Valor precisa ser maior que zero");
            }

            if (dadosInvestidor.QtdMesesInvestidos <= 1)
            {
                throw new Exception($"Quantidade de meses inválida: {dadosInvestidor.ValorAplicado}. Valor precisa ser maior que zero");
            }

            return new InvestidorEntity();
        }

        private double CalcularImposto(decimal periodo)
        {
            if (periodo <= 6)
                return Imposto.Where(x => x.Key == 6).Select(y => y.Value).FirstOrDefault() / 100;

            if (periodo > 6 && periodo <= 12)
                return Imposto.Where(x => x.Key == 12).Select(y => y.Value).FirstOrDefault() / 100;

            if (periodo > 12 && periodo <= 24)
                return Imposto.Where(x => x.Key == 24).Select(y => y.Value).FirstOrDefault() / 100;

            if (periodo > 24)
                return Imposto.Where(x => x.Key == 25).Select(y => y.Value).FirstOrDefault() / 100;

            return 0;
        }
    }
}
