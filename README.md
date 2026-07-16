# Agent Work Skills

This repository has seven skills for AI agents. It works with [skills.sh](https://skills.sh/) and the open [Agent Skills specification](https://agentskills.io/specification).

## Skills

### Default action

- `just-do-it` turns clear intent into joyful, responsible action. Use it in any scenario and at every stage to keep work moving toward a finished result.

### Product experience

- `ux` begins with one simple act: imagine that you are the user. It follows the whole journey and improves everything the user can notice, use, wait for, or live with, while taking out parts that do not help.

### Engineering views

Choose the smallest view that can set and prove correctness. Choose by where you must reason, not by work size or file count:

- `point` follows cause and effect: What is the smallest part that makes the result, and what check can show whether the answer is right or wrong?
- `line` starts from one shared rule: What must be true across one technical domain, and where can parts move away from it?
- `plane` follows the full path: Can meaning and guarantees pass through every boundary and every old-and-new release state?

Use `just-do-it` as the default working mindset and add the relevant engineering view when needed. Use the views together inside one process, not as repeated work: plane sets the end result, line keeps shared rules true, and point finds local causes.

### Engineering domains

- `simplicity` is a basic part of healthy software judgment. It keeps developers close to the real problem, honest about hard parts, and able to spend complexity only where it buys enough strength for the whole system.
- `typesafe` builds type safety into each TypeScript change. It keeps meaning, runtime value, static type, data form, proof, and allowed operations in agreement. It then keeps each type guarantee safe from its source to its final use.

Use an engineering domain skill with `just-do-it` and the needed engineering view. The domain skill gives the specialized rules. `point`, `line`, or `plane` gives the shape of the work.

## Structure

```text
.
|-- skills/
|   |-- just-do-it/
|   |-- ux/
|   |-- point/
|   |-- line/
|   |-- plane/
|   |-- simplicity/
|   `-- typesafe/
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
npx skills add nmnmcc/skills --skill ux
npx skills add nmnmcc/skills --skill point
npx skills add nmnmcc/skills --skill line
npx skills add nmnmcc/skills --skill plane
npx skills add nmnmcc/skills --skill simplicity
npx skills add nmnmcc/skills --skill typesafe
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
- Use [Basic English](https://en.wikipedia.org/wiki/Basic_English) as far as it stays clear. Prefer short, common words and simple grammar. Keep needed technical terms and explain them with simple words.
- Put long reference material in a skill's `references/` directory.
- Put stable, repeated operations in a skill's `scripts/` directory.
- Do not commit secrets, tokens, personal data, or untrusted programs.

## Release checks

- `devenv test` passes with the official `skills-ref` validator.
- `npx skills add . --list` finds all seven skills.
- `skills.sh.json` is valid and lists all seven skill names once.
- The install commands use the published repository name.

## License

[MIT](LICENSE)
