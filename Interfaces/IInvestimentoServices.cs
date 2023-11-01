using B3.Entidades;

namespace B3.Interfaces
{
    public interface IInvestimentoServices
    {
        public InvestidorEntity CalcularInvestimento(InvestidorEntity dadosInvestidor);
    }
}
