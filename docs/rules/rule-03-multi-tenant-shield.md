# Rule 03: Blindagem Multi-Tenant / User Isolation (Mototaxi Millenio)

## MOTIVO
Evitar vazamento de dados entre usuários ou empresas (ex: Um motorista ver o histórico de outro).

## GATILHO
Ativado ao criar queries Supabase, Policies RLS, ou lógica de Admin.

## VERIFICAÇÕES OBRIGATÓRIAS
1.  **Cláusula de Dono:** Toda query que busca dados privados deve ter `.eq('user_id', currentUser.id)` ou confiar na RLS.
2.  **RLS Enforcer:** Nunca desabilite RLS para "facilitar". Se precisar de acesso Admin, crie uma Policy específica para Admins.
3.  **Contexto Seguro:** O `user_id` deve vir do Contexto de Autenticação (`useAuth`), SÓ use IDs vindos de URL/Params se houver validação de permissão subsequente.

## EXEMPLO ERRADO
```typescript
// ❌ ERRADO: Confia cegamente no ID que vem da UI/URL
const getRideHistory = async (targetUserId: string) => {
    // Se eu passar o ID de outro usuário, eu vejo os dados dele?
    const { data } = await supabase.from('rides').select('*').eq('user_id', targetUserId); 
    return data;
}
```

## EXEMPLO CORRETO
```typescript
// ✅ CORRETO: Garante que só busca dados do usuário logado OU delega para RLS
const getRideHistory = async () => {
    const { user } = useAuth();
    if (!user) throw new Error("Unauthorized");

    // Mesmo que alguém tente injetar outro ID, a RLS no banco deve bloquear.
    // Mas no front, forçamos o filtro também por segurança.
    const { data } = await supabase.from('rides').select('*').eq('user_id', user.id);
    return data;
}
```
