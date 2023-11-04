using B3.Entidades;
using B3.Interfaces;
using B3.Services;

namespace Test.Investimento
{
    public class InvestimentoTest
    {
        private readonly IInvestimentoServices _services = new InvestimentoServices();

        //public InvestimentoTest(IInvestimentoServices services)
        //{
        //    _services = services;
        //}

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void TestImpostoMenorIgualSeis()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 100,
                QtdMesesInvestidos = 2,
                Imposto = 0,
                Rendimento = 0
            };

            _services.CalcularInvestimento(dadosInvestidor);

            Assert.That(dadosInvestidor.Imposto, Is.EqualTo(0.225));
        }

        [Test]
        public void TestImpostoMaiorSeisMenorIgualDoze()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 100,
                QtdMesesInvestidos = 7,
                Imposto = 0,
                Rendimento = 0
            };

            _services.CalcularInvestimento(dadosInvestidor);

            Assert.That(dadosInvestidor.Imposto, Is.EqualTo(0.2));
        }

        [Test]
        public void TestImpostoMaiorDozeMenorIgualVinteQuatro()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 100,
                QtdMesesInvestidos = 13,
                Imposto = 0,
                Rendimento = 0
            };

            _services.CalcularInvestimento(dadosInvestidor);

            Assert.That(dadosInvestidor.Imposto, Is.EqualTo(0.175));
        }

        [Test]
        public void TestImpostoMaiorVinteQuatro()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 100,
                QtdMesesInvestidos = 25,
                Imposto = 0,
                Rendimento = 0
            };

            _services.CalcularInvestimento(dadosInvestidor);

            Assert.That(dadosInvestidor.Imposto, Is.EqualTo(0.15));
        }

        [Test]
        public void TestValorAplicadoZero()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 0,
                QtdMesesInvestidos = 2,
                Imposto = 0,
                Rendimento = 0
            };

            var ex = Assert.Throws<ArgumentException>(() => _services.CalcularInvestimento(dadosInvestidor));
            Assert.That(ex.Message, Is.EqualTo($"Valor Aplicado inválido: {dadosInvestidor.ValorAplicado}. Valor precisa ser maior que zero"));
        }

        [Test]
        public void TestMesesZero()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 100,
                QtdMesesInvestidos = 0,
                Imposto = 0,
                Rendimento = 0
            };

            var ex = Assert.Throws<ArgumentException>(() => _services.CalcularInvestimento(dadosInvestidor));
            Assert.That(ex.Message, Is.EqualTo($"Quantidade de meses inválida: {dadosInvestidor.ValorAplicado}. Valor precisa ser maior que zero"));
        }

        [Test]
        public void TestValorAplicadoMesesZero()
        {
            InvestidorEntity dadosInvestidor = new InvestidorEntity()
            {
                ValorAplicado = 0,
                QtdMesesInvestidos = 0,
                Imposto = 0,
                Rendimento = 0
            };

            var ex = Assert.Throws<ArgumentException>(() => _services.CalcularInvestimento(dadosInvestidor));
            Assert.That(ex.Message, Is.EqualTo($"Valor Aplicado inválido: {dadosInvestidor.ValorAplicado}. Valor precisa ser maior que zero"));
        }
    }
}