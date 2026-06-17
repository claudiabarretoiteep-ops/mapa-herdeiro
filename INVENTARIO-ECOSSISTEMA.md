# 🗺️ INVENTÁRIO COMPLETO DO ECOSSISTEMA DIGITAL

> **Mapa do Herdeiro · Kehilah Teshuvá · ITEEP · Capelania · Instituto Marcos Barreto**
> Levantamento técnico real, extraído diretamente das contas de produção (Supabase + Vercel + código-fonte).
> Data do levantamento: **17/06/2026**
> Objetivo: ter a visão completa do patrimônio digital **antes** de construir o Portal Administrativo Central.

> ⚠️ **Nota de método.** Este inventário foi montado a partir do que é **verificável tecnicamente**: o repositório de código, o banco Supabase de produção, os projetos publicados na Vercel e as integrações conectadas. Itens que vivem **fora** desses sistemas (grupos de WhatsApp, contas de e-mail, planilhas soltas, processos manuais na cabeça das pessoas) estão marcados como **[a confirmar com a equipe]**. Contagens de registros são exatas onde indicado; estimativas do banco estão marcadas com `~`.

---

## 📊 RESUMO EXECUTIVO

| Camada | O que existe | Situação |
|---|---|---|
| **Domínios raiz** | 4 (`mapadoherdeiro.com.br`, `iteep.com.br`, `teshuva.com.br`, `maozdigital.com.br`) | Em produção |
| **Projetos publicados (Vercel)** | 20 projetos | Quase todos com deploy de produção READY |
| **Banco de dados (Supabase)** | 2 projetos · 37 tabelas · 4 buckets de arquivos | 1 ativo, 1 inativo |
| **Agentes de IA** | 5 nomeados (Orah, Esdras, Miriam, Lucas, Rute) + 1 dispatcher | Orah é o mais maduro (~2.336 mensagens) |
| **Automações (Edge Functions)** | 26 funções ativas | Orquestração via `dispatcher`, não via n8n |
| **Pagamentos** | Voomp (checkout + webhook funcionando) | Operacional |
| **Conteúdo** | 6 eixos (ebooks + áudios), newsletters, carrosséis | Parcialmente publicado |

**Diagnóstico de uma frase:** o problema não é falta de sistema — é **falta de mapa e de unificação**. Já existe entre **50% e 65%** da infraestrutura de um ecossistema administrativo completo, porém espalhada em 20 projetos independentes, sem um portal central que costure tudo.

---

## 1. 🌐 DOMÍNIOS E SUBDOMÍNIOS

Quatro domínios raiz, com subdomínios apontando para projetos Vercel distintos.

| Subdomínio | Projeto Vercel | Finalidade | Tecnologia | Status |
|---|---|---|---|---|
| `mapadoherdeiro.com.br` + `www` | `sala-do-mapa` | Landing principal / Sala do Mapa / leitor de eixos / admin | React + Vite (este repositório) | ✅ Produção |
| `hub.mapadoherdeiro.com.br` | `hub-mapadoherdeiro` | Hub central (ponto de entrada do aluno/membro) | Estático/SPA | ✅ Produção |
| `dna.mapadoherdeiro.com.br` | `dna-do-herdeiro` | DNA do Herdeiro (diagnóstico/análise) | Vite | ✅ Produção |
| `acesso.mapadoherdeiro.com.br` | `vitrine-acesso` | Vitrine/portão de acesso a produtos | SPA | ✅ Produção |
| `capelania.iteep.com.br` | `capelania-webapp` | Webapp da Capelania (ITEEP) | SPA | ✅ Produção |
| `eventos.teshuva.com.br` | `eventos-teshuva` | Inscrição/RSVP de eventos Teshuvá | SPA | ✅ Produção |
| `teruma.teshuva.com.br` | `teruma-site` | Terumá (contribuições/números) | Vite | ✅ Produção |
| `analise.maozdigital.com.br` | `bmad-dashboard` | Dashboard de análise estratégica | Vite | ✅ Produção |

**Domínios sem custom domain (rodando em `*.vercel.app`):** `mapa-herdeiro-hub`, `central-estrategica`, `frontend-landing`, `sala-do-mapa-check`, `sala-do-mapa-newsletter`, `deploy-eixos`, `raizes-da-identidade`, `espelho`, `anamnese`, `apps-celular`, `carroseis-saladomapa`, `rabino-audios`.

