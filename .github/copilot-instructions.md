## Repo context — quick orientation

- This is an Nx monorepo (see `nx.json`) containing multiple apps under `apps/`:
  - Backend service: [apps/backend/snapboard-files-service](apps/backend/snapboard-files-service/README.md) — Express + Prisma file service.
  - Frontend MFEs: [apps/frontend/snapboard](apps/frontend/snapboard/README.md) and [apps/frontend/portal](apps/frontend/portal/README.md) — Angular apps using Angular Material and Module Federation.

## How to run & build (project-specific)

- Primary package manager: `yarn` (root `package.json` sets `packageManager: "yarn@1.22.22"`).
- Common scripts (root `package.json`):
  - `yarn start` -> `nx serve my-portal` (portal host)
  - `yarn snapboard` -> `nx serve snapboard` (dev serve snapboard MFE)
  - `yarn files-service` -> `npx nx serve snapboard-files-service` (backend files service)
  - `yarn build` -> `nx build my-portal`
  - `yarn test` -> runs Jest for `my-portal` (projects have their own `jest.config.ts`).
  - `yarn generate-prisma-client` -> `npx prisma generate` (generate Prisma client from schema)

When changing database models, update `apps/backend/snapboard-files-service/prisma/schema.prisma`, then run `yarn generate-prisma-client` and create/apply migrations under `apps/backend/snapboard-files-service/prisma/migrations/`.

## Important code locations & patterns

- Backend (files service):

  - Controllers and routes: [apps/backend/snapboard-files-service/src/controllers.ts](apps/backend/snapboard-files-service/src/controllers.ts)
  - App entry: [apps/backend/snapboard-files-service/src/main.ts](apps/backend/snapboard-files-service/src/main.ts)
  - Prisma schema: [apps/backend/snapboard-files-service/prisma/schema.prisma](apps/backend/snapboard-files-service/prisma/schema.prisma)
  - Generated Prisma client: [apps/backend/snapboard-files-service/generated/prisma](apps/backend/snapboard-files-service/generated/prisma) — do NOT edit generated files.
  - Storage config: [apps/backend/snapboard-files-service/src/storage.config.ts](apps/backend/snapboard-files-service/src/storage.config.ts)

- Frontend MFEs:
  - Snapboard MFE sources: [apps/frontend/snapboard/src/app](apps/frontend/snapboard/src/app)
  - Templates often live as plain `.html` files under page folders (e.g. [apps/frontend/snapboard/src/app/pages/dropzone.html](apps/frontend/snapboard/src/app/pages/dropzone.html)).
  - UI library: Angular Material (`mat-card`, `mat-icon`) and `@angular/cdk` (drag `cdkDrag`).
  - The `snapboard` MFE README documents intended usage and that it’s a UI-only micro-frontend which expects a host-provided upload handler.

## Project-specific conventions agents must follow

- Preserve generated/compiled outputs: do not modify anything under `generated/` (Prisma client live here).
- Templates: HTML pages in `apps/frontend/*/src/app/pages` use concise template idioms (see `dropzone.html` for examples: `mat-card`, `cdkDrag`, and inline template conditionals/loops). When editing templates, keep event bindings (e.g. `(click)="copyToClipboard(shareableLink)"`) and unique element IDs (constructed like `pasted-image-${$index}`) intact.
- Module federation: treat `apps/frontend/*` as MFEs — avoid bundling host-specific runtime assumptions into the MFE components.

## Testing & linting

- Each project contains `jest.config.ts` and `tsconfig.*.json`; use `nx test <project>` or root `yarn test` for the host project. Use `nx lint <project>` or `yarn lint` for linting.

## When touching infra / DB

- Use the Prisma schema under `apps/backend/snapboard-files-service/prisma/`. After schema changes:
  - Add migration files under `prisma/migrations/` (Nx repo keeps migrations alongside service).
  - Run `yarn generate-prisma-client` to refresh the generated client.

## Integration points & external deps

- Storage and upload: the frontend MFE does not store files — it expects an upload API. The backend service in `snapboard-files-service` is an example implementation (uses `multer`, `sharp`, `pg`, and `@prisma/client`).
- Watch for `sharp` usage (native dependency) in CI and local dev — ensure build environment has necessary build tools when installing.

## Safe edits and guidelines for AI agents

- Avoid changing generated code under `generated/` and avoid editing migrations unless explicitly instructed.
- Prefer small, targeted changes consistent with existing style (TypeScript + Angular patterns, single-responsibility controllers for the backend).
- Reference and preserve package scripts in `package.json` when suggesting run commands.
- If proposing new dependencies, check root `devDependencies` first and prefer existing helpers (Nx plugins) over introducing new build tooling.

---

If anything here is unclear or you'd like additional detail (CI steps, local DB setup, or module-federation config), tell me which area to expand.
