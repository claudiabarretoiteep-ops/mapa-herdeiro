# Auditoria da LP atual × correções da aula

Página analisada: projeto Vercel `mapa-da-redencao` (deploy de produção mais recente, arquivo único `src/index.html`, versão "LP v5"). O código **não está** neste repositório; ele foi enviado direto para a Vercel.
Referência das correções: `docs/playbook-lancamento-pago.md` (Parte 1).
Prioridade: 🔴 muda a conversão ou impede publicar · 🟡 importante · 🟢 ajuste fino.

## 0. Antes de tudo (bloqueia a publicação)
| 🔴 | Hoje na página | O que fazer |
|---|---|---|
| | Links **`[CHECKOUT_INFINITEPAY]`**, **`[CHECKOUT_STRIPE]`** e **`[WHATSAPP]`** ainda são marcadores; a página mostra o aviso "Prévia de design: este link ainda precisa ser configurado". | Colocar os links reais. (InfinitePay para a mentoria está de acordo com o que a aula orientou.) |

## 1. Topo
| | Hoje | Correção |
|---|---|---|
| ✅ | Headline, subtítulo, imagem do mapa, selos (Anhanguera, Escola de Profetas, "Um ano de mentoria", "Ao vivo") | Manter. |
| 🟡 | "Turma Fundadora" aparece só como linha pequena acima do título e no botão do menu. | Dar destaque visual (selo ou faixa) no topo. |

## 2. Dor / causa / virada / Rabino / Gálatas 4
| ✅ | Todos os blocos (da dor à chave de leitura) | Manter; a aula não pediu alteração. |
|---|---|---|
| 🟢 | Em "A prova que é difícil de refutar": "Ninguém paga por conhecimento. Paga por **transmentoria**." | Fora da aula: parece erro de digitação. Conferir. |

## 3. Depoimentos 🔴
| Hoje | Correção |
|---|---|
| Os 14 depoimentos (Wilton, Márcio, Muller, Maíza, Rose, Sidney, Wilma, Jadir, Cleusa, Marli, Hellen, Rodrigo, Maria Inês e Carlos no FAQ) são só texto com inicial em círculo, e **cada um tem escrito "Depoimento transcrito"**. | Para os principais, pedir autorização e colocar **foto + @ do Instagram + print** da mensagem original. **Tirar o rótulo "Depoimento transcrito"**, que passa a ideia de texto reescrito. |

## 4. "O que é" e "Tudo que você recebe" 🔴 (seção mais importante)
| Item | Hoje (texto da página) | Correção |
|---|---|---|
| Título | "Tudo que você recebe" em tamanho comum | Mais destaque. |
| Mentoria | "Encontros semanais ao vivo…" | Destacar **SEMANAIS AO VIVO**. |
| Comunidade dos Herdeiros | "A sua área de membros própria, com a jornada, a raiz hebraica e os materiais, pra caminhar entre um encontro e outro." Também aparece "área de membros própria" no parágrafo "O que é" e "Comunidade dos Herdeiros, a sua área de membros" no card de preço. | Trocar nos **3 lugares**. Explicar: local exclusivo dos mentorados **+ grupo restrito no WhatsApp**, quem responde (Rabino ou não) e que um aluno ajuda o outro. |
| Moré | "Uma **inteligência** treinada no jeito do Rabino…" | Escrever **"Inteligência Artificial"**. |
| Resumo em vídeo | "O coração de cada encontro condensado…" | Dizer que é **vídeo gravado e editado** de cada encontro. |
| Plataforma própria | "A sua área de membros, com tudo num lugar só" | Trocar por **"Área dos Mentorados"** (nos 2 lugares onde aparece). |
| Suporte VIP imediato | "Você caminha acompanhado…" | Dizer quem é "a equipe" (a IA e a Cláudia, quando preciso), canal e horário. Sem insinuar acesso direto ao Rabino. |
| Flashcards | "Os pontos-chave da jornada em cartões…" | Explicar: "cartões de revisão". |
| Mapa mental / biblioteca / Guia das 7 Festas | Texto bom | Manter e **mostrar imagem**. |
| 🔴 Imagens | A página inteira só tem 4 imagens: mapa, Rabino e 2 logos. | **Mockup de cada entrega**: Área dos Mentorados, resumo em vídeo, WhatsApp do suporte, Moré, mapa mental, biblioteca, guia. |
| 🔴 Preço por item | Nenhum item tem valor. | Valor individual **riscado** em cada entrega e em cada bônus. |

