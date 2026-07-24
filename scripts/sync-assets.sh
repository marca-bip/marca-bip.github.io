#!/usr/bin/env bash
#
# sync-assets.sh — copia os assets-mestre do repositório privado do Brand System
# para este repositório público, renomeando-os para a convenção web e gerando
# os formatos derivados (PDF vetorial e PNG em 3 densidades) a partir dos SVGs.
#
# Os SVGs são a fonte de verdade: já estão em curvas (sem texto vivo), então
# tudo o mais deriva deles de forma determinística. Rodar este script de novo
# reconstrói a pasta assets/ inteira, do zero e igual.
#
# Requisito:  brew install librsvg
# Uso:        ./scripts/sync-assets.sh
#
set -euo pipefail

SRC="/Users/gabiwerneck/Developer/GitHub/BS - BIP/Assets"
DST="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/assets"

command -v rsvg-convert >/dev/null || { echo "Erro: falta rsvg-convert. Rode: brew install librsvg"; exit 1; }
[ -d "$SRC" ] || { echo "Erro: não achei os assets-mestre em $SRC"; exit 1; }

echo "→ Limpando destino"
rm -rf "$DST"/{logos,parceiros,paleta,favicon,manual}
mkdir -p "$DST"/{logos/{svg,png,pdf},parceiros,paleta,favicon,manual}

# ---------------------------------------------------------------------------
# 1. Logos — SVG canônico → SVG + PDF + PNG @1x/@2x/@3x
#
# Mapeamento explícito: "arquivo de origem|nome-web|largura-base-em-px".
# Os nomes de origem têm espaços e maiúsculas (bons no Finder, ruins na web);
# os nomes de destino são minúsculos, ASCII e com hífen.
# ---------------------------------------------------------------------------
LOGOS="
Logo BIP/Logo PT/BIP SVG/Logo BIP.svg|logo-bip-pt|1200
Logo BIP/Logo PT/BIP SVG/Logo BIP Posi.svg|logo-bip-pt-mono-positivo|1200
Logo BIP/Logo PT/BIP SVG/Logo BIP Neg.svg|logo-bip-pt-mono-negativo|1200
Logo BIP/Logo PT/BIP SVG/Logo BIP Neg Color.svg|logo-bip-pt-negativo-color|1200
Logo BIP/Logo EN/BIP EN SVG/Logo BIP EN.svg|logo-bip-en|1200
Logo BIP/Logo EN/BIP EN SVG/Logo BIP Posi EN.svg|logo-bip-en-mono-positivo|1200
Logo BIP/Logo EN/BIP EN SVG/Logo BIP Neg EN.svg|logo-bip-en-mono-negativo|1200
Logo BIP/Logo EN/BIP EN SVG/Logo BIP Neg Color EN.svg|logo-bip-en-negativo-color|1200
Logo BIP/Logo Redux/BIP redux SVG/Logo BIP redux.svg|logo-bip-redux|1200
Logo BIP/Logo Redux/BIP redux SVG/Logo BIP redux Posi.svg|logo-bip-redux-mono-positivo|1200
Logo BIP/Logo Redux/BIP redux SVG/Logo BIP redux Neg.svg|logo-bip-redux-mono-negativo|1200
Logo BIP/Logo Redux/BIP redux SVG/Logo BIP redux Neg Color.svg|logo-bip-redux-negativo-color|1200
Logo BIP/Symbol/Symbol SVG/Symbol BIP.svg|simbolo-bip|600
Logo BIP/Symbol/Symbol SVG/Symbol Posi.svg|simbolo-bip-mono-positivo|600
Logo BIP/Symbol/Symbol SVG/Symbol Neg.svg|simbolo-bip-mono-negativo|600
Logo BIP/Symbol/Symbol SVG/Symbol Neg Color.svg|simbolo-bip-negativo-color|600
"

