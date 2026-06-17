# 🧭 MAPA FUNCIONAL DO ECOSSISTEMA

> Análise **estratégica e funcional** (não técnica) de cada sistema existente — o que é, o que faz hoje, o que falta e qual seu papel no ecossistema ideal.
> Base: leitura real do código, banco Supabase, agentes e integrações. Data: 17/06/2026.
> Objetivo: entender a função estratégica de cada peça **antes** de escrever o PRD do Portal Administrativo Central.

---

## 1. SALA DO MAPA

**Objetivo:** é o **coração público do ecossistema** — o site principal (`mapadoherdeiro.com.br`) que apresenta o Mapa do Herdeiro, capta leads, vende os Eixos e entrega conteúdo. Hoje acumula também o **painel administrativo**.

**Funcionalidades que já existem:**
- Landing principal + páginas de vendas (Revelação do Herdeiro, Sistema de Eixos, página por Eixo).
- Captura de leads (formulário) → grava no Supabase (`leads`) + copia para Google Sheets.
- Quiz de **Qualificação/Diagnóstico**.
- **Leitor de eixos online** (`#/ler-online`) com controle de acesso por e-mail (`leads_access`).
- **Player de áudio** dos eixos (audiolivros).
- **Painel Admin** (login Supabase Auth) com: gestão de **Leads**, visão de **Jornada do Lead**, gestão de **Eixos** (links Voomp) e **Presenças do Shiur** com disparo de resumo no WhatsApp.

**O que está funcionando:** captação de leads, vendas via Voomp, leitor/player de eixos, admin de leads e presenças. É o projeto **mais maduro (~85%)**.

**O que está incompleto:** áudios completos só do Eixo 0; o admin mistura site público + gestão no mesmo projeto; não há gestão de membros/financeiro/eventos ali dentro.

**O que deveria ser no ecossistema ideal:** o **front público + área de membros/aluno** do Mapa do Herdeiro. A parte administrativa deveria "sair" daqui e virar o Portal Central (ver seção 8), deixando a Sala do Mapa focada em **experiência do usuário final**.

---

## 2. MAPA DO HERDEIRO

**Objetivo:** é a **marca/jornada principal** — o "guarda-chuva" do público do Rabino. Não é um único sistema, é o **conceito** que conecta DNA → Eixos → Comunidade → Formação.

**O que já faz hoje:** existe como domínio (`mapadoherdeiro.com.br` + subdomínios `hub`, `dna`, `acesso`), com a jornada vendida em produtos (DNA, 6 Eixos, Sala do Mapa). A tabela `jornada_lead` já modela essa jornada com flags: `tem_dna`, `tem_eixo_0..5`, `tem_sala_do_mapa`, `tem_comunidade`, `tem_shoresh`, `tem_tora_viva`.

**O que deveria fazer futuramente:** ser a **trilha unificada do herdeiro** — uma área logada onde a pessoa vê onde está na jornada (qual eixo concluiu, qual o próximo passo, comunidade, formação Raízes do Reino), com progressão automática. Hoje a "jornada" existe como dado, mas **não como experiência navegável** para o aluno.

---

## 3. HUB.MAPADOHERDEIRO.COM.BR

**Intenção original:** ser o **ponto único de entrada** depois do login — um "balcão" de onde a pessoa acessa tudo (eixos, comunidade, DNA, eventos).

**O que já existe:** o projeto está publicado com domínio próprio, mas é essencialmente uma **casca/landing de navegação** — sem login unificado nem dados dinâmicos da jornada.

**O que falta:** autenticação única (SSO), leitura do estado da jornada do usuário (puxar de `jornada_lead`), e links vivos para cada módulo. Hoje é mais um menu estático do que um hub funcional.

> ⚠️ Existe **duplicidade**: `hub-mapadoherdeiro` (com domínio) e `mapa-herdeiro-hub` (sem domínio). Precisa escolher um.

---

## 4. DNA DO HERDEIRO

**É o produto digital mais completo e automatizado do ecossistema.** (`dna.mapadoherdeiro.com.br`)

**Fluxo completo atual** (confirmado pelas tabelas e funções):
1. Visitante faz o **quiz gratuito** → respostas gravadas (`quiz_answers`).
2. Sistema calcula **scores** e identifica o **pilar mais fraco** (`weak_pillar`, `phase_id`).
3. Eventos de interação são logados (`dna_events` — ~2.307 registros).
4. **IA (Claude) gera a análise** personalizada (`ai_analysis`) → função `generate-analysis`.
5. **Gera o PDF** (`generate-pdf`) → salvo no bucket `dna-pdfs`, campo `pdf_url`.
6. **Pagamento via Voomp** (`payment_status`, `voomp_transaction_id`) libera a análise completa (R$197).
7. **Follow-up automático** para quem não converteu (`followup_sent_at`, `followup_count`).

