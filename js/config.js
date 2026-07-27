/* =========================================================================
   config.js — ÚNICO arquivo que você edita para atualizar o conteúdo do site.
   =========================================================================

   Regras (também em CLAUDE.md e COMO-ATUALIZAR.md):

   1. Nada de conteúdo no HTML. Cor, link, rótulo e nome de arquivo só aqui.
   2. Todo texto visível é um par { pt, en }. O EN pode estar vazio; a chave
      não pode faltar.
   3. Todo item tem `estado` e `atualizadoEm`.
      estado: "aprovado" | "em-revisao" | "em-construcao"
   4. Nunca use `export`. O arquivo precisa continuar funcionando quando o
      index.html é aberto por duplo clique, sem servidor.

   ========================================================================= */

window.CONFIG = {

  site: {
    versaoMarca: "2.0",
    atualizadoEm: "2026-07-24",
    // Enquanto true, o site pede aos buscadores para não indexá-lo.
    // Trocar para false quando o Secretariado aprovar a publicação oficial.
    naoIndexar: true,
  },

  /* ---------------------------------------------------------------------
     Rótulos de interface
     --------------------------------------------------------------------- */
  ui: {
    nomeSite: { pt: "Marca BIP", en: "BIP Brand" },
    baixar: { pt: "Baixar", en: "Download" },
    copiado: { pt: "Copiado", en: "Copied" },
    copiarHex: { pt: "Clique para copiar o HEX", en: "Click to copy the HEX" },
    atualizadoEm: { pt: "Atualizado em", en: "Updated" },
    verManual: { pt: "Abrir o manual completo", en: "Open the full manual" },
    irParaTopo: { pt: "Voltar ao topo", en: "Back to top" },
    trocarIdioma: { pt: "English", en: "Português" },
    menu: { pt: "Seções", en: "Sections" },
  },

  estados: {
    "aprovado": { pt: "Aprovado", en: "Approved" },
    "em-revisao": { pt: "Em revisão", en: "Under review" },
    "em-construcao": { pt: "Em construção", en: "In progress" },
  },

  /* ---------------------------------------------------------------------
     1. Hero
     --------------------------------------------------------------------- */
  hero: {
    estado: "em-revisao",
    atualizadoEm: "2026-07-24",
    titulo: {
      pt: "Marca BIP",
      en: "BIP Brand",
    },
    subtitulo: {
      pt: "A fonte oficial da identidade visual da Plataforma Brasil de Investimentos Climáticos e para a Transformação Ecológica.",
      en: "The official source for the visual identity of the Brazil Climate and Ecological Transformation Investment Platform.",
    },
    texto: {
      pt: [
        "A BIP é uma iniciativa do governo brasileiro para ampliar os investimentos na transformação ecológica do país. Liderada pelo Ministério da Fazenda, em conjunto com os ministérios do Meio Ambiente e Mudança do Clima, do Desenvolvimento, Indústria, Comércio e Serviços e de Minas e Energia, a Plataforma conecta projetos a fontes de financiamento em três frentes prioritárias: soluções baseadas na natureza e bioeconomia; indústria e mobilidade verde; e transição energética.",
        "O BNDES atua como Secretariado da Plataforma. A BIP conta com o apoio do PNUD e do Fundo Verde para o Clima (GCF).",
        "Um ecossistema desse tamanho fala com muitas vozes — e precisa de uma só imagem. Este é o endereço oficial da marca BIP. Todo arquivo aqui é a versão vigente. Se o material que você tem em mãos não veio daqui, ele provavelmente está desatualizado.",
      ],
      en: [
        "BIP is a Brazilian government initiative to scale up investment in the country's ecological transformation. Led by the Ministry of Finance, together with the Ministries of Environment and Climate Change, of Development, Industry, Trade and Services, and of Mines and Energy, the Platform connects projects to sources of finance across three priority fronts: nature-based solutions and bioeconomy; green industry and mobility; and energy transition.",
        "BNDES serves as the Platform's Secretariat. BIP is supported by UNDP and the Green Climate Fund (GCF).",
        "An ecosystem this large speaks with many voices — and needs a single image. This is the official home of the BIP brand. Every file here is the current version. If the material you have did not come from this page, it is probably out of date.",
      ],
    },
    nota: {
      pt: "Mantido pelo Secretariado da BIP, no BNDES.",
      en: "Maintained by the BIP Secretariat, at BNDES.",
    },
  },

  /* ---------------------------------------------------------------------
     2. Logotipo
     --------------------------------------------------------------------- */
  logotipo: {
    estado: "aprovado",
    atualizadoEm: "2026-07-23",
    titulo: { pt: "Logotipo", en: "Logo" },
    descricao: {
      pt: "Quatro assinaturas, cada uma com quatro versões. Use sempre a assinatura principal colorida; as demais existem para restrições de fundo, impressão ou espaço.",
      en: "Four lockups, each in four versions. Always default to the primary colour lockup; the others exist for background, print or space constraints.",
    },

    familias: [
      {
        id: "pt",
        nome: { pt: "Assinatura principal (PT)", en: "Primary lockup (PT)" },
        descricao: {
          pt: "Uso preferencial em materiais em português. Inclui o descritor completo.",
          en: "Preferred use in Portuguese-language materials. Includes the full descriptor.",
        },
      },
      {
        id: "en",
        nome: { pt: "Assinatura em inglês", en: "English lockup" },
        descricao: {
          pt: "Para materiais em inglês e público internacional.",
          en: "For English-language materials and international audiences.",
        },
      },
      {
        id: "redux",
        nome: { pt: "Logo Redux", en: "Redux logo" },
        descricao: {
          pt: "Sem o descritor. Obrigatória abaixo de 4 cm / 200 px, onde o descritor deixa de ser legível.",
          en: "Without the descriptor. Required below 4 cm / 200 px, where the descriptor is no longer legible.",
        },
      },
      {
        id: "simbolo",
        nome: { pt: "Símbolo", en: "Symbol" },
        descricao: {
          pt: "Elemento isolado. Use apenas quando a marca já foi apresentada no mesmo material — avatar, favicon, selo.",
          en: "Standalone element. Use only where the brand has already been introduced in the same material — avatar, favicon, seal.",
        },
      },
    ],

    // versoes[] é aplicado a cada família acima; os arquivos seguem o padrão
    // de nome  logo-bip-<familia><sufixo>  (ver scripts/sync-assets.sh)
    versoes: [
      {
        sufixo: "",
        nome: { pt: "Colorida", en: "Colour" },
        descricao: { pt: "Versão principal. Fundos claros.", en: "Primary version. Light backgrounds." },
        fundo: "claro",
      },
      {
        sufixo: "-mono-positivo",
        nome: { pt: "Monocromática positiva", en: "Monochrome positive" },
        descricao: { pt: "Preto. Impressão em uma cor, fax, documentos.", en: "Black. One-colour printing, documents." },
        fundo: "claro",
      },
      {
        sufixo: "-mono-negativo",
        nome: { pt: "Monocromática negativa", en: "Monochrome negative" },
        descricao: { pt: "Branco. Fundos escuros ou fotografias.", en: "White. Dark backgrounds or photography." },
        fundo: "escuro",
      },
      {
        sufixo: "-negativo-color",
        nome: { pt: "Negativa colorida", en: "Colour negative" },
        descricao: { pt: "Para fundos coloridos da paleta.", en: "For coloured backgrounds from the palette." },
        fundo: "azul",
      },
    ],

    regras: {
      titulo: { pt: "Regras de aplicação", en: "Application rules" },
      itens: [
        {
          // O diagrama da caixa de proteção está no manual; não há aqui um
          // arquivo que o mostre com as marcações, e ilustrar esta regra com
          // o logo solto seria enganoso. O link leva à página normativa.
          titulo: { pt: "Área de proteção", en: "Clear space" },
          texto: {
            pt: "Mantenha ao redor da marca uma área livre de qualquer outro elemento. O diagrama com as medidas da caixa de proteção está no Manual da Marca.",
            en: "Keep an area around the logo free of any other element. The diagram with the clear-space measurements is in the Brand Manual.",
          },
          imagem: null,
        },
        {
          titulo: { pt: "Tamanho mínimo", en: "Minimum size" },
          texto: {
            pt: "Impresso: 6 cm de comprimento. Digital: 300 px. Em casos excepcionais, até 4 cm / 200 px. Abaixo disso, use a versão Redux.",
            en: "Print: 6 cm wide. Digital: 300 px. Exceptionally, down to 4 cm / 200 px. Below that, use the Redux version.",
          },
          imagem: null,
        },
      ],
    },

    usosIncorretos: {
      titulo: { pt: "Usos incorretos", en: "Incorrect uses" },
      itens: [
        { pt: "Não altere a cor. Use as cores da paleta.", en: "Do not change the colours. Use the palette." },
        { pt: "Não gire o logotipo.", en: "Do not rotate the logo." },
        { pt: "Não corte o logotipo.", en: "Do not crop the logo." },
        { pt: "Não altere a opacidade.", en: "Do not change the opacity." },
        { pt: "Não distorça as proporções.", en: "Do not distort the proportions." },
        { pt: "Não aplique sobre fundos que comprometam o contraste.", en: "Do not place it on backgrounds that compromise contrast." },
      ],
    },
  },

  /* ---------------------------------------------------------------------
     3. Cores
     --------------------------------------------------------------------- */
  cores: {
    estado: "aprovado",
    atualizadoEm: "2026-07-23",
    titulo: { pt: "Cores", en: "Colour" },
    descricao: {
      pt: "Três cores institucionais, cada uma expandida em dez tons. Os tons 500 são as cores oficiais da marca.",
      en: "Three institutional colours, each expanded into ten tones. The 500 tones are the official brand colours.",
    },

    institucionais: [
      {
        nome: { pt: "Azul BIP", en: "BIP Blue" },
        hex: "#012169", rgb: "1 · 33 · 105", cmyk: "99 · 69 · 0 · 59", token: "blue-500",
        uso: {
          pt: "Cor estrutural da marca: logotipo, títulos e fundos institucionais.",
          en: "The brand's structural colour: logo, headings and institutional backgrounds.",
        },
      },
      {
        nome: { pt: "Verde BIP", en: "BIP Green" },
        hex: "#008E3C", rgb: "0 · 142 · 60", cmyk: "100 · 0 · 58 · 44", token: "green-500",
        uso: {
          pt: "Natureza e bioeconomia. No símbolo aplica-se a variação #009739; no descritor, o tom #00652B.",
          en: "Nature and bioeconomy. The symbol uses the #009739 variation; the descriptor uses #00652B.",
        },
      },
      {
        nome: { pt: "Amarelo BIP", en: "BIP Yellow" },
        hex: "#FEDD00", rgb: "254 · 221 · 0", cmyk: "0 · 13 · 100 · 0", token: "yellow-500",
        uso: {
          pt: "Energia e inovação. Uso pontual, como cor de acento.",
          en: "Energy and innovation. Sparing use, as an accent colour.",
        },
      },
      {
        nome: { pt: "Preto", en: "Black" },
        hex: "#000000", rgb: "0 · 0 · 0", cmyk: "0 · 0 · 0 · 100", token: null,
        uso: { pt: "Textos e versão monocromática.", en: "Text and the monochrome version." },
      },
      {
        nome: { pt: "Branco", en: "White" },
        hex: "#FFFFFF", rgb: "255 · 255 · 255", cmyk: "0 · 0 · 0 · 0", token: null,
        uso: { pt: "Superfícies e versão negativa.", en: "Surfaces and the negative version." },
      },
    ],

    escalas: {
      titulo: { pt: "Escala tonal — tokens de 50 a 900", en: "Tonal scale — tokens 50 to 900" },
      descricao: {
        pt: "Os tons claros (50–200) servem a fundos e superfícies; os escuros (600–900), a textos e sobreposições.",
        en: "Light tones (50–200) serve backgrounds and surfaces; dark tones (600–900) serve text and overlays.",
      },
      blue: [
        ["blue-50", "#E6E9F0"], ["blue-100", "#B0BAD1"], ["blue-200", "#8A99BA"], ["blue-300", "#556A9B"],
        ["blue-400", "#344D87"], ["blue-500", "#012169"], ["blue-600", "#011E60"], ["blue-700", "#01174B"],
        ["blue-800", "#01123A"], ["blue-900", "#000E2C"],
      ],
      green: [
        ["green-50", "#E6F4EC"], ["green-100", "#B0DCC3"], ["green-200", "#8ACBA5"], ["green-300", "#54B37C"],
        ["green-400", "#33A563"], ["green-500", "#008E3C"], ["green-600", "#008137"], ["green-700", "#00652B"],
        ["green-800", "#004E21"], ["green-900", "#003C19"],
      ],
      yellow: [
        ["yellow-50", "#FFFCE6"], ["yellow-100", "#FFF4B0"], ["yellow-200", "#FFEF8A"], ["yellow-300", "#FEE854"],
        ["yellow-400", "#FEE433"], ["yellow-500", "#FEDD00"], ["yellow-600", "#E7C900"], ["yellow-700", "#B49D00"],
        ["yellow-800", "#8C7A00"], ["yellow-900", "#6B5D00"],
      ],
    },

    proporcao: {
      titulo: { pt: "Regra 60-30-10", en: "The 60-30-10 rule" },
      descricao: {
        pt: "Para manter equilíbrio e consistência, as peças da BIP seguem esta proporção — do slide ao post.",
        en: "To keep balance and consistency, BIP materials follow this proportion — from slide to social post.",
      },
      faixas: [
        { pct: 60, cor: "#F5F6FA", texto: "#3A3F47", rotulo: { pt: "Neutros e superfícies", en: "Neutrals and surfaces" } },
        { pct: 30, cor: "#012169", texto: "#FFFFFF", rotulo: { pt: "Azul BIP", en: "BIP Blue" } },
        { pct: 10, cor: "#FEDD00", texto: "#16161A", rotulo: { pt: "Acentos", en: "Accents" } },
      ],
      nota: {
        pt: "Na prática: fundos e áreas de respiro em branco ou blue-50; estrutura, textos e blocos de destaque em Azul BIP; verde para ícones, marcadores e dados positivos; amarelo para o ponto focal — um número-chave, um botão, uma linha de destaque.",
        en: "In practice: backgrounds and breathing room in white or blue-50; structure, text and highlight blocks in BIP Blue; green for icons, markers and positive data; yellow for the focal point — a key figure, a button, a highlight line.",
      },
    },
  },

  /* ---------------------------------------------------------------------
     4. Tipografia
     --------------------------------------------------------------------- */
  tipografia: {
    estado: "aprovado",
    atualizadoEm: "2026-07-23",
    titulo: { pt: "Tipografia", en: "Typography" },
    familia: "Arial",
    descricao: {
      pt: "Apenas as fontes da família Arial devem ser usadas. Não há arquivo para baixar: Arial é fonte de sistema, presente em praticamente todo computador.",
      en: "Only fonts from the Arial family may be used. There is nothing to download: Arial is a system font, available on virtually every computer.",
    },
    regras: [
      {
        titulo: { pt: "No logotipo", en: "In the logo" },
        texto: {
          pt: "A fonte oficial do logotipo segue o padrão Arial Pro nas versões Light, Bold e ExtraBold.",
          en: "The official logo typeface is Arial Pro in Light, Bold and ExtraBold.",
        },
      },
      {
        titulo: { pt: "Alternativas", en: "Fallbacks" },
        texto: {
          pt: "Se as fontes Arial Pro não estiverem disponíveis, use Arial Nova nas aplicações Light e Bold, e Arial Unicode nas versões Regular e Bold.",
          en: "If Arial Pro is unavailable, use Arial Nova for Light and Bold, and Arial Unicode for Regular and Bold.",
        },
      },
    ],
    amostras: [
      { peso: 300, tamanho: 56, texto: { pt: "Arial Light", en: "Arial Light" } },
      { peso: 400, tamanho: 42, texto: { pt: "Arial Regular", en: "Arial Regular" } },
      { peso: 700, tamanho: 42, texto: { pt: "Arial Bold", en: "Arial Bold" } },
      { peso: 800, tamanho: 42, texto: { pt: "Arial ExtraBold", en: "Arial ExtraBold" } },
    ],
  },

  /* ---------------------------------------------------------------------
     5. Régua de Parceiros
     --------------------------------------------------------------------- */
  parceiros: {
    estado: "aprovado",
    atualizadoEm: "2026-07-24",
    titulo: { pt: "Régua de Parceiros", en: "Partner Lockups" },
    descricao: {
      pt: "Como a marca BIP se aplica junto às marcas do Governo Federal, dos ministérios e do BNDES, conforme as normas da SECOM.",
      en: "How the BIP brand is applied alongside the Federal Government, ministry and BNDES marks, in line with SECOM standards.",
    },
    regras: [
      {
        pt: "A marca BIP deve ser aplicada sempre à esquerda (aplicação horizontal) ou antes (aplicação vertical) das marcas de ministérios e demais órgãos parceiros.",
        en: "The BIP mark must always be placed to the left (horizontal) or before (vertical) ministry and partner marks.",
      },
      {
        pt: "A área total da marca do órgão vinculado não deve ultrapassar a altura e a largura total da marca nominativa do Governo Federal.",
        en: "The total area of the affiliated body's mark must not exceed the height and width of the Federal Government wordmark.",
      },
      {
        pt: "A marca BIP deve estar alinhada ao centro da palavra “BRASIL”.",
        en: "The BIP mark must be aligned to the centre of the word “BRASIL”.",
      },
      {
        pt: "Mantenha margem de pelo menos 2x de distância entre as marcas.",
        en: "Keep a margin of at least 2x between marks.",
      },
    ],
    // Cada régua existe em PT e EN. O preview e os arquivos seguem o idioma da
    // interface via t(); em EN, o card mostra a régua com os nomes em inglês.
    arquivos: [
      {
        nome: { pt: "Régua horizontal — BIP + Governo Federal + ministérios", en: "Horizontal lockup — BIP + Federal Government + ministries" },
        preview: {
          pt: "assets/parceiros/regua-bip-gov-ministerios-horizontal-pt.png",
          en: "assets/parceiros/regua-bip-gov-ministerios-horizontal-en.png",
        },
        largo: true,
        formatos: {
          pdf: {
            pt: "assets/parceiros/regua-bip-gov-ministerios-horizontal-pt.pdf",
            en: "assets/parceiros/regua-bip-gov-ministerios-horizontal-en.pdf",
          },
        },
      },
      {
        nome: { pt: "Régua vertical — BIP + Governo Federal + ministérios", en: "Vertical lockup — BIP + Federal Government + ministries" },
        preview: {
          pt: "assets/parceiros/regua-bip-gov-ministerios-vertical-pt.png",
          en: "assets/parceiros/regua-bip-gov-ministerios-vertical-en.png",
        },
        formatos: {
          pdf: {
            pt: "assets/parceiros/regua-bip-gov-ministerios-vertical-pt.pdf",
            en: "assets/parceiros/regua-bip-gov-ministerios-vertical-en.pdf",
          },
        },
      },
      {
        nome: { pt: "Régua de parceiros", en: "Partner lockup" },
        preview: {
          pt: "assets/parceiros/regua-parceiros-pt.png",
          en: "assets/parceiros/regua-parceiros-en.png",
        },
        largo: true,
        formatos: {
          pdf: { pt: "assets/parceiros/regua-parceiros-pt.pdf", en: "assets/parceiros/regua-parceiros-en.pdf" },
          png: { pt: "assets/parceiros/regua-parceiros-pt.png", en: "assets/parceiros/regua-parceiros-en.png" },
        },
      },
      {
        nome: { pt: "Governo Federal + ministérios", en: "Federal Government + ministries" },
        preview: {
          pt: "assets/parceiros/regua-gov-ministerios-pt.png",
          en: "assets/parceiros/regua-gov-ministerios-en.png",
        },
        largo: true,
        formatos: {
          pdf: {
            pt: "assets/parceiros/regua-gov-ministerios-pt.pdf",
            en: "assets/parceiros/regua-gov-ministerios-en.pdf",
          },
        },
      },
    ],
  },

  /* ---------------------------------------------------------------------
     6. Manual da Marca
     --------------------------------------------------------------------- */
  manual: {
    estado: "aprovado",
    atualizadoEm: "2026-07-24",
    titulo: { pt: "Manual da Marca", en: "Brand Manual" },
    versao: "2.0",
    data: { pt: "Julho de 2026", en: "July 2026" },
    descricao: {
      pt: "O documento normativo completo: conceito, arquitetura da marca, versões, área de proteção, tamanhos mínimos, paleta, tipografia e régua de parceiros.",
      en: "The complete normative document: concept, brand architecture, versions, clear space, minimum sizes, palette, typography and partner lockups.",
    },
    // Edições espelhadas: cada idioma normatiza a própria língua como principal.
    // O PDF e o HTML seguem o idioma da interface via t().
    pdf: {
      pt: "assets/manual/manual-marca-bip-v2.pdf",
      en: "assets/manual/bip-brand-guidelines-v2.pdf",
    },
    html: {
      pt: "manual/index.html",
      en: "manual/en/index.html",
    },
  },

  /* ---------------------------------------------------------------------
     7. Design System
     --------------------------------------------------------------------- */
  designSystem: {
    estado: "em-construcao",
    atualizadoEm: "2026-07-24",
    previsao: { pt: "Previsão: 3º trimestre de 2026", en: "Expected: Q3 2026" },
    titulo: { pt: "Design System", en: "Design System" },
    descricao: {
      pt: "Tokens, componentes e regras de acessibilidade para produtos digitais da BIP. Em construção — as escalas tonais desta página são a base dos tokens.",
      en: "Tokens, components and accessibility rules for BIP digital products. In progress — the tonal scales on this page are the basis of the tokens.",
    },
  },

  /* ---------------------------------------------------------------------
     8. Downloads (pacotes)
     --------------------------------------------------------------------- */
  downloads: {
    estado: "aprovado",
    atualizadoEm: "2026-07-24",
    titulo: { pt: "Downloads", en: "Downloads" },
    descricao: {
      pt: "Formatos: SVG para web e digital, PDF para impressão e fornecedores, PNG para uso rápido em documentos e apresentações.",
      en: "Formats: SVG for web and digital, PDF for print and vendors, PNG for quick use in documents and presentations.",
    },
    nota: {
      pt: "O PDF é o formato vetorial oficial para impressão. Fornecedores que pedirem EPS podem usar o PDF — é vetorial e universalmente aceito.",
      en: "PDF is the official vector format for print. Vendors asking for EPS can use the PDF — it is vector and universally accepted.",
    },
  },

  /* ---------------------------------------------------------------------
     9. Governança e contato
     --------------------------------------------------------------------- */
  governanca: {
    estado: "em-revisao",
    atualizadoEm: "2026-07-24",
    titulo: { pt: "Governança e contato", en: "Governance and contact" },
    email: "bip@bndes.gov.br",
    blocos: [
      {
        titulo: { pt: "Quem cuida da marca", en: "Who looks after the brand" },
        texto: {
          pt: "A identidade visual da BIP é mantida pelo Secretariado da Plataforma, no BNDES. Alterações no sistema de marca, novas aplicações e aprovações de uso passam pelo Secretariado.",
          en: "The BIP visual identity is maintained by the Platform's Secretariat, at BNDES. Changes to the brand system, new applications and use approvals go through the Secretariat.",
        },
      },
      {
        titulo: { pt: "Antes de usar a marca", en: "Before using the brand" },
        texto: {
          pt: "Materiais que seguem o manual e usam os arquivos desta página não precisam de aprovação prévia. Precisam de aprovação: coassinatura com marcas de terceiros, adaptações do logotipo e qualquer aplicação fora do manual. Peças que incluam as marcas do PNUD ou do GCF passam também pela Comunicação do PNUD.",
          en: "Materials that follow the manual and use the files on this page do not require prior approval. Approval is required for: co-branding with third-party marks, logo adaptations and any application outside the manual. Materials including the UNDP or GCF marks must also be cleared by UNDP Communications.",
        },
      },
      {
        titulo: { pt: "Uso da marca por terceiros — Selo BIP", en: "Third-party use — the BIP Seal" },
        texto: {
          pt: "Fundos aprovados pela BIP podem usar a marca em materiais de captação. O uso indica alinhamento aos critérios da Plataforma — nunca endosso de investimento, garantia ou promessa de retorno.",
          en: "Funds approved by BIP may use the mark in fundraising materials. Such use indicates alignment with the Platform's criteria — never an investment endorsement, guarantee or promise of return.",
        },
      },
      {
        titulo: { pt: "Como solicitar", en: "How to request" },
        texto: {
          pt: "Escreva para bip@bndes.gov.br com o material, o contexto de uso, o público e a data de veiculação.",
          en: "Write to bip@bndes.gov.br with the material, the context of use, the audience and the publication date.",
        },
      },
      {
        titulo: { pt: "Encontrou um uso incorreto?", en: "Spotted an incorrect use?" },
        texto: {
          pt: "Avise em bip@bndes.gov.br. Corrigir a circulação de versões antigas é parte do trabalho.",
          en: "Let us know at bip@bndes.gov.br. Correcting the circulation of outdated versions is part of the job.",
        },
      },
    ],
  },
};
