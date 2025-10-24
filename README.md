# GitHub Explorer

A modern web application for discovering and exploring public repositories from any GitHub user. Search by username to view repositories with advanced filtering, sorting, and pagination features.

**Built with:** Next.js 15, React 19, TypeScript, Tailwind CSS, and shadcn/ui

## Live Demo

You can find the deployed version at: **[Add your deployment URL here]**

_(Deploy to Vercel or Netlify and add the link)_


## Get Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended), npm, or yarn

### Installation & Running Locally

1. **Clone the repository:**
```bash
git clone <repository-url>
cd github-explorer
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **(Optional) Add GitHub token** to increase API rate limits:

Create a `.env.local` file:
```env
GITHUB_TOKEN=your_personal_access_token_here
```

> **Note:** Without a token, you're limited to 60 requests/hour. With authentication: 5,000 requests/hour.

4. **Run the development server:**
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## Linting

This project uses ESLint, Prettier, and TypeScript for code quality.

### Available Commands

- **`pnpm lint`** - Runs ESLint to check for code issues
- **`pnpm format`** - Automatically formats code with Prettier
- **`pnpm build`** - Builds the project and checks for TypeScript errors
