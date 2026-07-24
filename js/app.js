/* =========================================================================
   app.js — monta a página a partir de js/config.js.
   Não há conteúdo aqui: só a lógica que transforma o config em HTML.
   Para mudar texto, cor, link ou arquivo, edite js/config.js.
   ========================================================================= */
(function () {
  "use strict";

  var C = window.CONFIG;

  /* ------------------------------------------------------------ idioma -- */
  // Prioridade: ?lang= na URL  →  escolha salva  →  pt.
  // O padrão é sempre PT, e não o idioma do navegador: este é um endereço
  // canônico brasileiro, e quem compartilha "o link" espera o mesmo resultado
  // sempre. Para mandar um link já em inglês, use ?lang=en.
  function idiomaInicial() {
    var url = new URLSearchParams(location.search).get("lang");
    if (url === "pt" || url === "en") return url;
    try {
      var salvo = localStorage.getItem("marca-bip:lang");
      if (salvo === "pt" || salvo === "en") return salvo;
    } catch (e) { /* modo privado: segue com o padrão */ }
    return "pt";
  }

  var lang = idiomaInicial();

  // t() aceita tanto um par {pt,en} quanto uma string simples.
  function t(v) {
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    return v[lang] || v.pt || v.en || "";
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(slot) { return document.querySelector('[data-slot="' + slot + '"]'); }

  // Escolhe texto claro ou escuro pela luminância real da cor de fundo, e não
  // pelo número do token: o amarelo-500 é claro e o azul-300 é escuro, então
  // qualquer regra baseada no número erra em uma das escalas.
  function textoSobre(hex) {
    var h = hex.replace("#", "");
    var canal = [0, 2, 4].map(function (i) {
      var c = parseInt(h.substr(i, 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    var lum = 0.2126 * canal[0] + 0.7152 * canal[1] + 0.0722 * canal[2];
    // Contraste contra branco vs. contra o preto do manual (#16161A).
    return (1.05 / (lum + 0.05)) >= ((lum + 0.05) / 0.0827) ? "#FFFFFF" : "#16161A";
  }

  function set(slot, html) {
    var el = $(slot);
    if (el) el.innerHTML = html;
  }

  /* ------------------------------------------------------------- datas -- */
  function dataLegivel(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    var meses = {
      pt: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
      en: ["January","February","March","April","May","June","July","August","September","October","November","December"]
    };
    var d = parseInt(p[2], 10), m = meses[lang][parseInt(p[1], 10) - 1], a = p[0];
    return lang === "pt" ? (d + " de " + m + " de " + a) : (m + " " + d + ", " + a);
  }

  /* -------------------------------------------------- selo + cabeçalho -- */
  function selo(estado) {
    if (!estado || !C.estados[estado]) return "";
    return '<span class="selo selo--' + estado + '">' + esc(t(C.estados[estado])) + "</span>";
  }

  function cabeca(bloco, extra) {
    return (
      '<div class="secao__cabeca">' +
        '<div class="secao__topo">' +
          "<h2>" + esc(t(bloco.titulo)) + "</h2>" +
          selo(bloco.estado) +
          '<span class="data">' + esc(t(C.ui.atualizadoEm)) + " " + esc(dataLegivel(bloco.atualizadoEm)) + "</span>" +
        "</div>" +
        (bloco.descricao ? '<p class="secao__desc">' + esc(t(bloco.descricao)) + "</p>" : "") +
        (extra || "") +
      "</div>"
    );
  }

  /* --------------------------------------------------------------- nav -- */
  var SECOES = [
    { id: "logotipo",      rot: { pt: "Logotipo",   en: "Logo" } },
    { id: "cores",         rot: { pt: "Cores",      en: "Colour" } },
    { id: "tipografia",    rot: { pt: "Tipografia", en: "Typography" } },
    { id: "parceiros",     rot: { pt: "Parceiros",  en: "Partners" } },
    { id: "manual",        rot: { pt: "Manual",     en: "Manual" } },
    { id: "design-system", rot: { pt: "Design System", en: "Design System" } },
    { id: "downloads",     rot: { pt: "Downloads",  en: "Downloads" } },
    { id: "governanca",    rot: { pt: "Governança", en: "Governance" } }
  ];

  function renderNav() {
    set("nav", SECOES.map(function (s) {
      return '<li><a href="#' + s.id + '">' + esc(t(s.rot)) + "</a></li>";
    }).join(""));
  }

  /* -------------------------------------------------------------- hero -- */
  function renderHero() {
    var h = C.hero;
    var logo = lang === "en" ? "logo-bip-en-mono-negativo" : "logo-bip-pt-mono-negativo";

    // h.texto é um array de parágrafos por idioma, não um par {pt,en} simples.
    var paragrafos = (h.texto[lang] || h.texto.pt).map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");

    set("hero",
      '<div class="hero__interno">' +
        '<img class="hero__logo" src="assets/logos/svg/' + logo + '.svg" alt="' + esc(t(h.titulo)) + '" />' +
        "<h1>" + esc(t(h.titulo)) + "</h1>" +
        '<p class="hero__sub">' + esc(t(h.subtitulo)) + "</p>" +
        '<div class="hero__texto">' +
          paragrafos +
          '<p class="hero__nota">' + esc(t(h.nota)) + "</p>" +
        "</div>" +
      "</div>"
    );
  }

  /* ---------------------------------------------------------- logotipo -- */
  function renderLogotipo() {
    var L = C.logotipo;

    var familias = L.familias.map(function (fam) {
      var cards = L.versoes.map(function (v) {
        var base = (fam.id === "simbolo" ? "simbolo-bip" : "logo-bip-" + fam.id) + v.sufixo;
        return (
          '<div class="logo-card">' +
            '<div class="logo-card__palco logo-card__palco--' + v.fundo + '">' +
              '<img src="assets/logos/svg/' + base + '.svg" alt="' + esc(t(fam.nome) + " — " + t(v.nome)) + '" loading="lazy" />' +
            "</div>" +
            '<div class="logo-card__pe">' +
              '<p class="logo-card__nome">' + esc(t(v.nome)) + "</p>" +
              '<p class="logo-card__desc">' + esc(t(v.descricao)) + "</p>" +
              '<div class="formatos">' +
                '<a class="formato" href="assets/logos/svg/' + base + '.svg" download>SVG</a>' +
                '<a class="formato" href="assets/logos/pdf/' + base + '.pdf" download>PDF</a>' +
                '<a class="formato" href="assets/logos/png/' + base + '@2x.png" download>PNG</a>' +
              "</div>" +
            "</div>" +
          "</div>"
        );
      }).join("");

      return (
        '<div class="familia">' +
          '<p class="familia__nome">' + esc(t(fam.nome)) + "</p>" +
          '<p class="familia__desc">' + esc(t(fam.descricao)) + "</p>" +
          '<div class="grade-logos">' + cards + "</div>" +
        "</div>"
      );
    }).join("");

    var regras =
      "<h3>" + esc(t(L.regras.titulo)) + "</h3>" +
      '<div class="regras">' +
        L.regras.itens.map(function (r) {
          return (
            '<div class="regra">' +
              "<h4>" + esc(t(r.titulo)) + "</h4>" +
              "<p>" + esc(t(r.texto)) + "</p>" +
              (r.imagem ? '<img src="' + r.imagem + '" alt="" loading="lazy" />' : "") +
            "</div>"
          );
        }).join("") +
      "</div>";

    var incorretos =
      "<h3>" + esc(t(L.usosIncorretos.titulo)) + "</h3>" +
      '<ul class="lista-nao">' +
        L.usosIncorretos.itens.map(function (i) { return "<li>" + esc(t(i)) + "</li>"; }).join("") +
      "</ul>";

    set("logotipo", cabeca(L) + familias + regras + incorretos);
  }

  /* ------------------------------------------------------------- cores -- */
  function renderCores() {
    var K = C.cores;

    var cards = K.institucionais.map(function (c) {
      var borda = c.hex.toUpperCase() === "#FFFFFF" ? "border:1px solid var(--line-2);" : "";
      return (
        '<div class="cor-card">' +
          '<button class="cor-card__amostra" style="background:' + c.hex + ";color:" + textoSobre(c.hex) + ";" + borda + '"' +
            ' data-copiar="' + c.hex + '" title="' + esc(t(C.ui.copiarHex)) + '">' +
            '<span class="cor-card__hex">' + esc(c.hex) + "</span>" +
          "</button>" +
          '<div class="cor-card__pe">' +
            '<p class="cor-card__nome">' + esc(t(c.nome)) + "</p>" +
            '<p class="cor-card__specs">' +
              "<b>RGB</b> " + esc(c.rgb) + "<br />" +
              "<b>CMYK</b> " + esc(c.cmyk) +
              (c.token ? "<br /><b>Token</b> " + esc(c.token) : "") +
            "</p>" +
            '<p class="cor-card__uso">' + esc(t(c.uso)) + "</p>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    function escala(tons) {
      return (
        '<div class="escala"><div class="escala__faixa">' +
          tons.map(function (par) {
            var nome = par[0], hex = par[1];
            var texto = textoSobre(hex);
            var oficial = parseInt(nome.split("-")[1], 10) === 500;
            return (
              '<button class="escala__tom" style="background:' + hex + ";color:" + texto + '"' +
                ' data-copiar="' + hex + '" title="' + esc(nome + " · " + hex) + '">' +
                (oficial ? '<span class="escala__oficial" aria-hidden="true">●</span>' : "") +
                '<span class="escala__rotulo"><span class="t">' + esc(nome) + '</span><span class="h">' + esc(hex) + "</span></span>" +
              "</button>"
            );
          }).join("") +
        "</div></div>"
      );
    }

    var escalas =
      "<h3>" + esc(t(K.escalas.titulo)) + "</h3>" +
      '<p class="secao__desc" style="margin-bottom:26px">' + esc(t(K.escalas.descricao)) + "</p>" +
      escala(K.escalas.blue) + escala(K.escalas.green) + escala(K.escalas.yellow);

    var prop =
      "<h3>" + esc(t(K.proporcao.titulo)) + "</h3>" +
      '<p class="secao__desc" style="margin-bottom:24px">' + esc(t(K.proporcao.descricao)) + "</p>" +
      '<div class="proporcao">' +
        K.proporcao.faixas.map(function (f) {
          return (
            '<div class="proporcao__faixa" style="flex:' + f.pct + ";background:" + f.cor + ";color:" + f.texto + '">' +
              '<span class="proporcao__pct">' + f.pct + "%</span>" +
              '<span class="proporcao__rot">' + esc(t(f.rotulo)) + "</span>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      '<p class="nota-caixa">' + esc(t(K.proporcao.nota)) + "</p>";

    set("cores", cabeca(K) + '<div class="grade-cores">' + cards + "</div>" + escalas + prop);
  }

  /* -------------------------------------------------------- tipografia -- */
  function renderTipografia() {
    var T = C.tipografia;
    var amostras =
      '<div class="tipo-amostras">' +
        T.amostras.map(function (a) {
          return (
            '<div class="tipo-amostra">' +
              '<span class="tipo-amostra__texto" style="font-weight:' + a.peso + ";font-size:" + a.tamanho + 'px">' +
                esc(t(a.texto)) +
              "</span>" +
              '<span class="tipo-amostra__meta">' + a.peso + " · " + a.tamanho + "px</span>" +
            "</div>"
          );
        }).join("") +
      "</div>";

    var regras =
      '<div class="regras" style="margin-top:36px">' +
        T.regras.map(function (r) {
          return '<div class="regra"><h4>' + esc(t(r.titulo)) + "</h4><p>" + esc(t(r.texto)) + "</p></div>";
        }).join("") +
      "</div>";

    set("tipografia", cabeca(T) + amostras + regras);
  }

  /* --------------------------------------------------------- parceiros -- */
  function renderParceiros() {
    var P = C.parceiros;

    var regras =
      '<ul class="lista-regras">' +
        P.regras.map(function (r) { return "<li>" + esc(t(r)) + "</li>"; }).join("") +
      "</ul>";

    var cards =
      '<div class="grade-parceiros">' +
        P.arquivos.map(function (a) {
          var fmts = Object.keys(a.formatos).map(function (k) {
            return '<a class="formato" href="' + a.formatos[k] + '" download>' + k.toUpperCase() + "</a>";
          }).join("");
          return (
            '<div class="parceiro-card' + (a.largo ? " parceiro-card--largo" : "") + '">' +
              '<div class="parceiro-card__palco">' +
                '<img src="' + a.preview + '" alt="' + esc(t(a.nome)) + '" loading="lazy" />' +
              "</div>" +
              '<div class="parceiro-card__pe">' +
                '<p class="logo-card__nome">' + esc(t(a.nome)) + "</p>" +
                '<div class="formatos" style="margin-top:12px">' + fmts + "</div>" +
              "</div>" +
            "</div>"
          );
        }).join("") +
      "</div>";

    set("parceiros", cabeca(P) + regras + cards);
  }

  /* ------------------------------------------------------------ manual -- */
  function renderManual() {
    var M = C.manual;
    var aviso = (M.apenasPT && lang === "en" && t(M.avisoIdioma))
      ? '<p class="aviso">' + esc(t(M.avisoIdioma)) + "</p>" : "";

    set("manual",
      cabeca(M) +
      '<div class="cartao cartao--destaque">' +
        '<p class="cartao__titulo">' + esc(t(M.titulo)) + " v" + esc(M.versao) + "</p>" +
        '<p class="cartao__meta">' + esc(t(M.data)) + "</p>" +
        "<p>" + esc(t(M.descricao)) + "</p>" +
        aviso +
        '<div class="acoes">' +
          '<a class="botao botao--primario" href="' + M.pdf + '" download>PDF</a>' +
          '<a class="botao botao--secundario" href="' + M.html + '">' + esc(t(C.ui.verManual)) + "</a>" +
        "</div>" +
      "</div>"
    );
  }

  /* ----------------------------------------------------- design system -- */
  function renderDesignSystem() {
    var D = C.designSystem;
    set("designSystem",
      cabeca(D) +
      '<div class="cartao">' +
        "<p>" + esc(t(D.previsao)) + "</p>" +
      "</div>"
    );
  }

  /* --------------------------------------------------------- downloads -- */
  function renderDownloads() {
    var D = C.downloads;
    var formatos = [
      { tag: "SVG", h: { pt: "Web e digital",        en: "Web and digital" },
                    p: { pt: "Vetorial, leve, escala sem perda. Primeira escolha para telas.",
                         en: "Vector, lightweight, scales losslessly. First choice for screens." } },
      { tag: "PDF", h: { pt: "Impressão e fornecedores", en: "Print and vendors" },
                    p: { pt: "Vetorial e universal. É o formato oficial de impressão da marca.",
                         en: "Vector and universal. The brand's official print format." } },
      { tag: "PNG", h: { pt: "Uso rápido",           en: "Quick use" },
                    p: { pt: "Para documentos, apresentações e e-mail. Fundo transparente, três densidades.",
                         en: "For documents, slides and email. Transparent background, three densities." } }
    ];
    set("downloads",
      cabeca(D) +
      '<div class="grade-info">' +
        formatos.map(function (f) {
          return (
            '<div class="info-card">' +
              '<span class="info-card__tag">' + f.tag + "</span>" +
              "<h4>" + esc(t(f.h)) + "</h4>" +
              "<p>" + esc(t(f.p)) + "</p>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      '<p class="nota-caixa">' + esc(t(D.nota)) + "</p>"
    );
  }

  /* -------------------------------------------------------- governança -- */
  function renderGovernanca() {
    var G = C.governanca;
    set("governanca",
      cabeca(G) +
      '<div class="blocos-gov">' +
        G.blocos.map(function (b) {
          return '<div class="bloco-gov"><h4>' + esc(t(b.titulo)) + "</h4><p>" + esc(t(b.texto)) + "</p></div>";
        }).join("") +
      "</div>"
    );
  }

  /* ------------------------------------------------------------ rodapé -- */
  function renderRodape() {
    var rot = {
      versao: { pt: "Sistema de marca versão", en: "Brand system version" },
      pub:    { pt: "Página atualizada em",    en: "Page updated" }
    };
    set("rodape",
      '<div class="rodape__interno">' +
        "<div>" +
          '<img src="assets/logos/svg/logo-bip-' + (lang === "en" ? "en" : "pt") + '-mono-negativo.svg" alt="BIP" />' +
          "<p>" + esc(t(C.hero.nota)) + "</p>" +
          '<p><a href="mailto:' + C.governanca.email + '">' + C.governanca.email + "</a></p>" +
        "</div>" +
        '<div class="rodape__dir">' +
          "<p>" + esc(t(rot.versao)) + " " + esc(C.site.versaoMarca) + "</p>" +
          "<p>" + esc(t(rot.pub)) + " " + esc(dataLegivel(C.site.atualizadoEm)) + "</p>" +
        "</div>" +
      "</div>"
    );
  }

  /* ------------------------------------------------- copiar para a área -- */
  var timerToast;
  function toast(msg) {
    var el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("toast--visivel");
    clearTimeout(timerToast);
    timerToast = setTimeout(function () { el.classList.remove("toast--visivel"); }, 1600);
  }

  document.addEventListener("click", function (ev) {
    var alvo = ev.target.closest("[data-copiar]");
    if (!alvo) return;
    var valor = alvo.getAttribute("data-copiar");
    var ok = function () { toast(t(C.ui.copiado) + " " + valor); };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(valor).then(ok, function () { copiaLegada(valor, ok); });
    } else {
      copiaLegada(valor, ok);
    }
  });

  // Necessário quando a página é aberta por file:// (sem origem segura).
  function copiaLegada(valor, ok) {
    var ta = document.createElement("textarea");
    ta.value = valor;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:absolute;left:-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); ok(); } catch (e) { /* silencioso */ }
    document.body.removeChild(ta);
  }

  /* ------------------------------------------------- seção ativa no nav -- */
  function observarSecoes() {
    if (!("IntersectionObserver" in window)) return;
    var links = {};
    document.querySelectorAll('[data-slot="nav"] a').forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        var a = links[e.target.id];
        if (!a) return;
        if (e.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
          a.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-92px 0px -70% 0px" });
    SECOES.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
  }

  /* ------------------------------------------------------------ montar -- */
  function render() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    set("nomeSite", esc(t(C.ui.nomeSite)));
    var btn = $("langToggle");
    if (btn) {
      btn.textContent = t(C.ui.trocarIdioma);
      btn.setAttribute("lang", lang === "pt" ? "en" : "pt-BR");
    }
    renderNav();
    renderHero();
    renderLogotipo();
    renderCores();
    renderTipografia();
    renderParceiros();
    renderManual();
    renderDesignSystem();
    renderDownloads();
    renderGovernanca();
    renderRodape();
  }

  var btnLang = $("langToggle");
  if (btnLang) {
    btnLang.addEventListener("click", function () {
      lang = lang === "pt" ? "en" : "pt";
      try { localStorage.setItem("marca-bip:lang", lang); } catch (e) { /* modo privado */ }
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
      render();
      observarSecoes();
    });
  }

  if (C.site.naoIndexar) {
    var m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    document.head.appendChild(m);
  }

  render();
  observarSecoes();
})();