**Integrações existentes:** Supabase (dados), Claude (análise), gerador de PDF, Voomp (pagamento), WhatsApp/e-mail (follow-up). **95 análises** já geradas.

**O que ainda falta:** conectar o resultado do DNA à **jornada unificada** (hoje `dna_analyses` e `jornada_lead` não conversam automaticamente); usar o `weak_pillar` para **recomendar o Eixo certo** automaticamente; e nutrição pós-compra mais estruturada.

---

## 5. ITEEP (Escola de Profetas)

**Relacionado ao Bacharel:** **praticamente nada construído.** Não há projeto, banco ou portal de curso de bacharel/graduação. Existe só o conceito institucional. É a maior lacuna do ITEEP no digital.

**Relacionado à Capelania:** existe um sistema **pronto, porém parado**:
- App `capelania.iteep.com.br` (`capelania-webapp`).
- Tabela `capelania_inscricoes` **completíssima**: dados pessoais (RG, CPF, nascimento, endereço completo), dados eclesiásticos (igreja, nome do pastor, cargo), turma, indicação, pagamento (tipo/valor), camisa e **check-in**. Ou seja: é um **sistema de matrícula de curso completo**.
- **Mas tem 0 registros** — nunca entrou em operação real.

**O que ainda não foi construído:** todo o módulo de **ensino** (turmas, aulas, presença acadêmica, notas, certificados de conclusão, área do aluno do bacharel). A Capelania tem o cadastro, mas não tem a "sala de aula".

---

## 6. TIKKUN (Método Tikkun — Pra. Maiza Feledy)

**É um subecossistema próprio**, voltado à formação em psicanálise integrativa com fé (4 fases, 12 meses, R$4.997, dupla certificação Anhanguera + Instituto).

**Estrutura existente:**
- Projeto `anamnese` (formulário de entrada).
- Projetos novos `espelho` e `raizes-da-identidade` (diagnósticos de perfil).
- Agente **Miriã** (inteligência de conteúdo do Tikkun).

**Banco de dados existente:**
- `tikkun_candidatos` (10) → funil de entrada.
- `tikkun_anamnese` (8) → **anamnese por áudio**: 12 perguntas, cada uma com gravação de voz (`q1_audio_url`…`q12_audio_url`).
- `tikkun_relatorios` (6) → relatório gerado por IA com `perfil_geral`, **`nivel_risco`**, `recomendacao` e **`fase_entrada_sugerida`** (a IA sugere em que fase a pessoa entra).
- Bucket `tikkun-audio` (97 áudios).
- Diagnósticos de perfil: `espelho_respostas` (4 pilares: AU/EP/LF/VE) e `raizes_respostas` (5 pilares: CG/AP/RS/PI/PP).

**Fluxos existentes:** candidato → anamnese em áudio → transcrição (Whisper) → relatório de IA (`generate-tikkun-report`) que classifica risco e sugere fase de entrada. Os diagnósticos Espelho/Raízes geram perfil + PDF.

**Como se conecta ao restante:** hoje **compartilha a mesma base Supabase e os mesmos agentes/infra**, mas funciona como **ilha** — público, marca e responsável (Pra. Maiza) distintos. No ecossistema ideal seria um **módulo separado** dentro do Portal, com seu próprio funil, mas reaproveitando pessoas/financeiro/agentes em comum.

---

## 7. AGENTES

Todos rodam sobre **Claude + Whisper + Z-API (WhatsApp)**, recebendo mensagens via o roteador `dispatcher`.

| Agente | O que faz | Para quem trabalha | Dados que acessa | Processos em que participa |
|---|---|---|---|---|
| **Orah** | Atendimento e conversa com o público; lembra do histórico | **Público geral** (Sala do Mapa) | `orah_users`, `orah_messages` (2.336), `orah_memory` | Atendimento, relacionamento, jornada |
| **Esdras** | Inteligência de conteúdo: pesquisa Google Trends + YouTube e gera briefings, roteiros, headlines, ganchos | **Equipe do Rabino** (Cláudia + social) | Google Trends, YouTube API, URLs | Produção de conteúdo do Rabino |
| **Miriã** | Igual ao Esdras, mas para o nicho **saúde emocional/cura/psicanálise** | **Equipe Tikkun** (Pra. Maiza) | Google Trends, YouTube API, URLs | Produção de conteúdo do Tikkun |
| **Lucas** | **Editorial** (apoio de redação/conteúdo) | **Interno** (grupo WhatsApp) | Mensagens do grupo editorial | Fluxo editorial |
| **Rute** | **Vendas e Customer Success**: boas-vindas, check-in D+3 e D+7, coleta de feedback e NPS pós-compra | **Interno / clientes** | `rute_clientes` (produto, pagamento, NPS, check-ins) | Pós-venda, retenção, satisfação |

