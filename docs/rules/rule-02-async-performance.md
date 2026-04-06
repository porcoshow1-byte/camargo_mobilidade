# Rule 02: Performance e Concorrência Async (Mototaxi Millenio)

## MOTIVO
Garantir que a Interface do Usuário (UI) nunca trave por operações bloqueantes e que o App permaneça responsivo.

## GATILHO
Ativado ao criar chamadas API, hooks de dados (`useEffect`), ou manipulação de arquivos grandes.

## DIRETRIZES TÉCNICAS
1.  **Non-Blocking UI:** Nunca realize cálculos pesados na Main Thread do JavaScript. Use Web Workers se necessário.
2.  **Promise.all:** Ao buscar dados independentes (ex: Perfil e Notificações), faça em paralelo, não em sequência/cascata.
3.  **Feedback Visual:** Toda operação async > 200ms deve ter um estado de `loading` ou Skeleton UI.

## EXEMPLO ERRADO (Waterfall)
```typescript
// ❌ ERRADO: Espera um terminar para começar o outro
const loadData = async () => {
    const user = await fetchUser(); // Demora 1s
    const rides = await fetchRides(); // Demora 1s (Total 2s)
    setUser(user);
    setRides(rides);
};
```

## EXEMPLO CORRETO (Parallel)
```typescript
// ✅ CORRETO: Executa em paralelo
const loadData = async () => {
    setLoading(true);
    try {
        const [user, rides] = await Promise.all([
            fetchUser(),
            fetchRides()
        ]);
        setUser(user);
        setRides(rides);
    } finally {
        setLoading(false);
    }
};
```
