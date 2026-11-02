# Interactive project index

Status: Superseded by the restored miniature-browser project gallery. The text below records the previous index implementation and its historical verification, not the current interface. See [current frontend notes](../frontend-sources.md#project-gallery-restored--unreleased). Production deployment is not recorded by this document.

**PT-BR:** substituído pela galeria de projetos com miniaturas de navegador. O texto abaixo registra a implementação anterior e sua verificação histórica, não a interface atual.

## English

The user-supplied `hts-interactive-index.html` is the portfolio's visual and interaction reference. Its editorial heading, numbered index, selected-row marker, preview composition and responsive expansion are adapted to Blazor/.NET 8. Its illustrative mini-sites and standalone navigation are not used. The rest of the homepage retains its design.

The existing six projects, URLs, categories, descriptions, statuses and quotation-service mappings are preserved. Four projects use the repository's real screenshots; Linktura and Legacy Asset Group retain clearly labeled brand previews. A failed image also falls back to its project's branding.

- `PortfolioProject` carries the catalog fields and derives the display domain and dialog ID.
- `ProjectsSection` owns the active project, filter and filtered array. Filtering preserves a valid selection or chooses the first result. Previous/next navigation wraps within that array. Row numbers retain the catalog order; the preview counter shows the position in the current results.
- `ProjectCard` renders an index row, compact expansion and native details dialog. Its external link opens the real site in another tab; the quotation action retains `ProjectBrief.SelectService`.
- `ProjectPreview` shares screenshot/brand presentation across the side panel, compact expansion and dialog.

Above 850 CSS pixels, index and preview occupy separate columns. The preview is sticky when viewport height exceeds 780 pixels, with clearance for the existing header. Desktop mouse hover, click and keyboard focus select projects. At 850 pixels and below, the side panel is hidden and exactly one preview expands below its selected row. Compact layouts select by click, tap or keyboard, preventing incidental hover from changing the expanded row during scrolling. Selection survives crossing the breakpoint.

Native buttons/links retain keyboard behavior and visible focus. Explicit selection state, controlled-region IDs, a localized selection status and hidden inactive slides support assistive technology. Dialogs preserve close, Escape and focus return. External links use `noopener noreferrer` and translated new-tab labels. Existing pause/reduced-motion settings disable depth and transitions. All added interface text is provided in PT-BR, English and Spanish.

Selection and filtering remain in Blazor. The small `projectIndexCanActivate` JavaScript helper only checks desktop hover capability and native keyboard-focus visibility; it does not store selection. Existing tilt, dialog handling and reveal observers are reused without new runtime libraries. Layout uses existing palette variables and local Manrope. Old card/minisite styles are removed.

### Local verification

Release build passed with zero warnings/errors; JavaScript syntax and `git diff --check` passed. Playwright with local headless Chrome passed 14 check groups, including 48 layouts (three languages × two themes × eight widths: 320, 390, 600, 768, 850, 960, 1280 and 1440 CSS pixels). Selection/filter consistency, filtered navigation, screenshot/brand previews, keyboard focus, dialogs, quotation prefill, external-tab targets, depth/pause/reduced motion, short viewports, compact mouse input and touch emulation were checked. No horizontal overflow, clipped names, runtime/console errors or local HTTP error responses were recorded in the final run. External-tab navigation was intercepted for QA; this does not verify the remote sites' availability.

Reports and screenshots remain in ignored local `artifacts/`; this is local browser evidence, not a new committed CI test suite, a multi-browser/accessibility certification or a cloud deployment. The requester reviewed the local preview and authorized publication in one commit and a pull request for later merge.

## Português brasileiro

Estado: ainda não lançado; prévia local aceita pelo solicitante e preparada para revisão em pull request. Este documento não registra implantação em produção.

O arquivo `hts-interactive-index.html`, fornecido pelo usuário, é a referência visual e de interação do portfólio. Título editorial, índice numerado, marcador da linha selecionada, composição da prévia e expansão responsiva são adaptados ao Blazor/.NET 8. Os pequenos sites ilustrativos e a navegação independente do protótipo não são utilizados. O restante da página principal mantém seu design.

Os seis projetos existentes, URLs, categorias, descrições, estados e serviços associados ao orçamento são preservados. Quatro projetos usam capturas reais do repositório; Linktura e Legacy Asset Group mantêm prévias da marca claramente identificadas. Uma imagem que falhar também dá lugar à identidade do respectivo projeto.

- `PortfolioProject` contém os campos do catálogo e deriva o domínio de apresentação e o identificador do diálogo.
- `ProjectsSection` controla projeto ativo, filtro e lista filtrada. O filtro preserva uma seleção válida ou escolhe o primeiro resultado. A navegação anterior/próximo circula nessa lista. A numeração das linhas mantém a ordem do catálogo; o contador da prévia mostra a posição nos resultados atuais.
- `ProjectCard` renderiza uma linha do índice, sua expansão compacta e o diálogo nativo de detalhes. O link externo abre o site real em outra aba; a ação de orçamento mantém `ProjectBrief.SelectService`.
- `ProjectPreview` compartilha a apresentação da captura ou marca entre painel lateral, expansão compacta e diálogo.

Acima de 850 pixels CSS, índice e prévia ocupam colunas separadas. A prévia fica fixa durante a rolagem quando a altura da área visível supera 780 pixels, respeitando o cabeçalho existente. Hover com mouse no desktop, clique e foco por teclado selecionam projetos. Em 850 pixels ou menos, o painel lateral é ocultado e apenas uma prévia expande abaixo da linha selecionada. Telas compactas selecionam por clique, toque ou teclado, impedindo que o hover incidental altere a linha expandida durante a rolagem. A seleção permanece ao atravessar esse limite de largura.

Botões e links nativos mantêm comportamento por teclado e foco visível. Seleção explícita, identificadores das regiões controladas, estado de seleção traduzido e painéis inativos ocultos atendem às tecnologias assistivas. Diálogos preservam fechamento, Escape e retorno do foco. Links externos usam `noopener noreferrer` e indicação traduzida de nova aba. As configurações existentes de pausa e movimento reduzido desativam profundidade e transições. Todos os novos textos da interface estão em PT-BR, inglês e espanhol.

A seleção e os filtros permanecem no Blazor. A pequena função JavaScript `projectIndexCanActivate` apenas verifica a capacidade de hover no desktop e a visibilidade nativa do foco por teclado; ela não armazena seleção. Inclinação por ponteiro, diálogos e observadores de revelação existentes são reaproveitados sem novas bibliotecas de execução. O layout usa as variáveis de cores existentes e a fonte Manrope local. Os estilos antigos de cartões e pequenos sites ilustrativos são removidos.

### Verificação local

A compilação Release passou sem avisos ou erros; a sintaxe JavaScript e `git diff --check` passaram. O Playwright com Chrome local sem interface passou em 14 grupos de verificações, incluindo 48 layouts (três idiomas × dois temas × oito larguras: 320, 390, 600, 768, 850, 960, 1280 e 1440 pixels CSS). Foram verificados consistência de seleção/filtros, navegação filtrada, capturas/prévias de marca, foco por teclado, diálogos, preenchimento do orçamento, destino de novas abas, profundidade/pausa/movimento reduzido, telas de pouca altura, mouse em tela compacta e emulação de toque. A execução final não registrou overflow horizontal, nomes cortados, erros de execução/console ou respostas HTTP locais de erro. A navegação em nova aba foi interceptada para teste; isso não verifica a disponibilidade dos sites remotos.

Relatórios e capturas ficam na pasta local ignorada `artifacts/`; são evidências locais de navegador, não uma nova suíte de CI commitada, certificação de múltiplos navegadores/acessibilidade ou implantação em nuvem. O solicitante revisou a prévia local e autorizou a publicação em um commit e um pull request para merge posterior.
