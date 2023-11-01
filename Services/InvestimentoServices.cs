using B3.Entidades;
using B3.Interfaces;

namespace B3.Services
{
    public class InvestimentoServices : IInvestimentoServices
    {
        const double TB = 108 / 100;
        const double CDI = 0.9 / 100;
        private Dictionary<int, double> Imposto = new() {
            { 6, (22.5 / 100) },
            { 12, (20 / 100) },
            { 24, (17.5 / 100) },
            { 25, (15 / 100) }
        };

        public InvestimentoServices() { }

        public InvestidorEntity CalcularInvestimento(InvestidorEntity dadosInvestidor)
        {
            int index = 1;
            double taxa = 0;
            dadosInvestidor.ValorBruto = dadosInvestidor.ValorAplicado;

            do
            {
                dadosInvestidor.ValorBruto = dadosInvestidor.ValorBruto * (1 + (CDI * TB));
            } while (index < dadosInvestidor.QtdMesesInvestidos);

            taxa = CalcularTaxa(dadosInvestidor.QtdMesesInvestidos);
            dadosInvestidor.ValorLiquido = dadosInvestidor.ValorBruto - (dadosInvestidor.ValorBruto * taxa);

            return dadosInvestidor;
        }

        private double CalcularTaxa(decimal periodo)
        {
            if (periodo <= 6)
                return Imposto.Where(x => x.Key == 6).Select(y => y.Value).FirstOrDefault();

            if (periodo > 6 && periodo <= 12)
                return Imposto.Where(x => x.Key == 12).Select(y => y.Value).FirstOrDefault();

            if (periodo > 12 && periodo <= 24)
                return Imposto.Where(x => x.Key == 24).Select(y => y.Value).FirstOrDefault();

            if (periodo > 24)
                return Imposto.Where(x => x.Key == 25).Select(y => y.Value).FirstOrDefault();

            return 0;
        }
    }
}