> 🔎 **Observação:** existe duplicidade de "hubs" (`hub-mapadoherdeiro` **e** `mapa-herdeiro-hub`) e de landings (`sala-do-mapa` **e** `frontend-landing`). Forte candidato a consolidação.

---

## 2. 🗂️ PROJETOS EXISTENTES (20 projetos Vercel)

| Projeto | Objetivo | % estimado | Status |
|---|---|---|---|
| `sala-do-mapa` | Site principal + leitor de eixos + painel admin (leads, jornada, presenças) | **85%** | Ativo, este repo |
| `hub-mapadoherdeiro` | Hub/portal de entrada | 60% | Deploy ok, custom domain |
| `mapa-herdeiro-hub` | Segunda versão de hub (duplicado) | 40% | A consolidar |
| `dna-do-herdeiro` | Diagnóstico DNA do Herdeiro | **75%** | Ativo (95 análises) |
| `capelania-webapp` | App da Capelania | 50% | Publicado, tabela ainda vazia |
| `eventos-teshuva` | Eventos Teshuvá (RSVP/check-in) | **70%** | Ativo (72 RSVPs) |
| `teruma-site` | Terumá / contribuições | 65% | Ativo (339 registros) |
| `central-estrategica` | Central de estratégia/gestão | 40% | Deploy antigo |
| `bmad-dashboard` | Dashboard analítico (Maoz Digital) | 50% | Custom domain |
| `vitrine-acesso` | Vitrine de acesso a produtos | 55% | Custom domain |
| `anamnese` | Formulário de anamnese (Tikkun) | 60% | Publicado |
| `espelho` | Diagnóstico "Espelho" | 30% | Novo (jun/26) |
| `raizes-da-identidade` | Diagnóstico "Raízes da Identidade" | 30% | Novo (jun/26) |
| `sala-do-mapa-check` | Check-in da Sala do Mapa | 50% | Deploy recente |
| `sala-do-mapa-newsletter` | Newsletter da Sala do Mapa | 50% | Deploy recente |
| `deploy-eixos` | Hospedagem dos eixos (áudios/imagens) | — | Suporte |
| `rabino-audios` | Áudios do Rabino | — | Suporte |
| `carroseis-saladomapa` | Geração/hospedagem de carrosséis | — | Suporte |
| `apps-celular` | Apps mobile/atalhos | 20% | Novo (jun/26) |
| `frontend-landing` | Landing alternativa (duplicado) | 40% | A consolidar |

---

## 3. 🗄️ BANCO DE DADOS (Supabase)

**Dois projetos Supabase** na organização:

| Projeto | Ref | Região | Status |
|---|---|---|---|
| **mapadoherdeiro** | `idqwyfdkokrybdxcqzam` | us-east-1 | ✅ ACTIVE_HEALTHY (Postgres 17) |
| **teshuva-eventos** | `mmfpuiycxprvtewdaght` | us-east-2 | ⏸️ INACTIVE (pausado) |

### Projeto `mapadoherdeiro` — 37 tabelas (schema `public`)

Contagens **exatas** onde indicado; demais com `~` (estimativa do otimizador).

**🧑‍🤝‍🧑 Leads / CRM**
| Tabela | Registros | Usada por |
|---|---|---|
| `ig_leads` | **233** | Captação Instagram (`qualificar-ig`, `relatorio-ig`) |
| `leads` | **8** | Formulário do site + admin (Dashboard) |
| `leads_access` | **6** | Liberação de acesso a ebooks |
| `jornada_lead` | ~2 | Funil/jornada no admin |
| `visitantes` | ~8 | Rastreamento de visitantes |
| `visitor_followup` | ~2 | Follow-up automático |
| `lead_qualifications` | 0 | Qualificação (estrutura criada) |

**🤖 Agente Orah (conversacional)**
| Tabela | Registros | Observação |
|---|---|---|
| `orah_messages` | **2.336** | Histórico de conversas — maior tabela do sistema |
| `orah_users` | **46** | Usuários atendidos pela Orah |
| `orah_memory` | ~36 | Memória de longo prazo do agente |
| `orah_locks` | ~1 | Controle de concorrência |
| `mensagens` | ~21 | Mensagens genéricas |
| `conversa_estado` | ~6 | Estado das conversas (multi-agente) |

