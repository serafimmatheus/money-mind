# 💸 Money Mind

**Money Mind** é uma aplicação simples e poderosa para **gerenciamento financeiro pessoal**, focada em controle de gastos, investimentos e geração de relatórios inteligentes. 🚀

![Money Mind Banner](https://via.placeholder.com/1200x400.png?text=Money+Mind)

## 🧩 Funcionalidades

- 📈 **Dashboard interativa** com:
  - Gráfico **PIE** de distribuição de despesas
  - Últimas transações
  - Saldo atual
  - Investimentos e despesas detalhados
- 🔐 **Autenticação segura** integrada com **Clerk**
- 🤖 **Relatórios inteligentes** utilizando **ChatGPT** (apenas para planos PRO)
- 💳 **Pagamentos via Stripe** para upgrade de plano

## 🚀 Plano PRO

- ✅ Sem limites de transações
- ✅ Acesso completo aos relatórios gerados por IA
- ✅ Análise financeira avançada

**Limitações para usuários FREE:**

- 🚫 Máximo de **10 transações por mês**
- 🚫 Sem acesso aos relatórios de IA

## 📊 Relatórios com IA

Usuários PRO podem gerar relatórios personalizados com base nas transações, utilizando o poder do **ChatGPT**. Estes relatórios oferecem insights valiosos sobre seus hábitos financeiros e sugerem formas de otimizar seus gastos.

## 📦 Tecnologias

- **Next.js 14**
- **TypeScript**
- **Prisma ORM**
- **Clerk** (autenticação)
- **ChatGPT** (relatórios)
- **Stripe** (pagamentos)
- **TailwindCSS** (estilização)

## 🔧 Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/money-mind.git
   ```

2. Instale as dependências:

   ```bash
   cd money-mind
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env`:

   ```plaintext
   # BANCO
   DATABASE_URL=postgresql://...

   # CLERK
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...

   # APP
   NEXT_PUBLIC_APP_URL="..."

   # Stripe
   STRIPE_PREMIUM_PLAN_PRICE_ID="..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
   STRIPE_SECRET_KEY="..."
   STRIPE_WEBHOOK_SECRET="..."
   NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL="..."
   ```

4. Rode o servidor localmente:

   ```bash
   npm run dev
   ```

5. Acesse o projeto em:
   ```
   http://localhost:3000
   ```

## 📚 Contribuindo

Quer contribuir? Sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**!

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha nova funcionalidade'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um **Pull Request**

## 📄 Tags

![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![Clerk](https://img.shields.io/badge/Clerk-Auth-green)
![ChatGPT](https://img.shields.io/badge/ChatGPT-AI-orange)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple)

## 📝 Licença

Este projeto está sob a licença **MIT**. Sinta-se livre para usá-lo, modificá-lo e distribuí-lo.

---

Desenvolvido com ❤️ por [Matheus Serafim](https://github.com/serafimmatheus)
