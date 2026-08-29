# Local Agent Rules & Project Directives

## Component Line Count Limit & Refactoring
- **Maximum 205 Lines of Code (LOC) per File**: If a component or file reaches or exceeds 205 LOC, you CANNOT add anything directly to it. You MUST refactor it into smaller sub-components or helpers using dedicated sub-folders (e.g. `components/`, `dialogs/`, `subcomponents/`, `menu/`) before adding new functionality.

## Verification & Commands Constraint
- **NEVER run `bun run lint`, `eslint`, or any linting commands.**
- **NEVER run `tsc --noEmit`, `bunx tsc --noEmit`, or TypeScript compiler checks.**
- **NEVER run `bun run build`, `npm run build`, or any build commands.**
- Package manager: Use **Bun exclusively** (`bun`, `bunx`).
