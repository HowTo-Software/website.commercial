# Frontend HTS — fontes e adaptações

## Project gallery restored — Unreleased

**Current catalog / Catálogo atual:** four projects / quatro projetos: HowToSoftware, HTS Game Hosting, Mark's Baseball Cards and Linktura. Legacy Asset Group and subsequently Unorthodox Ways were removed from the public portfolio at the owner's request / foram removidos da vitrine a pedido do responsável. Their cards, URLs, details, project-specific translations and unused palettes were removed; the Unorthodox Ways screenshot is no longer shipped. Empty categories are hidden and cannot be selected. Historical implementation records below are retained as history, not current client claims.

**English:** the portfolio once again follows the supplied screenshot: a two-column gallery with tilted miniature-browser previews, neutral backgrounds, project captions and circular external links. It uses the existing local captures and brand fallbacks, not iframes or a new image service. Mobile switches to a single column, and the frames grow with translated content to prevent clipping. Filters, native details dialogs, safe external links, quotation prefill, themes, languages and motion preferences remain available. The index-only selection/hover helper and obsolete layout styles were removed; the rest of the page is unchanged. This supersedes the interactive-index layout described below.

**PT-BR:** o portfólio volta ao modelo da imagem de referência: grade de duas colunas, prévias de navegador inclinadas, fundos neutros, legenda do projeto e link externo circular. São reutilizadas as capturas locais e alternativas de marca, sem iframes ou novo serviço de imagens. No celular, a grade passa para uma coluna e as molduras crescem com o conteúdo traduzido, evitando cortes. Filtros, diálogos nativos de detalhes, links externos seguros, preenchimento do orçamento, temas, idiomas e preferências de movimento continuam disponíveis. Foram removidos a seleção/hover exclusivos do índice e seus estilos obsoletos; o restante da página permanece igual. Esta alteração substitui o layout de índice descrito abaixo.

**Local verification / Verificação local:** after removing Unorthodox Ways, Release build with warnings treated as errors passed with zero warnings/errors; JavaScript syntax, localization consistency (346 keys per language) and `git diff --check` passed. Playwright with local headless Chrome passed 21 check groups, including 42 layouts (PT-BR/EN/ES × light/dark × 320, 390, 600, 768, 850, 1280 and 1440 CSS pixels). Checks cover the four-project catalog, absence of both removed projects and the empty community filter, filter results/counts, screenshot/brand fallbacks, details, Escape/focus return, keyboard/touch input, reduced motion, safe external-link attributes and absence of normal-session browser/console/local HTTP errors. The updated smoke test passed locally, and the removed screenshot returned HTTP 404. Its four retained-project checks, removed-content checks and screenshot-404 assertion also run in the existing CI smoke step. Reports and screenshots remain in ignored `artifacts/`; these are local results, not a committed browser-test suite, cross-browser certification, remote-site availability check or production deployment.

## Appearance preferences — Unreleased

**English:** `AppearanceMenu.razor` groups theme and animation actions in a compact native disclosure in the existing header. The hero and capabilities band no longer contain separate animation buttons. Both actions have localized visible labels and comfortable touch targets; Escape returns focus to the trigger, and outside clicks/focus departure close the panel. Existing storage persistence, storage-failure fallback and OS reduced-motion priority remain active. Local Playwright checks covered behavior and 48 open-panel layouts across three languages, two themes and eight widths, plus a project-index regression check. These are local browser results. The requester accepted the preview and authorized publication for pull-request review and later merge; production deployment remains a separate step.

**PT-BR:** `AppearanceMenu.razor` reúne tema e animações em um menu nativo compacto no cabeçalho existente. O hero e a faixa de capacidades deixam de ter botões de animação separados. As duas ações têm textos visíveis traduzidos e áreas de toque confortáveis; Escape devolve o foco ao acionador, e cliques ou foco fora fecham o painel. Permanecem a preferência salva, o funcionamento sem armazenamento e a prioridade de movimento reduzido do sistema. Verificações locais com Playwright cobriram o comportamento e 48 layouts com painel aberto em três idiomas, dois temas e oito larguras, além de uma regressão do índice de projetos. São resultados locais de navegador. O solicitante aceitou a prévia e autorizou a publicação para revisão em pull request e merge posterior; a implantação em produção permanece uma etapa separada.

## Interactive project index — Historical implementation, superseded

**English:** the user-supplied `hts-interactive-index.html` is the portfolio's visual/interaction reference, adapted to the existing Blazor site rather than published as a standalone page. The existing six projects, categories, URLs, real screenshots and brand fallbacks are preserved. No illustrative site captures, new runtime libraries or unrelated page redesign are introduced. See the complete [implementation notes](phase-2-design/interactive-project-index.md).

**PT-BR:** o arquivo `hts-interactive-index.html`, fornecido pelo usuário, é a referência visual/de interação do portfólio, adaptada ao site Blazor existente em vez de publicada como página independente. Os seis projetos, categorias, URLs, capturas reais e alternativas de marca existentes são preservados. Não são introduzidas capturas ilustrativas de sites, novas bibliotecas de execução ou reformulação de outras seções. Consulte as [notas completas da implementação](phase-2-design/interactive-project-index.md).

