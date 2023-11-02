#nullable disable

namespace B3.Entidades
{
    public class InvestidorEntity
    {
        public double ValorAplicado { get; set; }
        public double ValorBruto { get; set; }
        public double ValorLiquido { get; set; }
        public double Rendimento { get; set; }
        public double Imposto { get; set; }
        public int QtdMesesInvestidos { get; set; }
    }
}