echo "→ Logos: SVG + PDF + PNG (@1x/@2x/@3x)"
echo "$LOGOS" | grep -v '^$' | while IFS='|' read -r src name w; do
  [ -f "$SRC/$src" ] || { echo "  ⚠  não encontrado: $src"; continue; }

  cp "$SRC/$src" "$DST/logos/svg/$name.svg"
  rsvg-convert -f pdf -o "$DST/logos/pdf/$name.pdf" "$SRC/$src"
  for d in 1 2 3; do
    suffix=""; [ "$d" -gt 1 ] && suffix="@${d}x"
    rsvg-convert -w $(( w * d )) -o "$DST/logos/png/${name}${suffix}.png" "$SRC/$src"
  done
  echo "  ✓ $name"
done

# Diagrama de área de proteção: é uma peça de manual, não tem SVG de origem.
cp "$SRC/Logo BIP/Logo PT/BIP PNG/Logo BIP SAFE AREA.png" "$DST/logos/png/logo-bip-pt-area-de-protecao.png"
cp "$SRC/Logo BIP/Logo EN/BIP EN PNG/Logo BIP EN SAFE AREA.png" "$DST/logos/png/logo-bip-en-area-de-protecao.png"

# ---------------------------------------------------------------------------
# 2. Régua de parceiros  (aprovada pelo Secretariado — ver Plano de Deploy §9)
# ---------------------------------------------------------------------------
echo "→ Régua de parceiros"
cp "$SRC/Régua de Parceiros/Régua Parceiros [PT].pdf"                "$DST/parceiros/regua-parceiros-pt.pdf"
cp "$SRC/Régua de Parceiros/Régua Parceiros [PT].png"                "$DST/parceiros/regua-parceiros-pt.png"
cp "$SRC/Régua de Parceiros/Régua Parceiros [EN].pdf"                "$DST/parceiros/regua-parceiros-en.pdf"
cp "$SRC/Régua de Parceiros/Régua Parceiros [EN].png"                "$DST/parceiros/regua-parceiros-en.png"
cp "$SRC/Régua de Parceiros/BIP + GOV + Ministérios [PT].pdf"        "$DST/parceiros/regua-bip-gov-ministerios-horizontal-pt.pdf"
cp "$SRC/Régua de Parceiros/BIP + GOV + Ministérios Vert [PT].pdf"   "$DST/parceiros/regua-bip-gov-ministerios-vertical-pt.pdf"
cp "$SRC/Régua de Parceiros/GOV + Ministérios [PT].pdf"              "$DST/parceiros/regua-gov-ministerios-pt.pdf"

# Previews PNG das réguas que só existem em PDF (300 dpi → redimensionado)
for pair in "regua-bip-gov-ministerios-horizontal-pt" "regua-bip-gov-ministerios-vertical-pt" "regua-gov-ministerios-pt"; do
  pdftoppm -r 150 -png -singlefile "$DST/parceiros/$pair.pdf" "$DST/parceiros/$pair"
done

# ---------------------------------------------------------------------------
# 3. Paleta, favicon e manual
# ---------------------------------------------------------------------------
echo "→ Paleta, favicon e manual"
for c in Blue Green Yellow; do
  lc=$(echo "$c" | tr 'A-Z' 'a-z')
  cp "$SRC/Palheta Cores BIP/Palette $c.svg" "$DST/paleta/paleta-$lc.svg"
  cp "$SRC/Palheta Cores BIP/Tokens $c.svg"  "$DST/paleta/tokens-$lc.svg"
done

cp "$SRC/Favicon/"*.png "$SRC/Favicon/favicon.ico" "$DST/favicon/"

cp "$SRC/Manual da Marca/Manual de Marca BIP v2.0 - Julho 2026.pdf" "$DST/manual/manual-marca-bip-v2.pdf"
cp "$SRC/Manual da Marca/Manual de Marca BIP v2.0 - fonte editável.html" "$(dirname "$DST")/manual/index.html"

echo
echo "✓ Concluído. Peso total: $(du -sh "$DST" | cut -f1)"
echo "  Confira o preview dos logos antes de publicar: open assets/logos/png/"