## Base histórica do frontend

Reformulação histórica realizada em 2 de outubro de 2026, mantendo Blazor Web App e .NET 8. Assistente e refinamento de movimento atuais estão em Unreleased; esta data não representa uma publicação ou aprovação dessas alterações.

## Skiper UI: código coletado e adaptado

Os componentes gratuitos foram obtidos pelos endpoints públicos do registry oficial:

| Componente | Fonte | Adaptação na HTS |
| --- | --- | --- |
| Text roll navigation / skiper58 | [Documentação](https://skiper-ui.com/v1/skiper58) · [Registry JSON](https://skiper-ui.com/r/skiper58.json) | RollingText.razor: duas camadas de letras, deslocamento de 100% e atraso por caractere. Anima com CSS no hover e no foco pelo teclado. |
| CssLink / skiper40 | [Documentação](https://skiper-ui.com/v1/skiper40) · [Registry JSON](https://skiper-ui.com/r/skiper40.json) | .animated-link em app.css: sublinhado com origem direcional e movimento discreto da seta. |

O código original obtido está em docs/reference-sources/skiper58.tsx e skiper40.tsx, para consulta. Esses arquivos não são executados nem enviados ao navegador. As implementações foram portadas para Razor/CSS, sem adicionar React, Next.js, Tailwind ou Framer Motion ao projeto.

A documentação do Skiper UI permite uso e modificação em projetos pessoais e comerciais e exige atribuição na versão gratuita. O rodapé inclui um link visível para Skiper UI. O CssLink também credita a referência original de [Cursor](https://cursor.com/).

## OriginKit: referência pública e implementação independente

- Referência específica: [Mask Text Reveal](https://www.originkit.dev/components/mask-text-reveal).
- Consulta ao catálogo e ao [guia de componentes](https://www.originkit.dev/docs/components).
- A cópia/instalação do código exige autenticação; não havia uma conta ou chave OriginKit disponível nesta sessão. Nenhum código restrito, componente pago ou endpoint autenticado foi obtido.
- MaskReveal.razor é uma implementação independente a partir do comportamento e da API documentados publicamente, e não uma cópia do código do OriginKit.
- O componente admite revelação por baixo, cima, esquerda, direita, centro horizontal e centro vertical. CSS faz a máscara; IntersectionObserver dispara a entrada apenas quando o título chega à área visível.
- A máscara anima um elemento interno. O observador acompanha a caixa externa para evitar que uma máscara totalmente fechada impeça o próprio disparo.

Para substituir a implementação por uma adaptação do código original, será necessário obter o componente por uma conta autorizada no OriginKit. [Licenciamento do OriginKit](https://www.originkit.dev/docs/licensing).

## Interações próprias da HTS

- Prévia do hero alterna entre formato desktop e mobile.
- Projetos têm filtros e diálogos nativos, com fechamento por botão, clique fora e Escape.
- A seleção de um serviço, ou do CTA de um conceito, preenche o briefing no mesmo circuito Blazor.
- Backend e hospedagem têm serviços próprios. A manutenção abrange sites criados pela HTS e por outras equipes, e selecioná-la abre o briefing para um projeto existente.
- Projetos existentes podem incluir o endereço do site, com validação de HTTP/HTTPS e presença no TXT. O campo é opcional e não aparece ao começar do zero.
- Briefing tem escolha de projeto novo ou melhoria, mensagens localizadas e download de TXT em UTF-8. Não há envio, gravação em banco ou e-mail.
- Navegação indica a seção atual e o progresso de leitura.
- Menu mobile usa details, fecha após navegar, ao clicar fora e com Escape.
- Cabeçalho oferece PT-BR, EN e ES. Traduções incluem conteúdo, mensagens de validação, metadados e download do briefing. A escolha fica em cookie e a troca preserva a seção atual.
- Tema claro e black com escolha salva no navegador. theme.js aplica a preferência no head, antes do CSS, e atualiza o rótulo do botão no idioma selecionado.
- Tilt discreto no hero e inclinação das miniaturas da galeria no hover/foco, respeitando pausa e movimento reduzido.
- As entradas respeitam prefers-reduced-motion. O conteúdo permanece visível quando o JavaScript não carrega.
- interactions.js também observa os componentes inseridos por atualizações do Blazor e remove observações dos elementos desmontados.

## Assets e fontes

As imagens já incluídas no projeto foram reaproveitadas. A seção "Ideas in action" (Possibilidades na prática) apresenta os quatro projetos do catálogo atual. As imagens `wwwroot/images/project-*.webp` são capturas das páginas iniciais desses sites (1440×900, outubro de 2026). Linktura usa uma prévia de marca, porque a página pública é um login. A captura do Unorthodox Ways foi removida junto com o projeto; `project-construction.png` continua no hero.

Fonte Manrope variável hospedada localmente, obtida do [repositório oficial Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope). Licença SIL Open Font License em wwwroot/fonts/OFL.txt. Nenhum CDN é necessário em tempo de execução.

## Validação da base histórica

Build .NET e revisão em Chrome headless: português/inglês/espanhol, temas claro e black, formatos responsivos, persistência das preferências, filtros, diálogos, teclado, serviços expansíveis, seleção de serviço, mensagens de validação, download do briefing, redução de movimento e visibilidade das animações. Manutenção, backend e hospedagem foram verificados nos três idiomas, incluindo o preenchimento do briefing, endereço opcional, validação de URL e conteúdo dos arquivos baixados. Foram revisadas 30 combinações de tema, idioma e largura, de 320 a 1440 px. As prévias estão em docs/preview-desktop.png, docs/preview-mobile.png, docs/preview-black.png, docs/preview-black-mobile.png e docs/preview-es.png.

## Assistente de pedido — Unreleased

O formulário de briefing foi ampliado para cinco etapas: contato e projeto, objetivos e funcionalidades, visual e conteúdo, lançamento e investimento, e revisão. A alteração mantém os componentes Razor, a identidade visual e os temas existentes, sem dependências de UI adicionais.

- `QuoteForm.razor` controla progresso, avanço validado, retorno, edição e revisão.
- `BriefOptions`, `BriefValidation` e `BriefFormatter` centralizam escolhas, regras e o TXT localizado.
- `BriefDateInput` limpa mensagens de uma data desmontada, preservando o último valor válido; erros de data no campo ativo continuam bloqueando o avanço.
- Há perguntas sobre negócio, público, páginas, funcionalidades, estilo, cores, referências, materiais, idiomas, integrações, domínio, hospedagem, orçamento e prazo.
- Campos condicionais ocultos não aparecem no resumo ou arquivo. Referências aceitam até cinco URLs HTTP/HTTPS sem credenciais; o servidor não visita esses endereços.
- O fluxo mantém seleção de serviço e modo de manutenção. O cliente revisa e baixa o briefing; ainda não existe envio à HTS nem persistência do pedido.

As verificações desta edição estão em [verification.md](phase-4-testing/verification.md). As datas de criação (22/09/2026) e reformulação (02/10/2026) identificam o histórico Git; não datam retroativamente esta atualização.

## Motion refinement — Unreleased

The current refinement extends HTS's own CSS/JavaScript motion: a subtle hero preview float, restrained decorative accents, a capabilities marquee, slow service-art orbits, staged card/section entrances and brief wizard-step transitions. Existing Skiper UI adaptations and the independent OriginKit behavior reference retain their attribution. No additional animation library or remote runtime asset is introduced.

`MotionToggle.razor` provides a visible global pause/resume action inside the header's Appearance menu, using the `hts-motion` preference (`full`/`paused`). The operating system's reduced-motion preference has priority. `data-motion`, `data-page-hidden` and observed `[data-motion-scene]` visibility govern continuous loops, so offscreen scenes and hidden tabs pause. The capabilities track additionally pauses for hover/focus, has one semantic copy and hides decorative repetition from assistive technology. Paused/reduced-motion and no-JavaScript views display the complete original group in a static wrapping layout. The no-script fallback preserves visible content/labels, not interactive wizard functionality; wizard navigation, validation feedback and download require JavaScript and the server circuit.

The hero scene is observed on the stable `.hero-showcase` parent, while canvas tilt and the `preview-float` transform remain independent. Switching desktop/mobile preview must retain scene visibility. Preview/filter controls render explicit `aria-pressed` strings; focused reveal content skips its entrance delay immediately.

Hover/focus pause complements the explicit stop control; it cannot replace a pause that persists while navigating elsewhere. See the [W3C Pause, Stop, Hide explanation](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) and the [motion technical design](phase-2-design/technical-design.md#motion-refinement--unreleased). These references guide implementation and review; they do not certify the site.

Fresh motion verification passed a Release build with zero warnings/errors, both script syntax checks, 37 isolated controller checks, 19 browser behavior assertions and a matrix of 48 combinations/192 section-layout checks. Pause/persistence, runtime reduced-motion changes, offscreen/hidden-tab suspension, independent transforms, preview switching, focus and relevant interactions were checked locally. Static no-script visibility, controls under unavailable storage and reduced-motion labels at 320 px in all three languages also passed. See [verification.md](phase-4-testing/verification.md) for exact scope; this is not native zoom, memory profiling or production certification. Historical frontend and earlier wizard results remain scoped to their own iterations.

**PT-BR:** o refinamento mantém a identidade atual e usa CSS/JavaScript próprios, com pausa persistida, prioridade para redução de movimento e cenas suspensas quando não estão em uso. Build, sintaxe, 37 verificações isoladas, 19 checks de comportamento e 48 combinações/192 checks de seção passaram, incluindo as verificações específicas de fallback/armazenamento. Os limites estão no registro. Nenhuma data histórica foi atribuída ficticiamente a esta atualização.
