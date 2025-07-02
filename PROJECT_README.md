# Portfolio Manager

Sistema de gestão e organização para o portfólio de projetos GitHub de Franklin Baldo.

## 📊 Visão Geral

Este repositório contém ferramentas e scripts para gerenciar uma coleção de 43+ repositórios distribuídos across múltiplos domínios:

- **34 repositórios ativos no GitHub**
- **9 projetos únicos locais**
- **Domínios**: Legal Tech, AI/ML, Web Development, Data Processing, Automation

## 🚀 Comandos Principais

### Sincronização de Repositórios
```bash
# Sincronizar todos os repositórios com GitHub
npm run sync

# Verificar status de todos os repositórios
npm run check-status

# Comando rápido para verificar estado geral
npm start
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run sync` | Clona novos repos e atualiza existentes |
| `npm run check-status` | Analisa status de todos os repositórios |
| `npm run analyze` | Gera relatório detalhado dos projetos |
| `npm run update-readme` | Atualiza README principal automaticamente |
| `npm run cleanup` | Remove repositórios desnecessários |
| `npm run backup` | Cria backup dos projetos únicos |

## 🏗️ Estrutura do Projeto

```
/mnt/c/Users/frank/Repos/
├── README.md                 # Índice principal de todos os projetos
├── CLAUDE.md                 # Guia para Claude Code
├── package.json              # Configuração do portfolio manager
├── scripts/                  # Scripts de automação
│   ├── sync-repos.js        # Sincronização com GitHub
│   ├── check-status.js      # Verificação de status
│   ├── analyze-repos.js     # Análise detalhada
│   └── update-readme.js     # Atualização automática
├── .gitignore               # Ignora todos os repos individuais
└── [43 repositórios...]     # Todos os projetos individuais
```

## 📋 Categorias de Projetos

### 🏛️ Legal Tech (Alta Prioridade)
- **causaganha**: Plataforma de análise judicial distribuída
- **gabinete-automatico**: Automação PGE-RO com IA
- **pje-downloader**: Sistema de download TJRO
- **pje_identificador**: Extensão Chrome para PJe

### 🤖 AI/ML & Data Processing
- **hronir**: Protocolo literário inspirado em Borges
- **perquire**: Sistema de investigação estilo Akinator
- **textura**: Processamento e refinamento de texto
- **caixaaberta**: Pipeline de dados imobiliários

### 🌐 Web Development
- **astrowind**: Template Astro customizado
- **franklinbaldo**: Site pessoal
- **tembiu**: PWA para cardápio
- **fillme**: Aplicação Svelte

### ⚙️ Automation & Tools
- **manifold_football**: Automação de mercados esportivos
- **sites_prefeituras**: Análise de sites municipais
- **tambaqui**: Sistema de correção monetária
- **opencnpj**: ETL para dados CNPJ

## 🔧 Configuração e Uso

### Pré-requisitos
- Node.js >= 16.0.0
- GitHub CLI (`gh`) instalado e autenticado
- Git configurado

### Instalação
```bash
# Instalar dependências
npm install

# Verificar configuração
npm run check-status

# Primeira sincronização
npm run sync
```

### Fluxo de Trabalho Típico

1. **Verificar Status**: `npm start`
2. **Sincronizar**: `npm run sync`
3. **Analisar Mudanças**: `npm run analyze`
4. **Atualizar Documentação**: `npm run update-readme`

## 📊 Estatísticas Atuais

- **Total de Projetos**: 43
- **Repositórios GitHub Ativos**: 34
- **Projetos Únicos Locais**: 9
- **Tecnologias Principais**: Python (15), JavaScript (12), HTML/CSS (8)
- **Espaço Total**: ~15GB (após otimização de 55%)

## 🎯 Recursos do Sistema

### Sincronização Inteligente
- Clone automático de novos repositórios
- Detecção de mudanças locais
- Prevenção de conflitos de merge
- Relatórios detalhados de sincronização

### Análise de Status
- Verificação de mudanças não commitadas
- Detecção de repositórios ahead/behind
- Identificação de tecnologias por projeto
- Cálculo de tamanhos de repositório

### Gestão de Portfólio
- Categorização automática de projetos
- Rastreamento de status de desenvolvimento
- Identificação de projetos órfãos
- Backup de projetos únicos

## 🔄 Histórico de Limpeza

Este portfólio passou por uma grande reorganização em 2025:
- **Antes**: ~62 projetos (~22GB)
- **Depois**: 43 projetos (~15GB)
- **Economia**: 55% de redução de espaço
- **Descoberta**: 12 repositórios "perdidos" foram redescobertos

## 📝 Manutenção

### Rotina Diária
```bash
npm start  # Verificação rápida
```

### Rotina Semanal
```bash
npm run sync          # Sincronização completa
npm run analyze       # Análise detalhada
npm run update-readme # Atualização da documentação
```

### Rotina Mensal
```bash
npm run cleanup  # Limpeza de arquivos desnecessários
npm run backup   # Backup de projetos únicos
```

## 🤝 Contribuição

Este é um projeto pessoal de gestão de portfólio. Para sugerir melhorias:

1. Abra uma issue descrevendo a melhoria
2. Para bugs, inclua logs e contexto
3. Para novas features, descreva o caso de uso

## 📄 Licença

MIT - Este projeto é open source para que outros possam adaptar as ferramentas de gestão de portfólio para seus próprios projetos.

---

**Última atualização**: 2025-07-02 | **Versão**: 1.0.0