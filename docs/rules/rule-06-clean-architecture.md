# Rule 06: Arquitetura Limpa (Mototaxi Millenio)

## MOTIVO
Combater arquivos "God Class" (como `UserApp.tsx` gigante) e duplicidade de lógica. Facilitar testes e manutenção.

## GATILHO
Ativado ao criar novos componentes complexos ou refatorar telas grandes.

## ESTRUTURA DE CAMADAS (React)
1.  **Presentation (UI):** Componentes (`/components`, `/screens`) só devem se preocupar com *renderização* e *eventos*. Não devem ter regras de negócio complexas.
2.  **Domain/Services (`/services`):** Regras de negócio puras (ex: cálculo de preço, validação de cupom). Funções puras sempre que possível.
3.  **Data/Hooks (`/hooks`):** Conexão com Supabase, Gestão de Estado, Efeitos Colaterais. O Componente chama o Hook, que chama o Service.

## EXEMPLO ERRADO (Lógica Acoplada)
```typescript
// UserApp.tsx
const handleRideRequest = async () => {
    // ❌ Lógica de negócio misturada na UI
    if (balance < price) {
        alert("Saldo insuficiente");
        return;
    }
    const { error } = await supabase.from('rides').insert(...); // ❌ Acesso direto a dados
}
```

## EXEMPLO CORRETO (Separação)
```typescript
// services/pricing.ts (Pura)
export const canAffordRide = (balance: number, price: number) => balance >= price;

// hooks/useRide.ts (Data)
export const useRide = () => {
    const createRide = async (data) => supabase.from('rides').insert(data);
    return { createRide };
}

// UserApp.tsx (UI)
const handleRideRequest = () => {
    const { createRide } = useRide();
    
    if (!canAffordRide(balance, price)) {
        alert("Saldo Insuficiente"); // UI Feedback
        return;
    }
    createRide(rideData);
}
```
