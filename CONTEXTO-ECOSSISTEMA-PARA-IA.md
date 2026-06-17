# 📦 CONTEXTO COMPLETO DO ECOSSISTEMA DIGITAL — PARA ORGANIZAÇÃO COM IA

> **Como usar este documento:** cole o conteúdo inteiro no ChatGPT (ou outra IA) e use o pedido que está no final (seção 13). Ele contém **tudo** que já existe hoje no ecossistema digital do Instituto Marcos Barreto / ITEEP / Kehilah Teshuvá, levantado diretamente das contas de produção (Supabase, Vercel, Notion, Google Drive) em 17/06/2026.
>
> _Observação de segurança: nenhum dado sensível (senhas, tokens, dados pessoais) foi incluído aqui. Pode compartilhar com tranquilidade._

---

## 1. QUEM SOMOS (contexto institucional)

Somos um ecossistema de ensino e cuidado espiritual com **três marcas** que hoje funcionam de forma parcialmente integrada:

- **Kehilah Teshuvá** — comunidade/congregação (eventos, Shiur semanal, festas bíblicas).
- **ITEEP — Escola de Profetas** — instituto de ensino (cursos, capelania).
- **Instituto Marcos Barreto** — marca-mãe de conteúdo e produtos do **Rabino Marcos Barreto** e da **Pra. Cláudia Barreto**.

Liderança e pessoas-chave citadas nos sistemas:
- **Rabino Marcos Barreto** — ensino bíblico com fundamento hebraico (raízes, identidade, herança, governo espiritual).
- **Pra. Cláudia Barreto** — gestão/operação (recebe os disparos internos; contato +55 37 99149-4464).
- **Pra. Maiza Feledy (Dra.)** — psicanalista, criadora do **Método Tikkun**.

Terminologia obrigatória da marca: **D'us** (nunca "Deus"), **Yeshua** (nunca "Jesus"), **S-nhor**, **Shiur** (a live semanal, quintas 19h30), **Raízes do Reino** (nunca "Formação Shoresh").

---

## 2. PRODUTOS E OFERTAS

| Produto | O que é | Preço |
|---|---|---|
| **DNA do Herdeiro** | Quiz/diagnóstico gratuito → análise paga | Grátis → **R$197** |
| **Coleção Eixos** (0 a 5) | 6 ebooks + audiolivros de "realinhamento" | **R$27–47/eixo** ou **R$197** a coleção |
| **Mapa do Herdeiro** | Jornada/experiência principal | — |
| **Sala do Mapa** | Comunidade/grupo + conteúdo | — |
| **Raízes do Reino / Raízes da Identidade** | Formação séria / diagnóstico | — |
| **Método Tikkun** | Formação em psicanálise integrativa com fé (Pra. Maiza) — 4 fases, 12 meses, dupla certificação **Anhanguera (MEC) + Instituto Marcos Barreto** | **R$4.997** |
| **Eventos Teshuvá** | Conferências, festas bíblicas, encontros | Pago/gratuito |

Os 6 Eixos: **0** (Você Não Está Perdido) · **1** (Fé Herdada ou Compreendida) · **2** (Promessa Não É Estrutura) · **3** (Governo Começa Dentro) · **4** (Prosperar Sem Culpa) · **5** (Teshuvá: O Retorno ao Eixo).

**Pagamentos:** todos via **Voomp** (`pay.voompcreators.com.br`), com webhook que processa a compra automaticamente.

---

## 3. DOMÍNIOS E SUBDOMÍNIOS (4 domínios raiz)

| Subdomínio | Finalidade | Status |
|---|---|---|
| `mapadoherdeiro.com.br` + `www` | Site/landing principal + leitor de eixos + painel admin | ✅ Produção |
| `hub.mapadoherdeiro.com.br` | Hub central de entrada | ✅ |
| `dna.mapadoherdeiro.com.br` | DNA do Herdeiro (diagnóstico) | ✅ |
| `acesso.mapadoherdeiro.com.br` | Vitrine/portão de acesso a produtos | ✅ |
| `capelania.iteep.com.br` | Webapp da Capelania (ITEEP) | ✅ |
| `eventos.teshuva.com.br` | Inscrição/RSVP de eventos Teshuvá | ✅ |
| `teruma.teshuva.com.br` | Terumá (contribuições) | ✅ |
| `analise.maozdigital.com.br` | Dashboard analítico interno | ✅ |

