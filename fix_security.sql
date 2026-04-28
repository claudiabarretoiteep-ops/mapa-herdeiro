-- CORREÇÃO DE SEGURANÇA (SECURITY DEFINER)
-- Rodar este script no SQL Editor do Supabase para corrigir o erro "Row-Level Security".

CREATE OR REPLACE FUNCTION public.grant_initial_ebook_access()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.leads_access (email, allowed_ebooks)
    VALUES (NEW.email, ARRAY['vcs-nao-esta-perdido'])
    ON CONFLICT (email) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Garante que o trigger antigo seja substituído corretamente pela versão com privilégios.
DROP TRIGGER IF EXISTS tr_grant_initial_access ON public.leads;
CREATE TRIGGER tr_grant_initial_access
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.grant_initial_ebook_access();
