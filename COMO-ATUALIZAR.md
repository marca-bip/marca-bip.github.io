# Como atualizar este site

Este é o guia para quem mantém a Central de Marca da BIP. Ele não pressupõe
conhecimento de programação. Os dois primeiros níveis são feitos pelo
navegador, sem instalar nada.

O site é estático: não há banco de dados, servidor ou senha de administrador.
O que está no repositório é exatamente o que aparece no ar. Toda alteração
publicada fica no ar em cerca de um minuto.

---

## Nível 1 — Trocar um arquivo que já existe

É o caso mais comum: o logo mudou, o manual ganhou uma versão nova, a régua
de parceiros foi corrigida.

1. Abra o repositório no GitHub.
2. Navegue até a pasta do arquivo (por exemplo `assets/logos/svg/`).
3. Clique em **Add file → Upload files**.
4. Arraste o arquivo novo. **Ele precisa ter exatamente o mesmo nome do
   antigo** — é isso que faz a substituição funcionar.
5. Escreva embaixo o que você mudou (ex.: "atualiza manual para v2.1").
6. Clique em **Commit changes**.

Espere um minuto e recarregue o site. Se não mudou, force o recarregamento
com `Cmd + Shift + R`.

> **Atenção ao nome do arquivo.** Os arquivos aqui usam letras minúsculas,
> sem acento e sem espaço (`logo-bip-pt.svg`). Se você subir
> `Logo BIP PT.svg`, o site não vai encontrá-lo — ele vai criar um arquivo
> novo em vez de substituir o antigo.

---

## Nível 2 — Mudar um texto, uma cor ou adicionar um arquivo

Todo o conteúdo do site vive num único arquivo: **`js/config.js`**. Título,
descrição, código de cor, nome de arquivo, texto de governança — tudo.
Você nunca precisa editar o HTML.

### Para editar

1. No GitHub, abra `js/config.js`.
2. Clique no ícone de **lápis** (canto superior direito).
3. Faça a alteração.
4. **Commit changes**.

### As três regras

**1. Texto sempre em duplo, português e inglês.**

```js
titulo: { pt: "Logotipo", en: "Logo" },
```

Se você mudar só o `pt`, o site em inglês continua com o texto antigo.
Mude os dois.

**2. Não mexa na pontuação em volta.**

O que você edita é o que está **entre aspas**. As vírgulas, chaves `{ }` e
colchetes `[ ]` fazem parte da estrutura — se uma delas sumir, o site fica
em branco.

```js
descricao: { pt: "TEXTO AQUI", en: "TEXT HERE" },
          ↑                  ↑              ↑ ↑
       não mexa          só isso        não mexa
```

Se o site ficar em branco depois de uma edição, não se desespere: veja
"Desfazer" mais abaixo.

**3. Aspas dentro do texto.**

Se o texto precisa de aspas, use as curvas: `“assim”`. As aspas retas `"`
encerram o texto e quebram o arquivo.

### Para adicionar um arquivo novo para download

Duas etapas: subir o arquivo (Nível 1) e registrá-lo no `config.js`.
No `config.js`, encontre um bloco parecido com o que você quer criar,
copie-o inteiro — da `{` até a `},` — e cole logo abaixo, mudando os
valores. Mantenha a vírgula no fim.

### Para mudar o selo de estado de uma seção

Cada seção tem uma linha `estado:`. Os três valores possíveis são:

```js
estado: "aprovado",       // verde
estado: "em-revisao",     // amarelo
estado: "em-construcao",  // azul
```

Atualize também o `atualizadoEm:` logo abaixo, no formato `"2026-08-15"`
(ano-mês-dia). A data aparece ao lado do título da seção.

### Para tirar o site do modo "não indexar"

No topo do `config.js`:

```js
naoIndexar: true,
```

Enquanto estiver `true`, o site pede ao Google que não o inclua nos
resultados de busca — útil enquanto ele ainda não foi aprovado
oficialmente. Troque para `false` quando o Secretariado autorizar a
divulgação. O link funciona normalmente nos dois casos.

---

## Desfazer uma alteração

Todo commit é reversível.

1. No repositório, clique na aba **Commits** (ou no ícone de relógio).
2. Abra o commit que causou o problema.
3. Clique em **Revert** e confirme.

O site volta ao estado anterior em cerca de um minuto. Nada se perde.

---

## Nível 3 — Mudanças estruturais

Nova seção, mudança de layout, novo comportamento. Isso exige alguém que
mexa com código. O arquivo `CLAUDE.md` na raiz descreve as convenções do
projeto para quem for fazer essa manutenção — inclusive com o Claude Code.

---

## Republicar os assets a partir dos arquivos-mestre

Os arquivos deste repositório são **cópias**. Os originais vivem no
repositório privado do Brand System, em `BS - BIP/Assets/`.

Quando um arquivo-mestre mudar, não copie à mão: rode o script que
reconstrói a pasta `assets/` inteira, já com os nomes corretos e todos os
formatos derivados (PDF vetorial e PNG em três densidades).

```bash
brew install librsvg      # só na primeira vez
./scripts/sync-assets.sh
```

O script é a documentação viva de onde cada arquivo veio. Se um asset
mudar de lugar na origem, atualize o caminho lá dentro.

---

## O que este site espera de quem o mantém

- **Data visível.** Ao trocar qualquer coisa, atualize o `atualizadoEm:`.
  Um arquivo sem data de atualização é indistinguível de um arquivo
  desatualizado — e o site inteiro existe para resolver isso.
- **Estado honesto.** Se uma seção está em revisão, o selo deve dizer isso.
  Um hub que finge estar completo perde a autoridade que o torna útil.
- **Nada de link externo para arquivo.** Assets moram aqui, no repositório.
  Links de Drive expiram, mudam de dono e quebram.
