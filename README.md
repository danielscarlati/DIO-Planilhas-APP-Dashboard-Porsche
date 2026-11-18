# Dashboard Executivo de Vendas Porsche

Dashboard executivo para explorar as vendas Porsche por modelo, forma de pagamento e localização, com indicadores de faturamento, quantidade de veículos vendidos e ticket médio.

Este trabalho foi feito pelo **Lovable**.

## Perguntas de negócio e prompts

As perguntas de negócio escolhidas para orientar a análise estão em [`docs/prompts/prompt-PerguntasDeNegocio.md`](docs/prompts/prompt-PerguntasDeNegocio.md). O prompt utilizado para criar o dashboard está em [`docs/prompts/prompt-Dashboard.md`](docs/prompts/prompt-Dashboard.md).

## Dados e metodologia

Não foi necessário fazer tratamento dos dados. Para a análise no dashboard, pedi à IA que utilizasse somente as colunas sanitizadas da planilha. Na própria planilha, criei tabelas dinâmicas para responder a cada pergunta de negócio.

A planilha original está em [`docs/bancoDadosPorsche.xlsx`](docs/bancoDadosPorsche.xlsx), e os dados usados pela aplicação estão em [`src/data/sales.json`](src/data/sales.json). O filtro do dashboard considera o ano da venda; registros com data inválida ou não preenchida permanecem na opção **Todos**.

## Funcionalidades

- Indicadores de faturamento total, veículos vendidos e ticket médio.
- Filtro retrátil por ano da venda.
- Análises de faturamento e ticket médio por modelo e forma de pagamento.
- Ranking geográfico de vendas.
- Layout responsivo, com gráficos interativos e valores em dólares americanos (USD).

## Executar localmente

É necessário ter [Bun](https://bun.sh/) instalado.

```bash
bun install
bun run dev
```

Para validar o projeto:

```bash
bun run lint
bun run test
bun run build
```

## Endereço da dashboard

[Porsche - Valor de Vendas](https://porsche-business-pulse.lovable.app)