> Resumo: **Orah** é voltada ao público; **Esdras/Miriã/Lucas** são "redação inteligente" interna; **Rute** cuida do cliente depois da compra.

---

## 8. PORTAL ADMINISTRATIVO — qual projeto tem maior potencial?

**Recomendação técnica: usar a base administrativa que já existe dentro da `Sala do Mapa` como semente — mas extraída para um projeto próprio (não o Hub).**

Justificativa:
- A **Sala do Mapa já tem o que um portal admin precisa**: autenticação (Supabase Auth), CRM de leads, visão de jornada, gestão de eixos e painel de presenças com disparo de WhatsApp. **É o único projeto com gestão real funcionando.**
- O **Hub não serve** para isso: é uma casca de navegação voltada ao público, sem gestão.
- `central-estrategica` e `bmad-dashboard` existem como "gestão", mas estão **desatualizados** e sem o CRM vivo.

**Decisão recomendada:** criar/evoluir um **Portal Admin dedicado** reaproveitando o **código e a lógica do admin da Sala do Mapa**, apontando para o mesmo Supabase. Assim a Sala do Mapa volta a ser só o site público, e o Portal vira o centro de operação. (Se quiser velocidade máxima, dá para começar literalmente expandindo o `#/admin` atual e separar depois.)

---

## 9. VISÃO FUTURA — ecossistema em módulos (sem reconstruir do zero)

Cada módulo reaproveita o que já existe:

| Módulo | O que faz | Projeto(s)/tabelas reaproveitados |
|---|---|---|
| **Pessoas (cadastro único)** | Uma pessoa, vários papéis (lead, aluno, membro, cliente, paciente Tikkun, capelão) | **Novo**, unificando `leads`, `jornada_lead`, `ig_leads`, `orah_users`, `rute_clientes`, `capelania_inscricoes` |
| **CRM** | Funil, temperatura, tags, jornada de compra | Admin da **Sala do Mapa** + `leads`, `jornada_lead`; automações `qualificar-ig`, `notify-lead`, `followup-leads` |
| **Ensino (ITEEP)** | Bacharel, turmas, aulas, presença, certificados | **A construir** (maior lacuna) — partir do leitor de eixos da Sala do Mapa |
| **Capelania** | Matrícula, turmas, check-in | `capelania-webapp` + `capelania_inscricoes` (ativar o que já existe) |
| **Eventos** | Inscrição, RSVP, check-in, financeiro do evento | `eventos-teshuva` + `eventos_rsvp`, `eventos_financeiro`; função `live-checkin` |
| **Tikkun** | Anamnese por áudio, relatórios, diagnósticos de perfil | `anamnese`, `espelho`, `raizes-da-identidade` + tabelas `tikkun_*`, `espelho_respostas`, `raizes_respostas`; agente **Miriã** |
| **DNA / Diagnósticos** | Quiz → análise IA → PDF → venda | `dna-do-herdeiro` + `dna_analyses`/`dna_events`; funções `generate-analysis`, `generate-pdf` |
| **Financeiro** | Pagamentos, recibos, inadimplência, contribuições | **Consolidar**: Voomp (`voomp-webhook`) + `eventos_financeiro` + `numeros_teruma` (Terumá) → tabela `financeiro` |
| **Conteúdo / Biblioteca** | Eixos, áudios, newsletters, carrosséis | Sala do Mapa (leitor/player) + `deploy-eixos`, `rabino-audios`, `carroseis-saladomapa`, `sala-do-mapa-newsletter` |
| **Agentes / Automação** | Orquestração e monitoramento dos bots | `dispatcher` + `orah/esdras/miriam/lucas/rute-webhook` (precisa de painel de controle) |

**Princípio-guia:** o Portal Administrativo Central é o **painel que enxerga todos esses módulos**, tendo o **cadastro único de Pessoas** como espinha dorsal e o **Financeiro** como camada transversal. Nada se reconstrói do zero — tudo já existe em pedaços; o Portal é o que **costura**.

---

### Síntese para o PRD

- **Fundação pronta:** banco único (Supabase), CRM, DNA, Eventos, Tikkun, agentes e pagamentos já operam.
- **Maior lacuna:** módulo de **Ensino/Bacharel** e o **cadastro único de Pessoas**.
- **Maior oportunidade rápida:** transformar o admin da **Sala do Mapa** no **Portal Central** e ativar a **Capelania** (cadastro pronto, uso zero).
- **Camada que falta amarrar tudo:** **Financeiro** unificado + **SSO** entre portais.
