# recruitZaa Frontend Development Guidelines

Welcome to the recruitZaa frontend repository. To maintain high code quality and consistency across our React Native (mobile) and Next.js (web) projects, all developers must adhere to the following rules and guidelines.

---

## 1. Git Workflow & Branching Strategy

We use a structured branch naming strategy to keep git history organized.

### Branch Naming Conventions

- **Features:** `feature/fe-<short-description>` (e.g., `feature/fe-login-screen`)
- **Bug Fixes:** `bugfix/fe-<short-description>` (e.g., `bugfix/fe-otp-timer-reset`)
- **Hotfixes:** `hotfix/fe-<short-description>` (e.g., `hotfix/fe-auth-crash`)
- **Chore/Docs:** `chore/fe-<short-description>` or `docs/fe-<short-description>`

---

## 2. Commit Message Rules (Conventional Commits)

Commit messages must follow the **Conventional Commits** specification. The commit format is:
`type(scope): description`

### Allowed Types:

- `feat`: A new feature (e.g., `feat(auth): add OTP verification page`)
- `fix`: A bug fix (e.g., `fix(home): resolve recommended jobs overlap`)
- `docs`: Documentation changes only (e.g., `docs(readme): add setup guidelines`)
- `style`: Styling changes that do not affect logic (e.g., `style: fix tab margin`)
- `refactor`: Code changes that neither fix a bug nor add a feature (e.g., `refactor(profile): modularize fields`)
- `test`: Adding or correcting tests (e.g., `test: add login validation tests`)
- `chore`: Updating build tasks, dependencies, etc. (e.g., `chore: update react native packages`)

> **Note:** Violating commit formats will trigger a pre-commit block via `commitlint` and reject the commit.

---

## 3. Naming Conventions

To keep code clean and self-documenting:

- **Components / Screens:** Use `PascalCase` for React components and screens (e.g., `JobDetailsCard.tsx`, `HomeScreen.tsx`).
- **Functions & Variables:** Use `camelCase` (e.g., `fetchMatchedJobs`, `isValidEmail`).
- **Constants:** Use `UPPER_CASE` with snake_case separators (e.g., `DEFAULT_PAGE_LIMIT`, `API_RETRY_COUNT`).
- **Directories:** Use `kebab-case` for folders (e.g., `components`, `navigation-flows`, `auth-module`).

---

## 4. Linting & Formatting (Checkstyle)

We use **ESLint** and **Prettier** to enforce formatting rules.

- Code formatting is automatically run on staged files before every commit (`lint-staged` + `prettier`).
- Do not bypass lint checks using `--no-verify` unless in an absolute emergency.

To run checks manually:

```bash
npm run lint    # Run linter checks
npm run format  # Format all files
```
