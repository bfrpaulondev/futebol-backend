# 🚀 Deploy da API - Guia Passo a Passo

## 📋 Checklist de Deploy

### ✅ Antes de começar
- [x] Repositório limpo (apenas API)
- [x] Push feito para GitHub
- [x] Dependências instaladas
- [x] Estrutura organizada

### 🗄️ PASSO 1: Criar MongoDB Atlas (5 min)

1. **Criar conta**
   ```
   🔗 https://www.mongodb.com/cloud/atlas/register
   ```
   - Use Google ou GitHub para login rápido
   - 100% GRÁTIS

2. **Criar cluster M0 (FREE)**
   - Build a Database → M0 FREE
   - Provider: AWS
   - Region: São Paulo (ou mais próxima)
   - Nome: `futebol-cluster`
   - Create

3. **Configurar acesso**
   - **Database Access**:
     - Username: `admin`
     - Password: Clique em "Autogenerate" e **COPIE**
     - Database User Privileges: `Atlas admin`
     - Add User

   - **Network Access**:
     - IP Address: `0.0.0.0/0` (permitir todos)
     - Comment: `Allow all IPs`
     - Add IP Address

4. **Pegar connection string**
   - Volte para Database
   - Clique "Connect" no seu cluster
   - Escolha "Drivers"
   - Copie a string:
   ```
   mongodb+srv://admin:<password>@futebol-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **SUBSTITUA `<password>`** pela senha que você copiou
   - Adicione o nome do banco: `.../futebol?retryWrites=...`
   - **GUARDE essa string!**

### 🌐 PASSO 2: Deploy no Render.com (5 min)

1. **Criar conta**
   ```
   🔗 https://render.com
   ```
   - Get Started → Sign in with GitHub
   - Autorize o Render

2. **Criar Web Service**
   - Dashboard → **New +**
   - **Web Service**
   - Build and deploy from a Git repository → Next
   - Procure: `bfrpaulondev/futebol-backend`
   - **Connect**

3. **Configurar serviço**
   
   **Basic Info:**
   ```
   Name: futebol-api
   Region: Oregon (US West)
   Branch: main
   ```

   **Build Settings:**
   ```
   Root Directory: api
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

   **Instance Type:**
   ```
   ⚠️ IMPORTANTE: Selecione FREE
   ```

4. **Variáveis de Ambiente**
   
   Clique em "Add Environment Variable" e adicione:

   ```bash
   # Environment
   NODE_ENV=production
   PORT=5000

   # MongoDB (cole sua string aqui)
   MONGODB_URI=mongodb+srv://admin:SUA_SENHA@futebol-cluster.xxxxx.mongodb.net/futebol?retryWrites=true&w=majority

   # JWT (gere um secret forte)
   JWT_SECRET=e210af7dd8f645d49fc38f92606f17d9317fff4890b72f11b969209840da8dfb
   JWT_EXPIRE=7d

   # CORS (URL do seu frontend na Vercel)
   CORS_ORIGIN=https://futebol-list.vercel.app

   # File Upload
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ```

5. **Deploy!**
   - Clique em **Create Web Service**
   - Aguarde ~3-5 minutos
   - Quando aparecer "Live", copie a URL:
   ```
   https://futebol-api.onrender.com
   ```

### 🌱 PASSO 3: Popular Banco de Dados (2 min)

**Opção 1: Via Shell do Render** (recomendado)

1. No Render Dashboard, vá para seu serviço
2. Clique na aba **Shell** (canto superior direito)
3. Execute:
   ```bash
   npm run seed
   ```
4. Aguarde a mensagem de sucesso

**Opção 2: Criar primeiro usuário manualmente**

1. Abra o frontend (após configurar)
2. Clique em "Registrar"
3. Crie sua conta
4. Pronto! Você é o admin

### ▲ PASSO 4: Atualizar Frontend na Vercel (2 min)

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto `Futebol-List`
3. Settings → Environment Variables
4. **Edit** ou **Add** as variáveis:

   ```bash
   VITE_API_BASE_URL=https://futebol-api.onrender.com/api
   VITE_SOCKET_URL=https://futebol-api.onrender.com
   VITE_APP_NAME=Futebol App
   VITE_MAX_PLAYERS=12
   ```

