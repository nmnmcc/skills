# Agent Work Skills

This repository has eleven skills for AI agents. It works with [skills.sh](https://skills.sh/) and the open [Agent Skills specification](https://agentskills.io/specification).

## Skills

### Default study

- `study` starts with one working attitude: study deeply before anything. It learns the real object, context, evidence, alternatives, and risks before answering or acting, then keeps learning from the result.

### Default action

- `just-do-it` turns clear intent into joyful, responsible action. Use it in any scenario and at every stage to keep work moving toward a finished result.

Use them as one loop: study deeply enough to earn the next move, act when it is clear and safe enough, and study what the result teaches.

### Product experience

- `ux` begins with one simple act: imagine that you are the user. It follows the whole journey and improves everything the user can notice, use, wait for, or live with, while taking out parts that do not help.

### Developer experience

- `dx` treats developers as users. It reads a project as a person does, from purpose and system map through a real path to local code, then makes meaning easy to see, intended changes easy to make, and results easy to trust.

### Engineering views

Choose the smallest view that can set and prove correctness. Choose by where you must reason, not by work size or file count:

- `point` follows cause and effect: What is the smallest part that makes the result, and what check can show whether the answer is right or wrong?
- `line` starts from one shared rule: What must be true across one technical domain, and where can parts move away from it?
- `plane` follows the full path: Can meaning and guarantees pass through every boundary and every old-and-new release state?

Use `study` first to learn the real system and choose the relevant engineering view. Use `just-do-it` to keep the work moving. Use the views together inside one process, not as repeated work: plane sets the end result, line keeps shared rules true, and point finds local causes.

### Engineering domains

- `simplicity` is a basic part of healthy software judgment. It keeps developers close to the real problem, honest about hard parts, and able to spend complexity only where it buys enough strength for the whole system.
- `typesafe` keeps meaning, runtime value, type or contract, data form, proof, and allowed operations in agreement. It matches every guarantee to the checks that support it, then keeps that guarantee safe from its source to its final use.
- `effect` makes observable work, dependencies, failures, resources, and execution boundaries explicit. It keeps supported work inside the project's effect system and requires explicit user approval before an unavoidable non-effectful escape hatch.
- `testing` proves every rule it can, then writes clear tests for important risk where proof ends. A test fills a gap in proof; it does not take the place of proof.

Use an engineering domain skill with `study`, `just-do-it`, and the needed engineering view. Study learns the real situation, the domain skill gives the specialized rules, and `point`, `line`, or `plane` gives the shape of the work.

## Structure

```text
.
|-- skills/
|   |-- study/
|   |-- just-do-it/
|   |-- ux/
|   |-- dx/
|   |-- point/
|   |-- line/
|   |-- plane/
|   |-- simplicity/
|   |-- typesafe/
|   |-- effect/
|   `-- testing/
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
npx skills add nmnmcc/skills --skill study
npx skills add nmnmcc/skills --skill just-do-it
npx skills add nmnmcc/skills --skill ux
npx skills add nmnmcc/skills --skill dx
npx skills add nmnmcc/skills --skill point
npx skills add nmnmcc/skills --skill line
npx skills add nmnmcc/skills --skill plane
npx skills add nmnmcc/skills --skill simplicity
npx skills add nmnmcc/skills --skill typesafe
npx skills add nmnmcc/skills --skill effect
npx skills add nmnmcc/skills --skill testing
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
- `npx skills add . --list` finds all eleven skills.
- `skills.sh.json` is valid and lists all eleven skill names once.
- The install commands use the published repository name.

## License

[MIT](LICENSE)