**🧬 DNA do Herdeiro**
| Tabela | Registros | Observação |
|---|---|---|
| `dna_events` | **~2.307** | Eventos de interação do diagnóstico |
| `dna_analyses` | **95** | Análises de DNA geradas |

**🩺 Tikkun (anamnese / relatórios)**
| Tabela | Registros |
|---|---|
| `tikkun_candidatos` | ~10 |
| `tikkun_anamnese` | **8** |
| `tikkun_relatorios` | ~6 |
| `tikkun_anamnese_v2` | ~4 |

**🎟️ Eventos**
| Tabela | Registros |
|---|---|
| `eventos_rsvp` | **72** |
| `eventos_financeiro` | **59** |
| `eventos` | 0 |
| `confirmacoes` | 0 |
| `live_checkin` / `live_checkins` | 0 / 0 (duplicado) |

**💰 Financeiro / Contribuições**
| Tabela | Registros |
|---|---|
| `numeros_teruma` | **339** |
| `financeiro` | 0 (estrutura criada) |

**📧 Newsletter / Comunicação**
| Tabela | Registros |
|---|---|
| `newsletter_subscribers` | **39** |
| `newsletter_sends` | ~8 |
| `grupo_mensagens` | ~6 (WhatsApp) |
| `grupo_resumos` | 0 |

**📋 Pesquisa / Presença / Novos diagnósticos**
| Tabela | Registros |
|---|---|
| `shiur_presenca` | **25** |
| `fase2_respostas` | ~17 |
| `pesquisa_estrategica` | ~7 |
| `espelho_respostas` | 0 (novo) |
| `raizes_respostas` | 0 (novo) |
| `rute_clientes` | 0 (agente Rute) |
| `capelania_inscricoes` | 0 (estrutura criada) |

**🔐 Autenticação & Arquivos**
- `auth.users`: **2** (contas admin)
- **Storage (4 buckets, 108 arquivos):** `tikkun-audio` (97) · `newsletters` (7) · `dna-pdfs` (3) · `assets` (1)

---

## 4. 📝 FORMULÁRIOS

| Formulário | Onde está | Envia para | Funciona? |
|---|---|---|---|
| Lista prioritária / captura de lead | `sala-do-mapa` (componente `FormSection`) | Supabase `leads` + webhook Google Sheets | ✅ Sim |
| Diagnóstico / Qualificação | `sala-do-mapa` (`#/diagnostico`) | `leads` + webhook Google Sheets | ✅ Sim |
| DNA do Herdeiro | `dna-do-herdeiro` | `dna_analyses` / `dna_events` | ✅ Sim (95 análises) |
| Anamnese (Tikkun) | `anamnese` | `tikkun_anamnese` | ✅ Sim |
| RSVP de Eventos | `eventos-teshuva` | `eventos_rsvp` | ✅ Sim (72) |
| Presença Shiur | rota `/presenca` (link parametrizado) | `shiur_presenca` | ✅ Sim (25) |
| Capelania (inscrição) | `capelania-webapp` | `capelania_inscricoes` | ⚠️ Publicado, **0 registros** |
| Espelho | `espelho` | `espelho_respostas` | ⚠️ Estrutura pronta, sem dados |
| Raízes da Identidade | `raizes-da-identidade` | `raizes_respostas` | ⚠️ Estrutura pronta, sem dados |
| Newsletter (inscrição) | `sala-do-mapa-newsletter` | `newsletter_subscribers` | ✅ Sim (39) |

---

## 5. 🤖 AGENTES DE IA

Os agentes rodam como **Supabase Edge Functions** (`*-webhook`), orquestrados por um `dispatcher`. Confirmados pelo deploy + tabelas:

