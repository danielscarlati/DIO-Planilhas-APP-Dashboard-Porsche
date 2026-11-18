Prompt: Tenho uma planilha com 100 vendas da Porsche, com modelo,
cidade, estado, ano, preço e método de pagamento.

Me ajude a escolher três perguntas de negócio para fazer calcúlos e que vão servir pro dashboard.

Resposta: Excelente conjunto de dados! Ter variáveis de produto (`modelo`), financeiras (`preço`), geográficas (`cidade`, `estado`), temporais (`ano`) e transacionais (`método de pagamento`) permite montar um dashboard bem completo e focado em tomada de decisão.

Para um dashboard executivo eficiente, o ideal é cobrir três ângulos fundamentais de qualquer negócio: **Performance de Produto**, **Distribuição Geográfica** e **Comportamento de Compra/Pagamento**.

Aqui estão 3 ótimas perguntas de negócio, com os cálculos necessários e os visuais recomendados:

---

### 1. Qual modelo gera a maior receita e qual tem o maior ticket médio?
* **O objetivo de negócio:** Entender o "carro-chefe" da loja — saber se o faturamento vem de vender muitos modelos de entrada (volume) ou poucos modelos topo de linha (margem).
* **Cálculos necessários:**
  * **Receita total por modelo:** `Soma(preço)` agrupada por `modelo`.
  * **Ticket médio por modelo:** `Média(preço)` agrupada por `modelo`.
  * **Volume de unidades:** `Contagem(vendas)` por `modelo`.
* **Visual sugerido no dashboard:** 
  * Gráfico de barras horizontais (ordenado do maior faturamento para o menor).

---

### 2. Onde estão os clientes mais rentáveis (por Estado/Cidade)?
* **O objetivo de negócio:** Identificar a concentração geográfica das vendas para direcionar campanhas de marketing, logística ou abertura de novos pontos de atendimento.
* **Cálculos necessários:**
  * **Vendas por região:** `Soma(preço)` e `Contagem(vendas)` agrupadas por `estado` (e detalhadas por `cidade` via filtro ou drill-down).
  * **Participação percentual:** `(Receita do Estado / Receita Total) * 100`.
* **Visual sugerido no dashboard:** 
  * Mapa coroplético (preenchimento de mapa por intensidade) ou gráfico de colunas com os **Top 5 Estados**.

---

### 3. Qual é a forma de pagamento preferida e como ela impacta o valor da venda?
* **O objetivo de negócio:** Avaliar o perfil financeiro do comprador de luxo (ex.: compras à vista vs. financiamento) e o risco de inadimplência ou custos de taxas de transação.
* **Cálculos necessários:**
  * **Distribuição de pagamentos:** `Contagem de vendas por método / Total de vendas` (percentual de participação).
  * **Ticket médio por forma de pagamento:** `Média(preço)` agrupada por `método de pagamento`.
* **Visual sugerido no dashboard:** 
  * Gráfico de rosca/pizza para o percentual de transações por método, acompanhado de um gráfico de barras comparando o ticket médio de cada um.

---

> [!TIP]
> **Dica de ouro para o topo do dashboard:**  
> Além dessas três perguntas principais, reserve a parte superior da tela para 3 cartões de métricas gerais (KPI Cards):
> 1. **Faturamento Total** (`Soma de todos os preços`)
> 2. **Total de Veículos Vendidos** (`Contagem total de registros = 100`)
> 3. **Ticket Médio Geral** (`Preço Médio por veículo vendido`)

Qual ferramenta você pretende usar para construir esse dashboard (Power BI, Excel, Tableau ou Python/Streamlit)? Dependendo da sua escolha, posso te orientar na criação das fórmulas e medidas!