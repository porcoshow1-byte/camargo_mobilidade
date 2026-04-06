# Rule 01: Isolamento de Segurança (Mototaxi Millenio)

## MOTIVO
Impedir o erro histórico de expor chaves sensíveis ou permitir que o frontend ignore a camada de lógica de segurança (RLS).

## GATILHO
Ativado ao criar ou modificar arquivos em `/src`, `/components`, ou qualquer código client-side que interaja com Supabase.

## RESTRIÇÕES INEGOCIÁVEIS
1.  **Proibição de Service Role no Front:** Nunca, sob qualquer pretexto, utilize a `SUPABASE_SERVICE_ROLE_KEY` no client-side.
2.  **Escrita Protegida:** O frontend não deve realizar operações críticas (ex: saldo de carteira, status de pagamento) diretamente via `.update()` se não houver uma RLS restrita. Prefira Edge Functions para operações financeiras.
3.  **RLS Obrigatória:** Toda tabela nova deve ter RLS ativado (`ALTER TABLE x ENABLE ROW LEVEL SECURITY`).

## PADRÃO DE AUTENTICAÇÃO
Use a sessão do Supabase (`supabase.auth.getSession`) para validar identidade. Nunca confie em `localStorage` para autorização crítica.

## EXEMPLO ERRADO
```typescript
// ❌ ERRADO: Chave de service role no cliente
const supabase = createClient(URL, 'service_role_key_exposta');

// ❌ ERRADO: Update direto em saldo financeiro
await supabase.from('users').update({ wallet_balance: 999999 }).eq('id', userId);
```

## EXEMPLO CORRETO
```typescript
// ✅ CORRETO: Cliente anônimo + RLS
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

// ✅ CORRETO: Operação sensível via Edge Function (RPC ou Function)
await supabase.functions.invoke('process-payment', {
  body: { amount: 100, rideId: '...' }
});
```