## 5. Bônus "por ordem de inscrição · pra quem age rápido" 🔴
Aparece em **dois lugares**: lista de bônus e resumo do card de preço.
- "Mentoria individual · 4 encontros" (3 vagas)
- "Mentoria de 1 hora" (10 primeiros)
- "Mapa Profético A1 físico" (20 primeiros): **não foi comentado na aula**
- Frase final do bloco: "os bônus por ordem de inscrição e à vista são de quem age primeiro".

**Correção:** tirar da página; levar para o pitch do workshop e para o topo do checkout.
**Decisão sua:** "Panim el Panim" (5 primeiros, à vista) tem o mesmo problema de contagem. Ele foi aprovado na aula, mas a contagem pode ficar errada com o carrinho aberto.

## 6. Bloco de preço 🔴 (a ordem hoje está quebrada)
Ordem atual:
1. "Tudo isso somado passa de R$ 28.000" → **texto pequeno dentro de um parágrafo**.
2. **Dupla certificação** (2 blocos longos + observação sobre "Teologia Bíblica da Redenção").
3. "A primeira turma" + pergunta "Antes do valor…".
4. Card: "Valor normal: R$ 8.997…" **pequeno**, depois "Condição de Fundador R$ 4.997".

Ordem pedida na aula: **soma grande → valor normal R$ 8.997 → "Para a Turma Fundadora, valor exclusivo, única vez: R$ 4.997"**. 
- Mover **Dupla certificação** para antes da soma (ou depois do preço).
- Pergunta "Antes do valor…": manter.
- Trocar "Condição de Fundador" por **"Para a Turma Fundadora · valor exclusivo, só desta vez"**.
- **Boa notícia:** o valor normal e o de fundador já estão certos (R$ 8.997 e R$ 4.997). O "8.197" e o "5.997" ouvidos na aula parecem erro da transcrição.

### ⚠️ Conferir as parcelas
| Valor | Página diz | Conta |
|---|---|---|
| Normal | 12x de R$ 899,70 | 12 × 899,70 = **R$ 10.796,40** (8.997 ÷ 10 = 899,70) |
| Fundador | 12x de R$ 499,70 | 12 × 499,70 = **R$ 5.996,40** (4.997 ÷ 10 = 499,70) |

Se o parcelamento tem juros, está certo, mas a página deveria dizer o **total parcelado**. (Os "5.997" da aula talvez sejam esse total.) Se não tem juros, a parcela correta de 4.997 em 12x seria R$ 416,42.
Também: a **soma de R$ 28.000** só funciona se os preços riscados de cada item **somarem esse valor**.

## 7. "A primeira turma" / "Por que entrar agora" 🟡
| Hoje | Correção |
|---|---|
| "Isso não é escassez de marketing. É que a primeira turma, com o Rabino acompanhando de perto um grupo pequeno, acontece uma vez só. Depois ela fecha." | **Remover.** Cria uma objeção que a pessoa não tinha. |
| Títulos "A primeira turma", "Uma primeira turma só existe uma vez" e, no convite final, "A Turma Fundadora é a primeira" | Reescrever sem "primeira turma", falando de **Turma Fundadora**. |
| Os 3 itens "Você entra como Fundador / paga o menor valor / tem voz" | Manter. |

## 8. Garantia, FAQ, "é para você se / não é", convite
| | Hoje | Correção |
|---|---|---|
| ✅ | Garantia de 15 dias, FAQ (6 perguntas), "É pra você se / Não é pra você se" | Manter. |
| 🔴 | Convite final: "Se a fome que te trouxe até aqui é real, **talvez** seja a sua hora." | **"Se a fome que te trouxe até aqui é real, essa é a sua hora."** |

## 9. Mais um ponto: CTA de dúvida
O WhatsApp "Fale com a nossa equipe" já existe duas vezes. Quando definir quem é "a equipe" (item 4), manter a mesma frase aqui.

## Ordem sugerida de trabalho
1. Links reais (bloqueador).
2. Texto: itens do bloco 4 (Moré, vídeo, Área dos Mentorados, Comunidade, Suporte, Flashcards), "talvez", frase "não é escassez", "Condição de Fundador" → "Turma Fundadora".
3. Reordenar o bloco de preço e aumentar a soma.
4. Tirar os bônus "age rápido".
5. Depois, precisam do seu material: preços individuais, mockups, depoimentos com foto/@/print.
