import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import sales from "@/data/sales.json";
import hero from "@/assets/hero-911.jpg";
import { Button } from "@/components/ui/button";
import { filterBySaleYear, saleYear } from "@/lib/sale-year";

type Sale = {
  SaleDateSanitized: string;
  PorscheModelSanitized: string;
  ModelYearSanitized: number;
  SalesPriceSanitized: number;
  PayMethodSanitized: string;
  CitySanitized: string;
  StateSanitized: string;
};
const data = sales as Sale[];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Porsche · Painel de Vendas" },
      { name: "description", content: "Faturamento, modelos, regiões e formas de pagamento das vendas Porsche." },
      { property: "og:title", content: "Porsche · Painel de Vendas" },
      { property: "og:description", content: "Indicadores e perguntas de negócio das vendas Porsche." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const COLORS = ["var(--p-red)", "var(--p-gold)", "var(--p-blue)", "var(--p-green)", "var(--p-yellow)", "var(--muted-foreground)", "var(--foreground)"];
const PAY_COLORS: Record<string, string> = { Financing: "var(--p-copper)", Lease: "var(--p-violet)" };
const payColor = (name: string, i: number) => PAY_COLORS[name] ?? COLORS[i % COLORS.length];
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usdK = (n: number) => (n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${Math.round(n / 1e3)}k`);
const years = [...new Set(data.map((d) => saleYear(d.SaleDateSanitized)).filter((y): y is number => y !== null))].sort((a, b) => a - b);
const invalidDates = data.filter((d) => saleYear(d.SaleDateSanitized) === null).length;

function group(rows: Sale[], key: keyof Sale) {
  const m = new Map<string, { name: string; receita: number; qtd: number }>();
  rows.forEach((r) => {
    const k = String(r[key]);
    const g = m.get(k) ?? { name: k, receita: 0, qtd: 0 };
    g.receita += r.SalesPriceSanitized; g.qtd += 1; m.set(k, g);
  });
  return [...m.values()].map((g) => ({ ...g, ticket: g.receita / g.qtd })).sort((a, b) => b.receita - a.receita);
}

const tip = { contentStyle: { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--foreground)" }, itemStyle: { color: "var(--foreground)" }, cursor: { fill: "var(--muted)" } };

function Dashboard() {
  const [year, setYear] = useState<number | "all">("all");
  const rows = useMemo(() => filterBySaleYear(data, year), [year]);
  const total = rows.reduce((s, r) => s + r.SalesPriceSanitized, 0);
  const models = group(rows, "PorscheModelSanitized");
  const states = group(rows, "StateSanitized");
  const pays = group(rows, "PayMethodSanitized").sort((a, b) => b.qtd - a.qtd);
  const topTicket = [...models].sort((a, b) => b.ticket - a.ticket)[0];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="relative overflow-hidden border-b border-border">
        <img src={hero} alt="Porsche 911 em estúdio" width={1920} height={768} className="absolute inset-0 h-full w-full object-cover object-right opacity-80" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="eyebrow tracking-[0.5em]">PORSCHE</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">Painel de Vendas</h1>
          <p className="mt-3 max-w-md text-muted-foreground">Desempenho por modelo, região e forma de pagamento.</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        <section className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2">Ano da venda</span>
          {(["all", ...years] as const).map((y) => (
            <Button variant="outline" key={y} onClick={() => setYear(y)} aria-pressed={year === y}
              className={`rounded border px-4 py-2 text-sm transition-colors ${year === y ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:border-foreground hover:text-foreground"}`}>
              {y === "all" ? "Todos" : y}
            </Button>
          ))}
          <p className="w-full mt-2 text-xs text-muted-foreground">{invalidDates} vendas com data inválida: incluídas em “Todos”, excluídas ao selecionar um ano.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Kpi label="Faturamento total" value={usd(total)} accent="bg-p-red" />
          <Kpi label="Veículos vendidos" value={String(rows.length)} accent="bg-p-gold" />
          <Kpi label="Ticket médio geral" value={usd(rows.length ? total / rows.length : 0)} accent="bg-p-blue" />
        </section>

        <Panel n="01" q="Qual modelo gera a maior receita e qual tem o maior ticket médio?"
          a={models[0] && topTicket ? `${models[0].name} lidera em receita (${usd(models[0].receita)}); ${topTicket.name} tem o maior ticket médio (${usd(topTicket.ticket)}).` : "Sem dados."}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-[420px] lg:col-span-2">
              <ResponsiveContainer>
                <BarChart data={models.slice(0, 10)} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" tickFormatter={usdK} stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis type="category" dataKey="name" interval={0} width={120} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip {...tip} formatter={(v: number) => usd(v)} />
                  <Bar dataKey="receita" name="Receita" radius={[0, 3, 3, 0]}>
                    {models.slice(0, 10).map((_, i) => <Cell key={i} fill={i === 0 ? "var(--p-red)" : "var(--muted-foreground)"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Table rows={models} />
          </div>
        </Panel>

        <Panel n="02" q="Onde estão os clientes mais rentáveis (por estado)?"
          a={states[0] ? `${states[0].name} concentra ${((states[0].receita / total) * 100).toFixed(1)}% da receita. Top 5 estados somam ${((states.slice(0, 5).reduce((s, x) => s + x.receita, 0) / total) * 100).toFixed(1)}%.` : "Sem dados."}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-[340px] lg:col-span-2">
              <ResponsiveContainer>
                <BarChart data={states.slice(0, 5)}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis tickFormatter={usdK} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip {...tip} formatter={(v: number) => usd(v)} />
                  <Bar dataKey="receita" name="Receita" radius={[3, 3, 0, 0]}>
                    {states.slice(0, 5).map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Participação na receita</p>
              {states.slice(0, 8).map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm"><span>{s.name} <span className="text-muted-foreground">· {s.qtd} vendas</span></span><span>{((s.receita / total) * 100).toFixed(1)}%</span></div>
                  <div className="mt-1 h-1.5 rounded bg-muted"><div className="h-full rounded" style={{ width: `${(s.receita / (states[0]?.receita ?? 1)) * 100}%`, background: COLORS[i % 5] }} /></div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel n="03" q="Qual é a forma de pagamento preferida e como ela impacta o valor da venda?"
          a={pays[0] ? `${pays[0].name} é a preferida (${((pays[0].qtd / rows.length) * 100).toFixed(0)}% das vendas). Maior ticket: ${[...pays].sort((a, b) => b.ticket - a.ticket)[0]?.name}.` : "Sem dados."}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="min-w-0 space-y-4">
              <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pays} dataKey="qtd" nameKey="name" innerRadius={75} outerRadius={125} paddingAngle={2} stroke="var(--background)">
                    {pays.map((p, i) => <Cell key={i} fill={payColor(p.name, i)} />)}
                  </Pie>
                  <Tooltip {...tip} formatter={(v: number) => `${v} vendas (${((v / rows.length) * 100).toFixed(0)}%)`} />
                </PieChart>
              </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                {pays.map((p, i) => <span key={p.name} className="flex items-center gap-1 whitespace-nowrap"><span className="h-2 w-2 shrink-0 rounded-full" style={{ background: payColor(p.name, i) }} />{p.name}</span>)}
              </div>
            </div>
            <div className="h-[340px]">
              <ResponsiveContainer>
                <BarChart data={[...pays].sort((a, b) => b.ticket - a.ticket)} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" tickFormatter={usdK} stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis type="category" dataKey="name" interval={0} width={120} stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip {...tip} formatter={(v: number) => usd(v)} />
                  <Bar dataKey="ticket" name="Ticket médio" radius={[0, 3, 3, 0]}>
                    {[...pays].sort((a, b) => b.ticket - a.ticket).map((p, i) => <Cell key={i} fill={payColor(p.name, pays.indexOf(p))} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Panel>
        <p className="pb-6 text-xs text-muted-foreground">Fonte: bancoDadosPorsche.xlsx · apenas colunas sanitizadas.</p>
      </main>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded border border-border bg-surface p-6">
      <span className={`absolute left-0 top-0 h-full w-1 ${accent}`} />
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function Panel({ n, q, a, children }: { n: string; q: string; a: string; children: React.ReactNode }) {
  return (
    <section className="rounded border border-border bg-surface p-6 md:p-8">
      <p className="eyebrow text-accent">Pergunta {n}</p>
      <h2 className="mt-2 text-xl font-medium md:text-2xl">{q}</h2>
      <p className="mt-2 mb-6 text-sm text-muted-foreground">{a}</p>
      {children}
    </section>
  );
}

function Table({ rows }: { rows: { name: string; receita: number; qtd: number; ticket: number }[] }) {
  return (
    <div className="overflow-auto text-sm">
      <table className="w-full">
        <thead><tr className="eyebrow text-left"><th className="pb-2">Modelo</th><th className="pb-2 text-right">Un.</th><th className="pb-2 text-right">Ticket</th></tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.name} className="border-t border-border"><td className="py-2">{r.name}</td><td className="text-right">{r.qtd}</td><td className="text-right">{usdK(r.ticket)}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}