| Agente | Função (inferida) | Hospedagem | Integração | Status |
|---|---|---|---|---|
| **Orah** | Agente conversacional principal (atendimento/jornada) | Edge Function `orah-webhook` (v45) | `orah_users`, `orah_messages` (2.336), `orah_memory` | ✅ Ativo e maduro |
| **Esdras** | Agente (provável ensino/conteúdo) | `esdras-webhook` (v10, JWT) | via `dispatcher` / `conversa_estado` | ✅ Ativo |
| **Miriam** | Agente (provável cuidado/capelania) | `miriam-webhook` (v6, JWT) | via `dispatcher` | ✅ Ativo |
| **Lucas** | Agente (provável vendas/relacionamento) | `lucas-webhook` (v1) | via `dispatcher` | 🟡 Recente |
| **Rute** | Agente (provável clientes/CRM) | `rute-webhook` (v1) | `rute_clientes` (vazia) | 🟡 Recente |
| **Dispatcher** | Roteia mensagens entre agentes | `dispatcher` (v1) | Orquestrador central | 🟡 Recente |

> 🔎 As funções dos agentes Esdras/Miriam/Lucas/Rute foram **inferidas** pelos nomes e tabelas — **[a confirmar com a equipe]** o papel oficial de cada um.

---

## 6. ⚙️ AUTOMAÇÕES (26 Edge Functions ativas)

Não foi encontrado **n8n** no código nem nas integrações — a orquestração hoje é feita por **Supabase Edge Functions** + o `dispatcher`. Disparos de WhatsApp usam **Z-API** (confirmado no código do admin de presenças).

| Função | Gatilho | Ação | Status |
|---|---|---|---|
| `voomp-webhook` | Compra na Voomp | Libera acesso / registra cliente | ✅ v15 |
| `eixo-webhook` | Evento de eixo | Processa acesso a eixos | ✅ |
| `dispatcher` | Mensagem recebida | Roteia para agente correto | ✅ |
| `orah-webhook` | Mensagem do usuário | Resposta do agente Orah | ✅ v45 |
| `esdras/miriam/lucas/rute-webhook` | Mensagem | Resposta do respectivo agente | ✅ |
| `generate-analysis` / `get-analysis` | Diagnóstico concluído | Gera/recupera análise (DNA) | ✅ v23 |
| `generate-pdf` | Análise pronta | Gera PDF do relatório | ✅ |
| `generate-tikkun-report` | Anamnese concluída | Relatório Tikkun | ✅ v17 |
| `gerar-espelho` / `gerar-raizes` | Form concluído | Gera resultado dos novos diagnósticos | ✅ |
| `send-shiur-resumo` | Botão no admin | Envia resumo do Shiur (WhatsApp/Z-API) | ✅ |
| `send-free-diagnostic` | Lead novo | Envia diagnóstico gratuito | ✅ |
| `send-newsletter` / `upload-newsletter` | Agendamento/upload | Disparo de newsletter | ✅ |
| `notify-lead` / `followup-leads` / `visitor-followup` | Novo lead/visitante | Notificação e follow-up | ✅ |
| `qualificar-ig` / `relatorio-ig` | Lead do Instagram | Qualifica e relata leads do IG | ✅ |
| `live-checkin` | Evento ao vivo | Check-in | ✅ |
| `process-pending` | Agendado | Processa fila pendente | ✅ |
| `test-audio-transcribe` | Teste | Transcrição de áudio | ✅ |

---

## 7. 📱 WHATSAPP

| Item | O que existe | Status |
|---|---|---|
| Grupo "Sala do Mapa" | Link de convite ativo (`chat.whatsapp.com/GklHlN6ObdAJcOEwauT0dB`) | ✅ |
| Atendimento direto | `wa.me/5537991494464` (Pra. Cláudia / ITEEP) | ✅ |
| Disparo de resumos | Via **Z-API** (`send-shiur-resumo`) | ✅ Funcional |
| Mensagens de grupo | Tabela `grupo_mensagens` (~6) + `grupo_resumos` | 🟡 Inicial |
| Agentes no WhatsApp | Orah e demais via `dispatcher` (webhooks) | ✅ Orah ativo |
| Links wa.me no admin | Dashboard gera link de contato por lead | ✅ |

> **[a confirmar com a equipe]:** quantos grupos/comunidades existem, qual número é o oficial da Evolution/Z-API, e quais agentes atuam em cada grupo. A "Evolution API" citada **não** aparece no código deste ecossistema — o que está confirmado é **Z-API**.

---

## 8. 💳 ÁREA FINANCEIRA

