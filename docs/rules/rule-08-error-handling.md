# Rule 08: Tratamento de Erros com Contexto (Mototaxi Millenio)

## MOTIVO
Evitar "telas brancas" (crashes), loadings infinitos e erros silenciosos que dificultam o suporte.

## GATILHO
Ativado ao criar blocos `try/catch` ou chamadas API.

## PRINCÍPIOS OBRIGATÓRIOS
1.  **Zero Swallow:** Nunca faça `catch (e) { console.log(e) }` e siga em frente como se nada tivesse acontecido. O usuário precisa saber (feedback visual) ou o erro deve ser tratado.
2.  **Feedback ao Usuário:** Se uma ação falha, mostre um Toast, Alert ou Estado de Erro na UI. Não deixe o botão em "loading" para sempre.
3.  **Log Estruturado:** Use `console.error` com contexto (Nome da Função, Parâmetros que causaram erro).

## EXEMPLO ERRADO
```typescript
try {
    await api.post('/ride');
} catch (e) {
    // ❌ Erro silencioso. O usuário clica e nada acontece.
}
```

## EXEMPLO CORRETO
```typescript
try {
    await api.post('/ride');
} catch (error: any) {
    // ✅ Log Técnico
    console.error('[CreateRide] Falha ao solicitar corrida:', error.message, { userId, price });
    
    // ✅ Feedback Visual
    toast.error("Não foi possível solicitar a corrida. Tente novamente.");
    
    // ✅ Estado Consistente
    setLoading(false);
}
```
