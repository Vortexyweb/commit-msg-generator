# 💬 Commit Message Generator

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> 🎯 Automatically generate [Conventional Commits](https://www.conventionalcommits.org/) from your git diff analysis.

## 📋 Description

Tired of writing commit messages manually? This CLI tool analyzes your git diff and intelligently generates conventional commit messages based on the files changed, additions, and deletions. It understands file types and patterns to suggest the most appropriate commit type.

## ✨ Features

- 📊 **Smart Analysis** - Analyzes git diff to understand changes
- 🎯 **Auto Type Detection** - Automatically determines commit type (feat, fix, docs, etc.)
- 🏷️ **Scope Inference** - Infers scope from file paths
- 📁 **File Awareness** - Understands file types and patterns
- 📋 **Clipboard Support** - Copy messages directly to clipboard
- 🔍 **Interactive Mode** - View detailed analysis before generating
- ⚡ **Lightning Fast** - No external API calls, pure heuristics

## 🛠️ Technologies

- Node.js
- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling

## 📥 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/commit-msg-generator.git

# Navigate to the project
cd commit-msg-generator

# Install dependencies
npm install

# Link globally (optional)
npm link
```

## 🚀 Usage

```bash
# Generate from unstaged changes
commit-msg generate

# Generate from staged changes
commit-msg generate --staged

# Show detailed analysis
commit-msg generate --message

# Interactive mode with full analysis
commit-msg interactive

# Generate and copy to clipboard
commit-msg copy
```

## 📝 Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `chore` | Build process or auxiliary tool changes |

## 📁 Project Structure

```
commit-msg-generator/
├── index.js        # Main CLI logic
├── package.json    # Dependencies
├── LICENSE         # MIT License
└── README.md       # This file
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Made with ❤️ by [Nyox](https://github.com/yourusername)