| Estrutura | Existe? | Onde / Como |
|---|---|---|
| Pagamentos / Checkout | ✅ | **Voomp** — checkout `pay.voompcreators.com.br` (6 produtos/eixos) + `voomp-webhook` que processa a compra |
| Recebíveis de eventos | ✅ | Tabela `eventos_financeiro` (59 registros) |
| Contribuições (Terumá) | ✅ | `teruma-site` + tabela `numeros_teruma` (339) |
| Financeiro geral | ⚠️ | Tabela `financeiro` criada, **0 registros** |
| Mensalidades / dízimos / ofertas | ❌ | Não há estrutura dedicada |
| Recibos / inadimplência | ❌ | Não existe |

---

## 9. 🎉 EVENTOS

| Recurso | Status |
|---|---|
| Inscrição / RSVP | ✅ `eventos-teshuva` → `eventos_rsvp` (72) |
| Financeiro do evento | ✅ `eventos_financeiro` (59) |
| Check-in ao vivo | 🟡 `live-checkin` (função) + `live_checkin`/`live_checkins` (tabelas vazias e duplicadas) |
| Catálogo de eventos | ⚠️ tabela `eventos` vazia (eventos provavelmente hardcoded) |
| Certificados | ✅ Geração de certificado existe (`certificado-herdeiro.html` + scripts `gerar-certificado-voomp`, `gerar-rubricas`) |
| Projeto Supabase dedicado | ⏸️ `teshuva-eventos` existe mas está **INACTIVE** |

---

## 10. 🚪 PORTAIS

| Portal | URL | Estado |
|---|---|---|
| Sala do Mapa (principal) | `mapadoherdeiro.com.br` | ✅ Mais completo (landing + leitor + admin) |
| Hub | `hub.mapadoherdeiro.com.br` | 🟡 Existe, papel a definir |
| Vitrine de Acesso | `acesso.mapadoherdeiro.com.br` | 🟡 Portão de produtos |
| Central Estratégica | `central-estrategica-*.vercel.app` | 🟡 Gestão interna, deploy antigo |
| Capelania | `capelania.iteep.com.br` | 🟡 Publicado, sem dados |

**Admin já pronto** (dentro do `sala-do-mapa`): login Supabase Auth, Dashboard de leads/jornada com exportação CSV, gestão de Eixos (links Voomp) e painel de Presenças Shiur com disparo de resumo. **Esta é a base natural do futuro Portal Administrativo Central.**

---

## 11. 📚 BIBLIOTECA E CONTEÚDO

| Conteúdo | Onde está | Status |
|---|---|---|
| 6 Eixos (Eixo 0 a 5) | Ebooks JSON em `src/data/` + leitor `#/ler-online` | ✅ |
| Áudios dos eixos (audiolivros) | `public/audio/eixo/...` (capítulos em texto; alguns `.mp3` prontos) | 🟡 Parcial (só Eixo 0 com áudio completo) |
| PDFs de entrega | `pdfs-entrega/` (coleção completa por eixo) | ✅ |
| Ebook "Vcs não está perdido" | `public/ebooks/vcs-nao-esta-perdido.pdf` | ✅ |
| Newsletters | Bucket Supabase `newsletters` (7 arquivos) | ✅ |
| Carrosséis | `carrossel-6a9/` + projeto `carroseis-saladomapa` | ✅ |
| Áudios Tikkun | Bucket `tikkun-audio` (97 arquivos) | ✅ |
| YouTube / Spotify / TikTok / Instagram | Links em `eixo.json` (canais do Rabino) | ✅ Externos |

---

## 12. ✋ PROCESSOS MANUAIS (candidatos a automação)

| Processo | Hoje | Automação possível |
|---|---|---|
| Disparo de resumo do Shiur | Semi-manual (botão no admin) | ✅ Já parcialmente automatizado (Z-API) |
| Cadastro de lead via grupo/Instagram | Manual + `qualificar-ig` | 🔧 Ampliar para todos os canais |
| Emissão de certificado | Scripts manuais (`.cjs`) | 🔧 Automatizar pós-evento |
| Cobrança / recibo | Manual (fora do sistema) | 🔧 Integrar Voomp → financeiro |
| Acompanhamento de inadimplência | Não existe | 🔧 Criar |
| Inscrição da Capelania | App existe mas sem fluxo de dados | 🔧 Ativar |
| Aniversários / datas | **[a confirmar]** — não detectado | 🔧 Criar |
| Consolidação de relatórios entre sistemas | Manual (cada projeto isolado) | 🔧 Portal Central |

