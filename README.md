# Projeto Next.js + Django + Postgres

Este repositório contém uma aplicação fullstack composta por um backend em Django (pasta `api`) e um frontend em Next.js (pasta `ui`). 

---

## Estrutura do Projeto

```
next-django-postgres/
│
├── api/   # Backend Django
└── ui/    # Frontend Next.js
```

---

## Backend (`api`)

O backend é construído com Django e está organizado em módulos:

- **custom_auth/**: Implementa autenticação customizada, incluindo views, serializers, permissões e casos de uso.
- **user/**: Gerenciamento de usuários, com views, serializers, modelos e casos de uso.
- **manage.py**: Script padrão do Django para gerenciamento do projeto.
- **requirements.txt**: Dependências do backend.
- **docker-compose.yaml**: Facilita a orquestração do ambiente do banco de dados com Docker.

### Principais arquivos e pastas

- `custom_auth/`
  - `authentication.py`: Lógica de autenticação customizada.
  - `permissions.py`: Permissões customizadas.
  - `serializers.py`, `views.py`, `use_cases.py`: Serialização, endpoints e lógica de negócio.
- `user/`
  - `models.py`: Modelos de usuário.
  - `serializers.py`, `views.py`, `use_cases.py`: Serialização, endpoints e lógica de negócio.

---

## Frontend (`ui`)

O frontend utiliza Next.js com TypeScript.

### Estrutura

- **src/app/**: Contém as páginas e componentes principais.
  - `page.tsx`: Página principal.
  - `layout.tsx`: Layout global.
  - `login/`: Página e layout de login.
  - `components/`: Componentes reutilizáveis (ex: `header.tsx`).
  - `hooks/`: Hooks customizados.
  - `globals.css`: Estilos globais.

### Configurações

- `package.json`, `tsconfig.json`: Configurações do projeto.
- `next.config.ts`: Configuração do Next.js.
- `eslint.config.mjs`, `postcss.config.mjs`: Lint e pós-processamento de CSS.

---

## Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose
- Node.js (recomendado: versão LTS)
- Python 3.10+

### Backend

```bash
cd api
docker-compose up
# ou, para rodar localmente:
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd ui
npm install
npm run dev
```
