# Análise de Custos de Manutenção e APIs (Projeção)

Este documento apresenta uma simulação detalhada dos custos fixos e variáveis de infraestrutura para manter o aplicativo operacional, com foco principal nos custos de uso das APIs do Google Maps, que historicamente representam o maior gargalo financeiro para aplicativos de mobilidade.

> [!WARNING]
> **O Grande Vilão: APIs de Mapa**
> Os servidores (banco de dados e processamento) são baratos. O real gargalo financeiro de um app de mobilidade é a API de mapas (Google Maps). Sem otimização correta, o Google pode inviabilizar o negócio.

---

## 🏗️ 1. Cenário Base: 50 Motoristas (24.000 corridas/mês)

**Premissas do cenário:**
- **50 Motoristas**
- **800 corridas por dia** (Média de 16 corridas por motorista/dia)
- **24.000 corridas por mês**
- *Câmbio Dólar (Estimado): R$ 5,00*

Para cada 1.000 requisições, o Google Maps cobra (Tabela 2024):
- Autocomplete (pesquisa de endereço): $17.00
- Place Details (pegar a coordenada da pesquisa): $17.00
- Geocoding (transformar coordenada em endereço): $5.00
- Directions (calcular rota e preço): $5.00

### 1.1 Projeção de Custo Bruto (Google Maps)
Considerando que para cada corrida confirmada o usuário entra no app **1.5 vezes** (pesquisa e desiste, pesquisa outro dia, etc.), temos a seguinte matemática de uso de API por corrida solicitada:

| Operação | Quantidade/Corrida | Custo em USD | Custo Mensal (24.000)
| :--- | :--- | :--- | :--- |
| **Pesquisa Endereço** (Autocomplete+Details) | 1.5x | $0.051 | $ 1,224.00 |
| **Ponto Atual** (Geocoding / GPS) | 1.5x | $0.0075 | $ 180.00 |
| **Cálculo de Preço** (Directions) | 1.5x | $0.0075 | $ 180.00 |
| **Motorista até Cliente** (Directions) | 1.0x | $0.005 | $ 120.00 |
| **Total Estimado API Google Maps** | - | **$0.071** por corrida | **$ 1,704.00 / mês** |

> **Abatimento:** O Google fornece $200.00 de crédito gratuito todo mês.
> Custo Final Mensal em Dólar: **$1,504.00**
> Custo Final Mensal em Reais: **R$ 7.520,00**

### 1.2 Custos de Servidor (Hospedagem e Banco de Dados)
Diferente dos mapas, processar as corridas é barato:

- **Banco de Dados (Ex: Supabase/PostgreSQL):** ~$30.00 (R$ 150,00)
- **Servidor Backend (Ex: Render/DigitalOcean):** ~$40.00 (R$ 200,00)
- **Armazenamento de Fotos/Docs (S3):** ~$5.00 (R$ 25,00)
- **Notificações Push (Firebase Firebase):** Gratuito
- **Total Servidor em Reais:** **~R$ 375,00 / mês**

**💰 TOTAL DO CENÁRIO 1: ~R$ 7.895,00 / mês** (Se usar o Google sem otimizações)

---

## 🚀 2. Escala: 100 Motoristas (48.000 corridas/mês)

**Premissas do cenário:**
- **100 Motoristas**
- **1.600 corridas por dia**
- **48.000 corridas por mês**

### Projeção Direta
- **Custo Servidor:** Aumentará marginalmente para suportar o tráfego. Cerca de **R$ 500,00 / mês**.
- **Custo Google Maps:** Com o dobro de corridas (48.000 * $0.071), o gasto de API sobe para $3,408. Menos os $200 de crédito: $3,208.
- **Custo Maps em Reais:** **R$ 16.040,00 / mês**

**💰 TOTAL DO CENÁRIO 2: ~R$ 16.540,00 / mês** (Totalmente insustentável para um app de cidade, consumindo quase todo o lucro bruto).

---

## 🎯 3. SOLUÇÃO: Como Derrubar os Custos em 95%

Pagar R$ 16.000,00 por mês ao Google e reverter seu lucro é um erro comum e amador em apps tipo Uber não otimizados. Nós adotamos estratégias técnicas avançadas para que o teto de gastos nunca chegue a esse nível:

### Estratégia 1: Uso de Alternativas Híbridas (Mapbox + Google)
> [!TIP]
> **Economia de R$ 6.000 a R$ 15.000 por mês**

Em vez de usar tudo no Google, usamos as melhores tecnologias gratuitas/mais baratas do mercado combinadas:
1. **Mapbox (O Preferido de Grandes Apps):** Fornece 100.000 requisições matemáticas e de endereços DE GRAÇA por mês. Ultrapassado o limite, custa $0.50 contra os $17.00 do Google. Usamos o Mapbox para o Autocomplete (pesquisa do logradouro).
2. **Cálculo em Linha Reta (Haversine Formula):** Para dar a "Prévia de Preço de Corrida" para o passageiro, em vez de consultar a API cara do Google toda vez, usamos cálculo matemático direto pelo servidor (linha reta x taxa de curvas da cidade), custando **R$ 0,00**. Apenas quando o motorista ACEITA usamos o algoritmo de roteamento do Google/Mapbox.

### Estratégia 2: Pinos de Mapa vs Digitação
Se o usuário arrasta o pino no mapa em vez de ficar digitando o endereço letra por letra, nós usamos as coordenadas de GPS puras direto para encontrar o motorista (sem cobrar requisição de geocoding textuais caríssimas do Google).

### Custos REAIS após as otimizações no Motojá
Ao adotar a arquitetura otimizada acima, os custos operacionais da infraestrutura do app despencam:

| Componente | 50 Motoristas (24.000 corridas) | 100 Motoristas (48.000 corridas) |
| :--- | :--- | :--- |
| **Servidores Backend/Banco** | R$ 375,00 | R$ 500,00 |
| **API Mapbox (Autocomplete/Endereços)** | R$ 0,00 (Abaixo cota gratuíta) | R$ 0,00 |
| **API Google Maps (Rotas finais do Motorista)** | R$ 0,00 (Coberto pelo bônus de $200) | R$ 150,00 (Levemente passando bônus) |
| **Custo Fixado T.I. MENSAL ESTIMADO** | **~ R$ 375,00** | **~ R$ 650,00** |

> [!IMPORTANT]
> **A Vantagem Competitiva da nossa Arquitetura:** 
> Com escalabilidade inteligente e arquitetura híbrida, **é totalmente possível manter uma frota de 50 a 100 motoristas rodando massivamente na cidade pagando menos de 1 salário mínimo (menos de R$ 700/mês) de infraestrutura em nuvem.** Isso protege a margem de lucro e garante longevidade financeira.
