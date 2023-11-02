using B3.Entidades;
using B3.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace B3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvestimentoController : ControllerBase
    {
        private readonly ILogger<InvestimentoController> _logger;
        private readonly IInvestimentoServices _investimentoServices;

        public InvestimentoController(ILogger<InvestimentoController> logger, IInvestimentoServices investimentoServices)
        {
            _logger = logger;
            _investimentoServices = investimentoServices;
        }

        [HttpPost("CalcularInvestimento")]
        public InvestidorEntity CalcularInvestimento(InvestidorEntity dadosInvestidor) {
            return _investimentoServices.CalcularInvestimento(dadosInvestidor);
        }
    }
}