Há ainda ~12 projetos rodando só em `*.vercel.app` (sem domínio próprio).

---

## 4. PROJETOS PUBLICADOS (20 no total — Vercel)

**Principais (com dados/uso real):**
- `sala-do-mapa` → site principal + admin (leads, jornada, presenças) — **o mais completo (~85%)**
- `dna-do-herdeiro` → diagnóstico DNA (95 análises)
- `eventos-teshuva` → eventos (72 RSVPs)
- `teruma-site` → contribuições (339 registros)
- `capelania-webapp` → capelania (publicado, ainda sem dados)
- `anamnese` → anamnese do Tikkun

**Apoio / gestão / conteúdo:** `hub-mapadoherdeiro`, `mapa-herdeiro-hub` (DUPLICADO), `central-estrategica`, `bmad-dashboard`, `vitrine-acesso`, `frontend-landing` (DUPLICADO), `sala-do-mapa-check`, `sala-do-mapa-newsletter`, `deploy-eixos`, `rabino-audios`, `carroseis-saladomapa`, `espelho`, `raizes-da-identidade`, `apps-celular`.

> ⚠️ **Duplicidades a resolver:** 2 hubs e 2 landings cumprindo papel parecido.

---

## 5. BANCO DE DADOS (Supabase — 37 tabelas, dados reais)

Dois projetos: **`mapadoherdeiro`** (ATIVO, Postgres 17, é a fonte de tudo) e **`teshuva-eventos`** (INATIVO/pausado).

Contagens reais das tabelas com dados (junho/2026):

**CRM / Leads**
- `ig_leads` — **233** (leads do Instagram)
- `leads` — 8 · `leads_access` — 6 · `jornada_lead` — 2 · `visitantes` — 8 · `lead_qualifications` — 0

**Agente Orah (conversas WhatsApp)**
- `orah_messages` — **2.336** · `orah_users` — 46 · `orah_memory` — 36 · `mensagens` — 21 · `conversa_estado` — 6

**DNA do Herdeiro**
- `dna_events` — **~2.307** · `dna_analyses` — **95**

**Método Tikkun**
- `tikkun_candidatos` — 10 · `tikkun_anamnese` — 8 · `tikkun_anamnese_v2` — 4 (DUPLICADO) · `tikkun_relatorios` — 6

**Eventos**
- `eventos_rsvp` — **72** · `eventos_financeiro` — **59** · `eventos` — 0 · `confirmacoes` — 0 · `live_checkin`/`live_checkins` — 0/0 (DUPLICADO)

**Financeiro / Contribuições**
- `numeros_teruma` — **339** · `financeiro` — 0 (estrutura criada, sem uso)

**Comunicação**
- `newsletter_subscribers` — **39** · `newsletter_sends` — 8 · `grupo_mensagens` — 6 · `grupo_resumos` — 0

**Presença / Pesquisa / Novos diagnósticos**
- `shiur_presenca` — **25** · `fase2_respostas` — 17 · `pesquisa_estrategica` — 7 · `espelho_respostas` — 0 · `raizes_respostas` — 0 · `rute_clientes` — 0 · `capelania_inscricoes` — 0

**Arquivos (Storage, 4 buckets):** `tikkun-audio` (97 áudios) · `newsletters` (7) · `dna-pdfs` (3) · `assets` (1).
**Contas admin:** 2 usuários.

> ⚠️ Hoje "lead / aluno / membro / cliente / paciente Tikkun" estão em tabelas separadas — **não há um cadastro único de pessoa**.

---

## 6. AGENTES DE IA (5 + roteador) — todos funcionando

Rodam como funções no Supabase, recebem mensagens do WhatsApp via **Z-API** e respondem com **Claude (modelo claude-sonnet-4-6)**. Áudios são transcritos com **OpenAI Whisper**.

