# 🎯 Commit Message Generator | Gerador de Mensagens de Commit

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 🚀 O que é o Commit Message Generator?
Gere automaticamente mensagens de commit seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/) a partir da análise do seu git diff. Essa ferramenta CLI analisa suas alterações e cria mensagens inteligentes baseadas nos arquivos modificados, adições e remoções.

## ⚡ Funcionalidades Principais
- **Análise Inteligente** — Analisa o git diff para entender as mudanças realizadas
- **Detecção Automática de Tipo** — Determina automaticamente o tipo de commit (feat, fix, docs, etc.)
- **Inferência de Escopo** — Infere o escopo a partir dos caminhos dos arquivos
- **Consciência de Arquivos** — Entende tipos e padrões de arquivos
- **Suporte à Área de Transferência** — Copie mensagens diretamente para o clipboard
- **Modo Interativo** — Visualize uma análise detalhada antes de gerar a mensagem
- **Ultra Rápido** — Sem chamadas a APIs externas, apenas heurísticas puras

## 🛠️ Tecnologias Utilizadas
- **Node.js** — Ambiente de execução
- [Commander.js](https://github.com/tj/commander.js) — Framework de CLI
- [Chalk](https://github.com/chalk/chalk) — Estilização de strings no terminal

## 📦 Como Usar

```bash
# Gerar a partir de alterações não commitadas
commit-msg generate

# Gerar a partir de alterações staged
commit-msg generate --staged

# Exibir análise detalhada
commit-msg generate --message

# Modo interativo com análise completa
commit-msg interactive

# Gerar e copiar para a área de transferência
commit-msg copy
```

## 📝 Tipos de Commit

| Tipo | Descrição |
|------|-----------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alterações apenas na documentação |
| `style` | Alterações no estilo do código (formatação, etc.) |
| `refactor` | Alteração de código que não corrige bug nem adiciona funcionalidade |
| `test` | Adição ou correção de testes |
| `chore` | Alterações no processo de build ou ferramentas auxiliares |

## 🔧 Como Instalar e Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/yourusername/commit-msg-generator.git
```

2. Navegue até o projeto e instale as dependências:
```bash
cd commit-msg-generator
npm install
```

3. (Opcional) Instale globalmente:
```bash
npm link
```

## 📁 Estrutura do Projeto

```
commit-msg-generator/
├── index.js        # Lógica principal do CLI
├── package.json    # Dependências
├── LICENSE         # Licença MIT
└── README.md       # Este arquivo
```

## 👤 Autor

[Nyox](https://github.com/yourusername) — Desenvolvedor apaixonado por ferramentas de produtividade para desenvolvedores.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