---

## 13. 🧭 MAPA FINAL

### A) ✅ Já existe e pode ser reaproveitado
- **Banco unificado** no Supabase `mapadoherdeiro` com 37 tabelas e dados reais (Orah 2.336 msgs, DNA 95 análises, IG 233 leads, Terumá 339, Eventos 72).
- **Autenticação + Admin** funcionais (login, dashboard de leads, jornada, presenças, exportação CSV).
- **Pagamentos Voomp** com webhook operante.
- **Ecossistema de agentes de IA** (Orah maduro + dispatcher + 4 agentes).
- **26 automações** já no ar (geração de PDF, análises, newsletters, follow-ups, disparos WhatsApp).
- **Conteúdo** dos 6 eixos + áudios + carrosséis + biblioteca de arquivos.

### B) ⚠️ Existe mas precisa de correção/finalização
- **Duplicidades:** 2 hubs, 2 landings, 2 tabelas de check-in (`live_checkin`/`live_checkins`), 2 de anamnese (`tikkun_anamnese`/`_v2`). → Consolidar.
- **Capelania, Espelho, Raízes:** apps/tabelas criados mas **sem dados** → ativar fluxo.
- **Tabela `financeiro` vazia** → conectar Voomp + eventos a um financeiro único.
- **Projeto `teshuva-eventos` INACTIVE** → decidir reativar ou migrar para o banco principal.
- **Áudios dos eixos incompletos** (só Eixo 0 com áudio cheio).
- **Domínios sem custom domain** em projetos importantes (central-estrategica, hub).

### C) ❌ Ainda não existe
- **Portal Administrativo Central** que unifique os 20 projetos em uma visão só.
- **Módulo financeiro real** (mensalidades, dízimos, ofertas, recibos, inadimplência).
- **Gestão de membros unificada** (hoje lead/aluno/membro/cliente estão em tabelas separadas).
- **Automação de aniversários/datas** e de certificados pós-evento.
- **Single sign-on** entre os portais (cada um autentica isolado).

### D) 🎯 Recomendação para unificar Kehilah Teshuvá + ITEEP + Capelania

**Estratégia: não reconstruir — costurar.** A fundação já existe; falta o tecido conjuntivo.

1. **Banco único como fonte da verdade.** Adotar o Supabase `mapadoherdeiro` como base central. Criar uma tabela mestre `pessoas` (membro/aluno/lead/cliente como *papéis* de uma mesma pessoa) e ligar as tabelas existentes a ela. Aposentar o projeto `teshuva-eventos` inativo migrando seus dados.
2. **Portal Administrativo Central** evoluído a partir do admin que **já existe** no `sala-do-mapa`, com módulos: Pessoas/CRM · Eventos · Financeiro · Capelania · Conteúdo · Agentes/Automação.
3. **Um único login (SSO)** via Supabase Auth para todos os subdomínios, com papéis (admin, capelão, secretaria, aluno).
4. **Consolidar duplicidades** (hubs, landings, tabelas) antes de adicionar coisa nova.
5. **Centralizar a orquestração** dos agentes/automações no `dispatcher`, com um painel de monitoramento (o que disparou, status, erros).
6. **Conectar o financeiro:** Voomp + eventos + Terumá → tabela `financeiro` única, com recibos e visão de inadimplência.

**Sequência sugerida:** (1) consolidar duplicidades → (2) tabela `pessoas` + SSO → (3) Portal Central sobre o admin atual → (4) módulo financeiro → (5) ativar Capelania/Espelho/Raízes → (6) painel de agentes.

---

> **Conclusão.** O patrimônio digital é maior do que parecia: **20 frentes publicadas, 37 tabelas com dados reais, 26 automações e 5 agentes de IA**. Não falta sistema — falta **unificação e um mapa**. Este documento é esse mapa. O próximo passo lógico é o **Portal Administrativo Central**, construído **sobre o que já existe**, não do zero.
