# Engineering Work Skills

This repository contains three composable engineering skills. It works with [skills.sh](https://skills.sh/) and the open [Agent Skills specification](https://agentskills.io/specification).

- `point` completes one small, focused change.
- `line` keeps broad changes consistent within one technical domain.
- `plane` delivers one complete outcome across technical domains.

The skills can be used alone or together.

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
