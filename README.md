# ⚽ Futebol API - Backend

API REST completa para gestão de clube de futsal com autenticação JWT, Socket.io e IA para sorteio de times.

## 🚀 Deploy Rápido (100% GRÁTIS)

### 1. MongoDB Atlas (Banco de Dados)

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie cluster **M0 FREE** (512MB grátis)
3. Configure usuário e senha
4. Permita acesso de qualquer IP: `0.0.0.0/0`
5. Copie a connection string

### 2. Deploy no Render.com

1. Acesse: https://render.com
2. Login com GitHub
3. **New +** → **Web Service**
4. Conecte o repositório: `bfrpaulondev/futebol-backend`
5. Configure:
   - **Name**: `futebol-api`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free** ⚠️

6. **Variáveis de Ambiente** (Add Environment Variable):

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/futebol?retryWrites=true&w=majority
JWT_SECRET=seu_secret_super_secreto_aqui_minimo_32_caracteres
JWT_EXPIRE=7d
CORS_ORIGIN=https://seu-frontend.vercel.app
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

7. Clique em **Create Web Service**
8. Aguarde ~3-5 minutos para o deploy
9. Copie a URL: `https://futebol-api.onrender.com`

### 3. Popular o Banco de Dados

Via terminal do Render ou localmente:

```bash
npm run seed
```

### 4. Atualizar Frontend

No Vercel, atualize as variáveis:

```bash
VITE_API_BASE_URL=https://futebol-api.onrender.com/api
VITE_SOCKET_URL=https://futebol-api.onrender.com
```

E faça redeploy do frontend.

## 📡 Endpoints da API

### Auth
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Usuário logado

### Games
- `GET /api/games/next` - Próximo jogo
- `POST /api/games/:id/confirm` - Confirmar presença
- `POST /api/games/:id/cancel` - Cancelar presença
- `POST /api/games/:id/draw` - Sortear times com IA
- `PUT /api/games/:id/result` - Atualizar resultado

### Users
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `POST /api/users/avatar` - Upload avatar
- `GET /api/users/ranking` - Ranking de jogadores

### Finance
- `GET /api/finance/balance` - Saldo do clube
- `GET /api/finance/transactions` - Transações
- `POST /api/finance/transactions` - Nova transação
- `POST /api/finance/suggestions` - Nova sugestão
- `POST /api/finance/suggestions/:id/vote` - Votar em sugestão

### Chat
- `GET /api/chat/messages` - Mensagens
- `POST /api/chat/messages` - Enviar mensagem

## 🔌 Socket.io Events

### Client → Server
- `chat:send` - Enviar mensagem
- `game:confirm_presence` - Confirmar presença
- `game:cancel_presence` - Cancelar presença

### Server → Client
- `chat:message` - Nova mensagem
- `online_users` - Lista de usuários online
- `game:presence_updated` - Presença atualizada
- `game:teams_drawn` - Times sorteados

## 🛠️ Tech Stack

- **Node.js** + **Express** - Framework
- **MongoDB** + **Mongoose** - Database
- **Socket.io** - WebSocket real-time
- **JWT** + **Bcrypt** - Autenticação
- **Multer** - Upload de arquivos
- **Helmet** + **CORS** - Segurança

## 📝 Desenvolvimento Local

```bash
# Instalar dependências
cd api
npm install

# Configurar .env
cp .env.example .env
# Editar .env com suas configurações

# Popular banco (opcional)
npm run seed

# Iniciar servidor
npm run dev
```

## 🧪 Testar API

```bash
# Health check
curl https://futebol-api.onrender.com/health

# Registro
curl -X POST https://futebol-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'
```

## 📊 Credenciais de Teste (após seed)

```
Admin:
Email: admin@futebol.com
Password: admin123

Jogador:
Email: joao@futebol.com
Password: joao123
```

## 🐛 Troubleshooting

### API não inicia no Render
- Verifique os logs no Render Dashboard
- Certifique-se que `MONGODB_URI` está correto
- Verifique se todas as env vars estão configuradas

### CORS Error
- `CORS_ORIGIN` deve ter a URL completa do frontend
- Exemplo: `https://futebol-list.vercel.app`

### Socket.io não conecta
- Render suporta WebSocket no plano Free
- URL deve ser: `https://futebol-api.onrender.com`

### API "dorme" (plano free)
- Render Free dorme após 15min de inatividade
- Primeira requisição demora ~30s
- Use cron-job.org para manter ativa (opcional)

## 📚 Documentação Completa

- `DEPLOY_GRATIS.md` - Guia detalhado de deploy
- `API_SUMMARY.md` - Resumo completo da API
- `api/README.md` - Documentação técnica

## 🔗 Links

- **Frontend**: https://github.com/bfrpaulondev/Futebol-List
- **Backend**: https://github.com/bfrpaulondev/futebol-backend
- **Render**: https://render.com
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

---

**Custo Total**: R$ 0,00/mês 🎉

**API pronta para produção com autenticação, real-time e IA!** ⚽🔥
