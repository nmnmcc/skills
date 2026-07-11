# Agent Work Skills

This repository has four skills for AI agents. It works with [skills.sh](https://skills.sh/) and the open [Agent Skills specification](https://agentskills.io/specification).

## Skills

### Default action

- `just-do-it` turns clear intent into joyful, responsible action. Use it in any scenario and at every stage to keep work moving toward a finished result.

### Engineering views

Choose the smallest view that can set and prove correctness. Choose by where you must reason, not by work size or file count:

- `point` follows cause and effect: What is the smallest part that makes the result, and what check can show whether the answer is right or wrong?
- `line` starts from one shared rule: What must be true across one technical domain, and where can parts move away from it?
- `plane` follows the full path: Can meaning and guarantees pass through every boundary and every old-and-new release state?

Use `just-do-it` as the default working mindset and add the relevant engineering view when needed. Use the views together inside one process, not as repeated work: plane sets the end result, line keeps shared rules true, and point finds local causes.

## Structure

```text
.
|-- skills/
|   |-- just-do-it/
|   |-- point/
|   |-- line/
|   `-- plane/
|-- devenv.nix
|-- pyproject.toml
`-- skills.sh.json
```

Each skill directory contains its instructions in `SKILL.md` and UI metadata in `agents/openai.yaml`.

## Install

Install every skill:

```bash
npx skills add nmnmcc/skills
```

Install one skill:

```bash
npx skills add nmnmcc/skills --skill just-do-it
npx skills add nmnmcc/skills --skill point
npx skills add nmnmcc/skills --skill line
npx skills add nmnmcc/skills --skill plane
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

Run the same validation used by CI:

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
- `npx skills add . --list` finds all four skills.
- `skills.sh.json` is valid and lists all four skill names once.
- The install commands use the published repository name.

## License

[MIT](LICENSE)
