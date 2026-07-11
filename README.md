# Engineering Work Skills

This repository has three engineering skills that can work alone or together. It works with [skills.sh](https://skills.sh/) and the open [Agent Skills specification](https://agentskills.io/specification).

They give three ways to make doubt smaller in engineering work. Choose by where you must reason about correctness and prove it, not by work size or file count:

- `point` follows cause and effect: What is the smallest part that makes the result, and what check can show if this answer is right or wrong?
- `line` starts from one shared rule: What must be true across one technical domain, and where can parts move away from it?
- `plane` follows the full path: Can meaning and guarantees pass through every boundary and every old-and-new release state?

Use the smallest view that can set and prove correctness. Use the views together inside one process, not as repeated work. Plane sets the end result. Line keeps shared rules true. Point finds local causes.

## Structure

```text
.
|-- skills/
|   |-- point/
|   |   `-- SKILL.md
|   |-- line/
|   |   `-- SKILL.md
|   `-- plane/
|       `-- SKILL.md
|-- devenv.nix
|-- pyproject.toml
`-- skills.sh.json
```

## Validate

Install [Devenv](https://devenv.sh/getting-started/), then enter the development environment:

```bash
devenv shell
```

If you use direnv, approve the included `.envrc` once:

```bash
direnv allow
```

Run the official Agent Skills validation and GitHub Actions checks used by CI:

```bash
devenv test
```

Inside the development environment, run the checks directly with:

```bash
validate
```

List the skills found by the official CLI:

```bash
npx skills add . --list
```

## Install

After publishing the repository to GitHub, install all skills or one skill:

```bash
npx skills add nmnmcc/skills
npx skills add nmnmcc/skills --skill point
npx skills add nmnmcc/skills --skill line
npx skills add nmnmcc/skills --skill plane
```

## Writing rules

- Put each skill in `skills/<skill-name>/` with a `SKILL.md` file.
- Use lowercase letters, numbers, and single hyphens for `name`.
- Keep the directory name and skill name the same.
- Explain what the skill does and when to use it in `description`.
- Write direct instructions for the agent.
- Put long reference material in a skill's `references/` directory.
- Put stable, repeated operations in a skill's `scripts/` directory.
- Do not commit secrets, tokens, personal data, or untrusted programs.

## Release checks

- `devenv test` passes with the official `skills-ref` validator.
- `npx skills add . --list` finds all three skills.
- `skills.sh.json` is valid and lists real skill names.
- The install commands use the published repository name.

## License

[MIT](LICENSE)