| Agente | Função | Para quem trabalha | Status |
|---|---|---|---|
| **Orah** | Atendimento/conversação principal com o público | Público geral (Sala do Mapa) | ✅ Maduro (2.336 msgs) |
| **Esdras** | Inteligência de conteúdo: pesquisa Google Trends + YouTube e gera briefings, roteiros, headlines, ganchos | Equipe do Rabino (Cláudia + social media) | ✅ Ativo |
| **Miriã** | Igual ao Esdras, mas para o **Método Tikkun** (saúde emocional, cura interior, psicanálise + fé) | Pra. Maiza + equipe Tikkun | ✅ Ativo |
| **Lucas** | Editorial | Interno (grupo WhatsApp) | ✅ |
| **Rute** | Vendas e Customer Success | Interno (grupo WhatsApp) | ✅ |
| **dispatcher** | Roteia cada mensagem do WhatsApp para o agente certo conforme o grupo | — | ✅ |

Capacidades reais dos agentes de conteúdo (Esdras/Miriã): acessam **Google Trends Brasil** e **YouTube Data API** ao vivo, leem URLs enviadas, geram briefing diário e respondem comandos como `briefing`, `roteiro [tema]`, `pauta semana`, `headlines`, `hooks`, `caixinhas`.

---

## 7. AUTOMAÇÕES (26 funções ativas no Supabase)

Não usamos **n8n** — a orquestração é via funções Supabase + o `dispatcher`. WhatsApp via **Z-API**.

- **Pagamentos:** `voomp-webhook` (processa compra), `eixo-webhook`
- **Agentes:** `dispatcher`, `orah-webhook`, `esdras-webhook`, `miriam-webhook`, `lucas-webhook`, `rute-webhook`
- **Diagnósticos/relatórios:** `generate-analysis`, `get-analysis`, `generate-pdf`, `generate-tikkun-report`, `gerar-espelho`, `gerar-raizes`
- **Comunicação:** `send-shiur-resumo` (resumo do Shiur no WhatsApp), `send-free-diagnostic`, `send-newsletter`, `upload-newsletter`, `notify-lead`, `followup-leads`, `visitor-followup`
- **Instagram:** `qualificar-ig`, `relatorio-ig`
- **Eventos/outros:** `live-checkin`, `process-pending`, `test-audio-transcribe`

---

## 8. WHATSAPP

- Grupo público **"Sala do Mapa"** (link de convite ativo) + atendimento direto (+55 37 99149-4464).
- Número dos agentes (Orah/Esdras): **+55 37 99996-7308**.
- Grupos internos mapeados no roteador: um para **Lucas (Editorial)**, um para **Rute (Vendas/CS)**, um para **Miriã (Tikkun)**.
- Disparos automáticos via **Z-API** (resumos de Shiur, briefings diários dos agentes de conteúdo).

---

## 9. INTEGRAÇÕES CONECTADAS (estado de cada uma)

| Ferramenta | Uso hoje | Situação |
|---|---|---|
| **Supabase** | Banco + agentes + automações | ✅ Núcleo do ecossistema |
| **Vercel** | Hospedagem dos 20 sites | ✅ Núcleo |
| **Voomp** | Checkout/pagamentos | ✅ Operacional |
| **Z-API** | WhatsApp (agentes e disparos) | ✅ Operacional |
| **Claude + OpenAI** | Cérebro dos agentes / transcrição | ✅ |
| **Google Trends + YouTube API** | Pesquisa de conteúdo (Esdras/Miriã) | ✅ |
| **Notion** | Conteúdo: Coleção Eixos (Eixo 1–5), geradores de roteiro, ganchos com IA | ✅ Ativo |
| **Google Drive** | Documentos-fonte: livro "O Herdeiro e o Escravo", Pesquisas de Mercado Tikkun, "Espelho Tikkun — 4 Perfis e Cartas", "Cartas Raízes da Identidade", VSL do DNA, vídeos de Shiur, Playbooks | ✅ Rico, mas solto |
| **Google Calendar** | Agendas: Edição de Vídeos, Pagamentos mensais, Tarefas Escola e Igreja, Masterclasses | ✅ Operacional |
| **Google Sheets** | Recebe cópia dos leads via webhook | ✅ |
| **HubSpot** | CRM (conectado) | ⚠️ Conectado, uso a confirmar |
| **Gmail** | E-mail | ✅ Conectado |
| **Airtable** | Só uma base pessoal "Meu GTD" | ⚪ Pouco usado |
| **Cloudflare** | Sem Workers, sem D1, R2 desabilitado | ⚪ Praticamente não usado |

