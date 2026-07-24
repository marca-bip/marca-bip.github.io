# Marca BIP — Central de Identidade Visual

Site estático. Sem framework, sem build step, sem dependências.
Publicado por GitHub Pages direto da branch `main`.

## Arquitetura

- `index.html` — só o esqueleto. Cada seção é um `<section data-slot="...">` vazio.
- `js/config.js` — **todo** o conteúdo. É o único arquivo que a mantenedora edita.
- `js/app.js` — renderiza o config no esqueleto. Não contém conteúdo.
- `css/style.css` — os tokens do Manual v2.0 como custom properties.
- `scripts/sync-assets.sh` — copia os assets-mestre do repo privado e gera
  PDF e PNG a partir dos SVGs. Os SVGs são a fonte de verdade.

## Regras

- Todo conteúdo variável vive em `js/config.js`. Nunca hardcode cor, link,
  rótulo ou nome de arquivo no HTML ou no app.js.
- `config.js` usa `window.CONFIG = {...}` — **nunca** `export`. Módulos ES
  exigem servidor HTTP e quebram o `index.html` aberto por duplo clique.
- Todo texto visível é um par `{ pt, en }`. O EN pode estar vazio; a chave
  não pode faltar.
- Todo item e toda seção têm `estado` e `atualizadoEm`. O selo de estado é o
  elemento assinatura do site — não é decoração, é conteúdo.
- Nomes de arquivo: minúsculas, ASCII, hífen. Sem espaço, acento, colchete
  ou `+` (o `+` em URL é lido como espaço e quebra o link). O nome legível
  para humanos fica no `config.js`.
- Assets ficam no repositório, nunca em links externos de Drive.
- Cor de texto sobre fundo colorido se calcula por luminância
  (`textoSobre()` em app.js), nunca pelo número do token.
- Acessibilidade não é opcional: contraste AA, foco visível, navegação por
  teclado, `prefers-reduced-motion`.

## Fronteira com o repositório privado

Nada vindo de `BS - BIP/Diretrizes/` entra aqui: auditorias, posicionamento,
arquitetura de marca e RAG são material interno. Este repositório é público.
Se em dúvida sobre um arquivo, ele não entra.

## Conteúdo normativo

As regras de marca exibidas aqui (tamanhos mínimos, usos incorretos, régua de
parceiros, paleta) vêm do **Manual de Marca BIP v2.0**. Não invente regra
normativa nem ilustre uma regra com uma imagem que não a demonstra — se o
diagrama não existir, aponte para o manual.
