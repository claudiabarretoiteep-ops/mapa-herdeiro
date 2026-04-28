-- 1. Criar a tabela de acesso aos ebooks
CREATE TABLE IF NOT EXISTS public.leads_access (
    email TEXT PRIMARY KEY,
    allowed_ebooks TEXT[] DEFAULT ARRAY['vcs-nao-esta-perdido'],
    last_access TIMESTAMPTZ DEFAULT NOW(),
    purchase_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar RLS (Segurança de Nível de Linha)
ALTER TABLE public.leads_access ENABLE ROW LEVEL SECURITY;

-- 3. Criar política de leitura pública (necessário para consulta pelo site)
CREATE POLICY "Leitura pública de acessos" ON public.leads_access
FOR SELECT USING (true);

-- 4. Função para dar acesso automático ao Ebook 1 para novos leads
CREATE OR REPLACE FUNCTION public.grant_initial_ebook_access()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.leads_access (email, allowed_ebooks)
    VALUES (NEW.email, ARRAY['vcs-nao-esta-perdido'])
    ON CONFLICT (email) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Trigger para disparar a função quando um lead for criado na tabela 'leads'
DROP TRIGGER IF EXISTS tr_grant_initial_access ON public.leads;
CREATE TRIGGER tr_grant_initial_access
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.grant_initial_ebook_access();

-- 6. Adicionar acesso manualmente para os leads que já existem
INSERT INTO public.leads_access (email, allowed_ebooks)
SELECT email, ARRAY['vcs-nao-esta-perdido'] FROM public.leads
ON CONFLICT (email) DO NOTHING;
