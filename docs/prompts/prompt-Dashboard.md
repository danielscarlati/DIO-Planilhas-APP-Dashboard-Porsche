Atue como especialista em desenvolvimento de aplicações analíticas e crie um Dashboard Executivo da Porsche com base nos arquivos anexados: a planilha de dados `bancoDadosPorsche.xlsx` e as diretrizes em `prompt-PerguntasDeNegocio.md`.

Siga rigorosamente as instruções abaixo:

---

### 1. Tratamento e Seleção de Dados
- **Apenas Colunas Sanitizadas:** Utilize exclusivamente os campos que terminam com o sufixo `"Sanitized"` (ex.: `SaleDateSanitized`, `PorscheModelSanitized`, `ModelYearSanitized`, `SalesPriceSanitized`, `PayMethodSanitized`, `CitySanitized`, `StateSanitized`). Ignore quaisquer colunas brutas sem o sufixo.
- **Filtro pelo Ano da Venda:** O filtro temporal do dashboard deve recortar os dados pelo ano em que a venda ocorreu (`SaleDateSanitized`). Isole o tratamento de datas em função reutilizável: datas válidas (2024 a 2027) alimentam os botões de ano; registros com datas inválidas ou não preenchidas devem ser preservados e contabilizados na opção "Todos".

---

### 2. Layout Híbrido: Power BI + Porsche Design System (v3)
Integre a usabilidade corporativa de componentes do Power BI à identidade visual premium da Porsche (consulte https://designsystem.porsche.com/v3/):

- **Estrutura Power BI:**
  - **Indicadores de Topo (KPI Cards):** Cartões retangulares cinza-claros em destaque, exibindo Faturamento Total, Quantidade de Veículos Vendidos e Ticket Médio.
  - **Painel de Filtros Lateral Retrátil:** Barra lateral recolhível (abrir/fechar) contendo o filtro por Ano da Venda, botão para redefinir filtros e contador de registros filtrados. O ato de colapsar o painel não pode resetar a seleção do usuário.
  - **Containers de Gráficos:** Cartões brancos/claros com bordas suaves e sutis sombras corporativas.
- **Identidade Visual Porsche:**
  - Tipografia sóbria inspirada na *Porsche Next* (alta legibilidade, espaçamento refinado).
  - Cabeçalho executivo institucional com o logotipo e detalhe na cor clássica da marca (*Porsche Red / #D5001C*).
  - Cores auxiliares inspiradas na paleta de tintas automotivas e acabamentos Porsche (tons de aço, azul corporativo, dourado e neutros premium).

---

### 3. Perguntas de Negócio e Visualizações
Responda diretamente a cada pergunta do documento `prompt-PerguntasDeNegocio.md`, incluindo o gráfico correspondente acompanhado de um texto analítico com os principais insights:

1. **Modelos Mais Lucrativos e Ticket Médio:**
   - Gráfico de barras horizontais ordenado pelo faturamento dos 10 principais modelos, cruzado com o ticket médio de cada um.
2. **Formas de Pagamento e Financiamentos:**
   - Gráfico de rosca da distribuição de receita e gráfico complementar de ticket médio por método.
   - **Regra de Cores Obrigatória:** `Financing` deve ter cor exclusiva em **laranja cobre** e `Lease` em **violeta**. Nenhuma delas pode ser preta e devem ser diferentes de todas as outras formas de pagamento na rosca, mantendo consistência entre gráfico e legenda.
   - **Legenda Completa:** A seção do gráfico deve expandir dinamicamente para que todos os tópicos e valores da legenda fiquem 100% visíveis dentro do container, sem truncar.
3. **Distribuição Geográfica (Cidades e Estados):**
   - Ranking das praças com maior volume de faturamento e volume de unidades vendidas.

---

### 4. Responsividade e Interatividade
- Gráficos interativos com tooltips detalhadas e valores formatados em moeda (USD).
- Layout fluido adaptável para desktop e dispositivos móveis, mantendo a legibilidade e o alinhamento dos elementos.
