# Marca BIP

Central de identidade visual da BIP — Plataforma Brasil de Investimentos
Climáticos e para a Transformação Ecológica.

**No ar em:** https://marca-bip.github.io

Este é o endereço canônico dos arquivos de marca da BIP. Quando alguém pedir
"o logo da BIP", a resposta é este link.

## O que tem aqui

Logotipos em todas as versões e formatos, paleta de cores com códigos e
tokens, tipografia, régua de parceiros conforme as normas da SECOM, o Manual
de Marca v2.0 e as regras de uso da marca por terceiros.

Português e inglês. Sem login, sem VPN.

## Para quem mantém o site

Leia **[COMO-ATUALIZAR.md](COMO-ATUALIZAR.md)**. Os dois cenários mais comuns
— trocar um arquivo e mudar um texto — são feitos pelo navegador, sem
instalar nada.

## Como funciona

Site estático em HTML, CSS e JavaScript puros. Sem framework, sem build step,
sem dependências. O que está no repositório é o que está no ar.

Todo o conteúdo vive em `js/config.js`; o `js/app.js` renderiza a página a
partir dele. Para regenerar os assets a partir dos arquivos-mestre, veja
`scripts/sync-assets.sh`.

Convenções técnicas em [CLAUDE.md](CLAUDE.md). Mudanças em
[HISTORICO.md](HISTORICO.md).

## Governança

A identidade visual da BIP é mantida pelo Secretariado da Plataforma, no
BNDES. Solicitações de uso e relatos de uso incorreto: bip@bndes.gov.br
