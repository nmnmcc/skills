---
name: pattern
description: Distill, teach, reuse, and maintain project-specific software patterns in a repository-root patterns/ catalog. A pattern is a teachable relation among a recurring situation, its tensions, an adaptable response, its consequences, and its limits. Use when understanding, designing, writing, changing, reviewing, testing, or releasing software; applying an established project pattern; turning concrete project experience into a candidate pattern hypothesis; testing transfer to another case; merging or splitting related lessons; or retiring stale guidance. Do not treat repeated code, a rule, recipe, decision, abstraction, example, or failure as a pattern by itself.
---

# Pattern

## Teach what can live beyond one case

Hold one working attitude: TEACH WHAT CAN LIVE BEYOND ONE CASE.

Turn what real project work reveals into a lesson that another person or agent can carry into a new case. Teach enough for the reader to recognize the situation, adapt the response, expect its effects, and stop where the lesson no longer fits.

Define a pattern as one teachable relation with five parts:

- **Situation:** the recurring context in which the lesson may apply.
- **Tensions:** the needs, limits, and forces that make a simple answer incomplete.
- **Response:** an adaptable form of action that works with those tensions.
- **Consequences:** what the response enables, costs, risks, or changes.
- **Boundary:** the conditions under which the relation changes or stops applying.

The pattern is this relation, not its name, document, example, or present code. One pattern may have different implementations when the same tensions need the same response. Similar code may express different patterns when its situations or tensions differ.

Cover any project engineering area when useful: code, architecture, data, tests, operations, or development work. Keep the lesson specific to the project. Do not turn the catalog into a book of general software knowledge.

Let current requirements, supported outside contracts, project settings, and direct evidence override a pattern. Teach a pattern as a useful project model, never as truth that reality must obey.

## Know what is not a pattern

Do not call an item a pattern merely because it is useful or repeated:

- Repeated code or a common shape is an observation until the same relation is known.
- A rule, policy, or decision gives direction but is not a pattern unless it teaches all five parts for repeated cases.
- A recipe or checklist gives steps but is not a pattern when the reader cannot adapt it from the tensions.
- An abstraction, type, module, or tool may carry a pattern but is not the pattern itself.
- An example, bug, failure, or lesson learned may support a pattern but is not one alone.
- A one-time choice has no transfer to teach.
- A general best practice with no special project meaning belongs outside the project catalog.

Do not create a standalone anti-pattern entry. When a tempting bad response helps teach a positive pattern, include it only as a contrast inside that pattern. Explain what makes it tempting, how it fails under the stated tensions, and how the positive response handles them. Treat this contrast as a by-product of teaching the positive pattern, not as a separate lesson to collect.

## Earn the right to teach

Keep these states distinct:

- An **observed case** is what the project directly does or has experienced.
- A **candidate** is a pattern hypothesis inferred from at least one real case.
- An **established pattern** is a complete, teachable relation with fitting project support.
- A **retired pattern** is a lesson kept only to understand old work or move to a replacement.

Create a candidate only when every part of the relation can be stated honestly, at least one concrete project source supports it, and another real case is likely. Keep observation, inference, assumption, missing support, and counterevidence clear in the prose. Do not make a candidate sound established.

Promote a candidate to `established` when either condition holds:

- an authoritative project rule or explicit user decision itself defines the recurring situation, tensions, response, consequences, and boundary; or
- at least two independent, successful uses exist in the repository and the relevant checks pass.

Treat uses as independent only when one is not generated, copied, or derived from the other. Match each check to the claim it supports. Do not promote a candidate because its prose is polished, because no one objected, or because the file says it is established.

Before teaching an established pattern, make sure a person or agent without the author's private context can:

1. recognize a new situation in which it applies;
2. explain the important tensions and why the response fits them;
3. adapt the response without copying one implementation;
4. predict the main consequences and trade-offs; and
5. name a counterexample or boundary where it should not be used.

If this transfer test fails, repair the lesson or keep it as a candidate.

## Begin with real cases

Inspect the closest project evidence before writing a pattern: requirements, code, tests, settings, operating behavior, failures, and recorded decisions. Use memory and familiar names to search, not to fill the catalog.

Compare cases before claiming that they share a pattern. Look for different causes that produce the same surface form, different responses that satisfy the same tensions, negative cases, and changes in scope or time that break the relation.

Try to refute the pattern hypothesis. Apply it to another case and predict what should happen. Find the strongest competing explanation and the nearest boundary. Let a mismatch change the situation, tensions, response, consequences, scope, status, or existence of the pattern.