5. Clique em **Save**
6. Vá para **Deployments**
7. Clique nos 3 pontinhos do último deploy
8. **Redeploy**
9. Aguarde ~2 minutos

### 🧪 PASSO 5: Testar Tudo (2 min)

1. **Testar API**
   ```bash
   curl https://futebol-api.onrender.com/health
   ```
   Deve retornar: `{"status":"ok","timestamp":"..."}`

2. **Testar Frontend**
   - Abra: https://futebol-list.vercel.app
   - Faça login com:
     - Email: `admin@futebol.com`
     - Senha: `admin123`
   - Ou registre uma nova conta

3. **Testar Chat (Socket.io)**
   - Entre no Chat
   - Envie uma mensagem
   - Deve aparecer em tempo real

4. **Testar Jogo**
   - Confirme presença no próximo jogo
   - Verifique se aparece na lista

## ✅ Deploy Completo!

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║     ⚽ DEPLOY CONCLUÍDO COM SUCESSO! ⚽                 ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

🗄️  MongoDB Atlas      ✅ Cluster M0 (512MB) - GRÁTIS
🌐 Render.com         ✅ API rodando - GRÁTIS
▲  Vercel             ✅ Frontend no ar - GRÁTIS

═══════════════════════════════════════════════════════════

🔗 URLs DO SEU SISTEMA

Frontend:  https://futebol-list.vercel.app
Backend:   https://futebol-api.onrender.com
API Docs:  https://futebol-api.onrender.com/health

═══════════════════════════════════════════════════════════

💰 CUSTO MENSAL: R$ 0,00

⚠️  ATENÇÃO - Plano Free do Render:
    - API "dorme" após 15min de inatividade
    - Primeira requisição pode demorar ~30s
    - Para manter ativa 24/7:
      → Use cron-job.org (grátis)
      → Ping a cada 10min: https://futebol-api.onrender.com/health

═══════════════════════════════════════════════════════════
```

## 🐛 Troubleshooting

### API não inicia no Render

**Problema**: Deploy falha ou fica em "Build failed"

**Soluções**:
1. Verifique os **Logs** no Render Dashboard
2. Confirme que `Root Directory` está como `api`
3. Verifique se `MONGODB_URI` está correta
4. Teste a connection string no MongoDB Compass

### CORS Error no Frontend

**Problema**: `Access to fetch has been blocked by CORS`

**Soluções**:
1. No Render, verifique `CORS_ORIGIN`
2. Deve ser exatamente: `https://futebol-list.vercel.app`
3. Sem barra `/` no final
4. Redeploy após alterar

### Socket.io não conecta

**Problema**: Chat não funciona, mensagens não aparecem

**Soluções**:
1. Verifique `VITE_SOCKET_URL` no Vercel
2. Deve ser: `https://futebol-api.onrender.com` (sem `/api`)
3. Render suporta WebSocket no Free
4. Redeploy do frontend após alterar

### MongoDB Connection Error

**Problema**: `MongoNetworkError` ou `Authentication failed`

**Soluções**:
1. Verifique a senha na connection string
2. Confirme que IP `0.0.0.0/0` está permitido
3. Teste a string no MongoDB Compass localmente
4. Certifique-se que o usuário tem permissão `Atlas admin`

### API muito lenta (primeira requisição)

**Problema**: Demora ~30s para responder

**Solução**:
- Isso é normal no plano Free do Render
- A API "dorme" após 15min sem uso
- Use cron-job.org para manter ativa:
  1. Acesse: https://cron-job.org
  2. Crie conta grátis
  3. New Cronjob:
     - URL: `https://futebol-api.onrender.com/health`
     - Interval: Every 10 minutes
  4. Save

## 🎉 Pronto!

Seu sistema está 100% no ar e funcionando!

**Qualquer problema, consulte:**
- `DEPLOY_GRATIS.md` - Guia detalhado
- `API_SUMMARY.md` - Documentação completa da API
- `api/README.md` - Docs técnicas

---

**Desenvolvido com ⚽ para gestão de clubes de futsal**
