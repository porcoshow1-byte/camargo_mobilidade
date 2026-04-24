# Plano de Expansão: Frota Híbrida Millenio
*Estratégia para aumentar o faturamento sem perder a base fiel de motoboys veteranos.*

---

## 🎯 O Desafio
A Mototáxi Millenio possui 46 motoboys "fundadores" extremamente fiéis, que rodam mediante o pagamento de uma **Diária Fixa (R$ 20/dia)** e recusam veementemente a adesão ao modelo moderno de **Comissão por Corrida (%)**. Ao mesmo tempo, a administração precisa atrair dezenas de novos pilotos (motos e carros) para escalar a operação, e este novo público busca o modelo livre de diárias (pagar apenas taxa por corrida concluída).

## 💡 A Solução: Modelo de Múltiplos Planos
É perfeitamente possível e altamente recomendável que o aplicativo seja configurado para operar com **Perfis de Repasse Customizados**.
O sistema não precisa obrigar todos a estarem sob a mesma regra.

### 🛡️ 1. Categoria "Piloto Fundador" (Os 46 Originais)
- **Regra de Cobrança:** 0% de comissão no aplicativo.
- **Acordo Financeiro:** O aplicativo não desconta nada de suas corridas. Eles mantêm a obrigação tradicional de pagar os R$ 20,00 da diária (por fora, PIX ou na central).
- **Vantagem Master (Fator Retenção):** O algoritmo os classificará com **Prioridade de Despacho Nível 1**. 

### 🚀 2. Categoria "Piloto Parceiro" (A Nova Frota e Carros)
- **Regra de Cobrança:** Paga comissão progressiva (ex: 12% a 15% do valor da corrida).
- **Acordo Financeiro:** Livre de qualquer diária. Atrai os famosos "pilotos de fim de semana" ou frotas de carros sem que se assustem com compromisso diário. O app desconta a taxa automaticamente da carteira virtual deles a cada corrida finalizada.
- **Despacho:** Prioridade Nível 2.

---

## ⚙️ Como a Tecnologia do Aplicativo Resolve o Conflito?

Para justificar aos 46 motoboys originais o motivo da entrada de "novatos", nós usaremos uma engenharia de inteligência chamada **Despacho em Cascata (Cascading Dispatch)**. 

### O Algoritmo de Priorização

1. **O Passageiro pede a corrida.**
2. **Ping Nível 1 (Fundadores):** O servidor busca os Motoristas Fundadores (os 46) que estiverem em um raio de 2km. O celular DELES toca primeiro durante os primeiros **10 segundos**. Como eles têm taxa 0%, para eles é a chance de pegar lucros limpos nas melhores corridas.
3. **Ping Nível 2 (Parceiros Novos):** Se nenhum dos 46 Fundadores aceitar (porque estão ocupados ou longe), o raio abre para 5km e a chamada passa a tocar nos celulares da nova frota (aqueles que pagam %), garantindo que o passageiro nunca fique sem atendimento.

### Vantagens do Algoritmo em Cascata
* **Fim das Reclamações:** Os 46 motoboys antigos vão *agradecer* pelo app, porque ele garante a eles o monopólio das chamadas. Eles "escolhem" a corrida primeiro e justificam totalmente a diária paga.
* **Geração de Receita para a Base:** As corridas "sobra", os picos de trânsito repentino e os dias de chuva (onde sobram passageiros e faltam os 46 originais) serão cobertos pela nova frota terceirizada de carros e motos que pagam gordas comissões ao seu cliente. O melhor dos dois mundos.

---

## 🛠️ Ajustes Necessários no App 
(O que já estará coberto pela nossa entrega técnica):

1. **Cadastro Individual de Taxas:** No seu Painel de Administração Web, ao aprovar um novo motorista, haverá um campo de "Taxa Dinâmica". Bastará o gestor manter os 46 originais com `Taxa: 0` e colocar `Taxa: 15` nos novatos.
2. **Flag de Prioridade:** Vamos embutir uma "Tag" de grupo na ficha de cadastro do motorista, separando o grupo Fundador (Level 1) da Frota B (Level 2).
3. **Gestão Híbrida de Caixa:** O dashboard deixará claro quanto da plataforma girou sem comissão (referente aos R$ 20 pagos por fora direto pro dono) e quanto de saldo das % das corridas dos motoristas novos a base faturou no dia.