Do not build a whole-project pattern baseline unless the user asks for one. Do not delay requested work to teach a weak or marginal idea.

## Find and read the catalog

Put the catalog in `patterns/` at the root of the repository that owns the in-scope files. In a monorepo, use the repository root rather than making a catalog for each component.

When there is no version-control root, use the one project or workspace root established by its manifest and tools. If the root is still unclear, do not create a catalog. Report the proposed location and the ambiguity.

Inspect an existing `patterns/` directory before changing it. Do not take over a directory owned by another tool or used for another kind of file. Preserve a clear project-owned catalog format when it already carries the same meanings. Report a real format collision instead of overwriting it.

Do not create an empty `patterns/` directory. Create it only when the work has found at least one qualified candidate.

Before making an in-scope choice:

1. Read `patterns/README.md` when it exists.
2. Select entries by their summary and scope, then read every relevant entry in full.
3. Check each entry against the current requirement, code, settings, dependency version, and nearby tests or operating facts.
4. Use an applicable `established` pattern as the project default.
5. Use a `candidate` as a hypothesis to test, not as a rule to follow.
6. Do not use a `retired` pattern except to understand old code or move to its replacement.

When an established pattern no longer fits, follow the current authority and repair the catalog. Do not keep project work wrong or stale only to agree with a lesson.

## Keep one light catalog

For a new catalog, use this flat form:

```text
patterns/
├── README.md
├── first-pattern.md
└── another-pattern.md
```

Use one stable, kebab-case file name for each pattern. Do not add category directories. Put project areas and components in `scope`.

Give each pattern this small header:

```markdown
---
status: candidate
scope:
  - <project area, component, or project-wide>
---

# <Pattern name>

<Free prose>
```

Use only `candidate`, `established`, or `retired` for `status`. Use names already present in the project for `scope`; do not invent a fixed global category system.

Keep the body free in form. Do not require standard sections. Make all five parts, project support, counterevidence, and transfer limits easy for a reader to find. Use headings, examples, diagrams, or short code only when they improve the teaching.

Write equally for people and agents. Use the language already used in the project's documentation. When the project has no clear language, use the language of the user's task. Explain project terms that an informed reader outside the immediate work may not know. Prefer stable project-relative paths, symbols, rules, tests, and decisions over unstable line numbers, timestamps, commit hashes, raw logs, or large copied code.

Maintain `patterns/README.md` with:

- a short statement of the catalog's purpose and the five-part definition;
- the meanings of the three statuses;
- one alphabetically sorted table with `Pattern`, `Status`, `Scope`, and `Summary`;
- a link to every pattern file, including retired patterns kept for history or migration.

Keep the index and files in agreement in the same change.

## Repair what the project teaches

Search the index and nearby entries before adding a file. Extend an existing pattern only when it has the same situation, tensions, response, consequences, and boundary.

Repair the catalog when evidence changes:

- Merge entries that teach the same relation. Keep one stable file and repair every catalog link.
- Split an entry when one part of the relation differs enough to change recognition or action. Name the contexts clearly and link the variants.
- Narrow `scope` when the relation holds in only part of the project.
- Delete a candidate when its support disappears, a real case disproves it, transfer fails, or it has no reusable lesson.
- Mark an established pattern `retired` when it is no longer valid. Explain why it must not guide new work and link its replacement when one exists.

Do not silently rewrite a conflict into agreement. Keep the difference visible until project facts show a real scope split, replacement, or unresolved choice.

## Respect the task's authority

When the task authorizes repository changes, update relevant pattern files and their index as part of the same change. Pattern maintenance needs no separate request when it stays within that authorized work.

When the task is read-only, such as an explanation, review, or diagnosis, do not change the repository. Report the proposed pattern path, status, and update instead. Also obey an explicit request not to write pattern files.

Preserve unrelated user changes. Do not rewrite production code merely to make a pattern easier to teach. Never record secrets, personal data, or generated and vendor details that the project does not own. Keep pattern work smaller than the value it gives to later work.

## Run the teaching loop

1. Set the work boundary and find the repository root.
2. Read the index and every relevant lesson.
3. Inspect the current project evidence and test each applicable relation.
4. Do the requested work with established patterns that still fit.
5. Run the checks needed by the work.
6. Distill only the reusable relation that the work revealed or changed.
7. Pass the definition, support, counterexample, and transfer tests.
8. Create, update, promote, merge, split, delete, or retire entries when authorized.
9. Repair the alphabetical index and report every pattern change.

Finish when the requested result is complete, relevant established patterns still teach the truth, each changed status has fitting support, and the catalog has no duplicate or stale lesson caused by the work.