---

## 10. CONTEÚDO / BIBLIOTECA

- 6 Eixos (ebooks em texto + audiolivros — só o Eixo 0 com áudio completo; demais parciais).
- PDFs de entrega por eixo + coleção completa.
- Livro **"O Herdeiro e o Escravo"** (em produção no Drive).
- 97 áudios do Tikkun, 7 newsletters, carrosséis prontos.
- Canais externos: YouTube, Instagram, Spotify, TikTok do Rabino.
- Certificados gerados por script (com rubricas do Rabino e da Pra. Cláudia).

---

## 11. PROCESSOS QUE AINDA DEPENDEM DE AÇÃO MANUAL

- Disparo do resumo do Shiur (semi-automático: botão no admin).
- Emissão de certificados (scripts rodados à mão).
- Cobrança, recibo e controle de inadimplência (fora do sistema).
- Inscrição da Capelania (app existe, fluxo de dados não ativado).
- Consolidação de relatórios entre os vários projetos (cada um isolado).
- Aniversários / datas comemorativas (não existe automação).

---

## 12. PROBLEMAS CONHECIDOS (para a IA priorizar)

1. **Falta um cadastro único de pessoas** — lead/aluno/membro/cliente/paciente em tabelas separadas.
2. **Duplicidades:** 2 hubs, 2 landings, `tikkun_anamnese` vs `_v2`, `live_checkin` vs `live_checkins`.
3. **Sem portal administrativo central** — gestão espalhada em 20 projetos.
4. **Financeiro não consolidado** — Voomp + eventos + Terumá não convergem para um lugar só; sem recibos/inadimplência.
5. **Projeto `teshuva-eventos` (Supabase) está inativo** — decidir migrar ou reativar.
6. **Capelania, Espelho e Raízes** criados mas sem dados (fluxo a ativar).
7. **Segurança:** há credenciais de integração (Z-API) escritas direto no código de algumas funções — precisam migrar para variáveis de ambiente/secrets.
8. **Sem login único (SSO)** entre os portais.

---

## 13. O QUE EU QUERO QUE VOCÊ (IA) FAÇA

Com base em **todo** o contexto acima, me ajude a **organizar este ecossistema de forma definitiva**. Especificamente:

1. **Proponha uma arquitetura unificada** que junte Kehilah Teshuvá + ITEEP + Instituto Marcos Barreto (incluindo o Método Tikkun) em um único **Portal Administrativo Central**, reaproveitando o que já existe (não recomende reconstruir do zero).
2. **Desenhe o modelo de "cadastro único de pessoa"** (com papéis: lead, aluno, membro, cliente, paciente Tikkun, capelão, equipe) e diga como ligar as tabelas atuais a ele.
3. **Liste o que consolidar/eliminar** (duplicidades de hubs, landings e tabelas) e em que ordem.
4. **Proponha o módulo financeiro** unificando Voomp + eventos + Terumá, com recibos e inadimplência.
5. **Sugira um roadmap em fases** (o que fazer primeiro, segundo, terceiro), com esforço estimado e dependências.
6. **Aponte riscos** (incluindo o de segurança das credenciais no código) e como mitigar.
7. Faça **perguntas de esclarecimento** sobre qualquer ponto marcado como "a confirmar" antes de finalizar a proposta.

Objetivo final: ter **uma visão única e um plano claro** para sair de 20 projetos soltos para **um ecossistema administrativo integrado**.
