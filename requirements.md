# Test Task: "GitHub Repository Explorer"

## Goal
Build a small app in Next.js 15+ (App Router) that allows users to search for GitHub repositories and view basic information about them — using server components where appropriate.

## What It Tests
- Understanding of Next.js App Router (server components, route structure, layouts)
- Use of server vs. client components correctly
- Data fetching with fetch() in server components
- Props passing between server and client components
- Conditional rendering and UI composition
- Minimal styling (Tailwind)

## Requirements

### 1. Page Structure
- `/` - Search page with a simple form to input a GitHub username
- `/[username]` - List that shows the public repositories for that GitHub user

### 2. Server Components
- The `/[username]/page.tsx` must be a server component that fetches data from the GitHub API:
  ```
  https://api.github.com/users/{username}/repos
  ```
- The fetched data should be rendered server-side and passed down to any child client components if necessary
- At least one component/section should use lazy-loading (server component, not client component)

### 3. Client Components
- The search form (on `/`) should be a client component, using React hooks to handle input and navigation
- Optionally include sorting/filtering on the repo list (by stars, updated date, etc.) using a client component

### 4. UI
Each repository card should show:
- Repository name
- Description
- Star count
- Last updated date
- Clicking on a repo should open it on GitHub in a new tab

### 5. Error and Empty States
- Handle non-existent usernames or users with no repos
- Display a simple "User not found" or "No repositories available" message

### 6. Bonus (Optional)
- Add a `/api/repos/[username]` route that fetches and returns repos (serverless function)
- Cache GitHub API responses using Next.js revalidate options

## Deliverables
- GitHub repository (or zip file) containing:
  - Working Next.js app
  - Clear instructions to run the project (README.md)

## Expected Time
2–4 hours

## Notes
- No need to focus too much on the design; you can use any Tailwind.css UI library you want
- Focus more on the code structure and performance optimization