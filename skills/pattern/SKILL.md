---
name: pattern
description: Distill, teach, apply, and maintain project-specific software patterns as independent, runnable teaching repositories under patterns/. Use when turning concrete engineering experience into a hands-on pattern repository; learning or applying an existing pattern through its executable example; testing whether a lesson transfers to another case; or promoting, revising, splitting, merging, or retiring a pattern. Require patterns/<pattern-name>/ for each pattern, one repository per pattern, a working reference implementation, a guided learner journey, and verified commands. Do not treat repeated code, a rule, recipe, decision, abstraction, example, or failure as a pattern by itself.
---

# Pattern

## Teach through a repository people can run

Hold one working attitude: TEACH WHAT CAN LIVE BEYOND ONE CASE BY LETTING THE LEARNER RUN IT.

Produce each pattern as its own code repository at `patterns/<pattern-name>/`. Let a learner clone or open that repository, run the example, observe the important behavior, change something, and verify what the change teaches. Do not reduce a pattern to a document in a catalog.

Define a pattern as one teachable relation with five parts:

- **Situation:** the recurring context in which the lesson may apply.
- **Tensions:** the needs, limits, and forces that make a simple answer incomplete.
- **Response:** an adaptable form of action that works with those tensions.
- **Consequences:** what the response enables, costs, risks, or changes.
- **Boundary:** the conditions under which the relation changes or stops applying.

Make the repository teach this relation. Code demonstrates the response; tests and runnable experiments reveal its consequences and boundary; prose helps the learner recognize and adapt it.

Let current requirements, supported outside contracts, project settings, and direct evidence override a pattern. Teach a pattern as a useful project model, never as truth that reality must obey.

## Put independent repositories under patterns/

Give every pattern:

- its own `patterns/<pattern-name>/` directory;
- its own version-control root and history;
- one stable, kebab-case repository name;
- one pattern only;
- a manifest or native project definition;
- a runnable reference implementation;
- automated verification;
- a learner-facing `README.md`; and
- the configuration and fixtures needed to run without private project state.

Use `patterns/` as the common parent directory and each immediate child as one independent repository:

```text
patterns/
├── first-pattern/       # independent repository
│   ├── .git/
│   ├── README.md
│   ├── <manifest and lockfile>
│   ├── <source or runnable example>
│   └── <tests or executable checks>
└── another-pattern/     # another independent repository
    └── ...
```

Do not turn `patterns/` itself into the single repository that owns all pattern implementations. Do not collect several patterns in one child repository, package, documentation site, or examples directory. A parent index may link to the child repositories, but it never replaces their code, history, README, or runnable teaching path.

Find the repository or workspace root that owns the in-scope work and use its `patterns/` directory. Create `patterns/` only when producing the first qualified pattern. Establish the kebab-case child name before writing. When the user has not authorized a remote repository, create only the local independent repository; do not publish it.

Adapt each child repository's layout to its ecosystem. Include sample configuration, fixtures, and CI when needed or when the hosting target is known.

Add folders only when the example needs them. Keep the repository small enough for the pattern's relation to remain visible.

## Make the first run teach

Write `README.md` as the front door for a learner. Make it possible to follow without the author's private context. Include:

- the pattern status: `candidate`, `established`, or `retired`;
- what the learner will understand or be able to do;
- the situation, tensions, response, consequences, and boundary;
- the concrete project evidence from which the pattern was learned;
- prerequisites with supported versions;
- exact setup, run, and verification commands;
- what the learner should observe and why it matters;
- at least one guided change, exercise, or experiment;
- an exact command or observable result that checks the exercise;
- the tempting alternative when it materially improves understanding;
- cleanup or reset instructions when the exercise changes state; and
- known limits, counterexamples, and transfer questions for a new case.

Keep the reference implementation runnable before the exercise begins. Prefer a short path to the first meaningful observation. Explain project-specific terms that an informed reader may not know.

Use stable source paths, symbols, commands, tests, and decisions as evidence. Avoid unstable line numbers, timestamps, commit hashes, raw logs, and large copied code. Link to public or durable source material when the learner needs it.

## Make the repository genuinely runnable

Use the project's native toolchain and ordinary conventions. Pin the toolchain and dependencies to the degree needed for repeatable learning. Commit the lockfile when that ecosystem normally uses one.

Keep the teaching path self-contained:

- provide small, owned fixtures instead of depending on production data;
- provide sample configuration and safe local defaults;
- never commit secrets or personal data;
- avoid requiring private services, repositories, registries, or credentials;
- replace external systems with a local substitute only when the substitute preserves the tension being taught; and
- state any unavoidable network, platform, cost, or account dependency before the run command.

Make failures instructional. Commands should fail with enough information for the learner to recover. Do not hide the pattern behind scaffolding, a framework, or an abstraction larger than the lesson.

Test observable behavior rather than code shape. Include checks for the main success and for the most important boundary or consequence. Add CI when the repository is published to a known hosting platform; run the same learner commands in CI.

## Know what is not a pattern

Do not produce a pattern repository merely because an item is useful or repeated:

- Repeated code or a common shape is an observation until the same relation is known.
- A rule, policy, or decision gives direction but is not a pattern unless it teaches all five parts for recurring cases.
- A recipe or checklist gives steps but is not a pattern when the learner cannot adapt it from the tensions.
- An abstraction, type, module, or tool may carry a pattern but is not the pattern itself.
- An example, bug, failure, or lesson learned may support a pattern but is not one alone.
- A one-time choice has no transfer to teach.
- A general best practice with no special project meaning does not justify a project pattern repository.

Do not create a standalone anti-pattern repository. When a tempting bad response helps teach a positive pattern, demonstrate or explain it inside the positive pattern's repository. Show why it is tempting, how it fails under the stated tensions, and how the response handles them.

## Earn the right to teach

Keep these states distinct:

- An **observed case** is what a project directly does or has experienced.
- A **candidate** is a pattern hypothesis inferred from at least one real case.
- An **established pattern** is a complete, runnable, transferable lesson with fitting project support.
- A **retired pattern** is a repository kept only to understand old work or move to a replacement.

Create a candidate repository only when every part of the relation can be stated honestly, at least one concrete project source supports it, another real case is likely, and a runnable teaching example can preserve the important tensions.

Promote a candidate to `established` only when either condition holds:

- an authoritative project rule or explicit user decision defines the recurring situation, tensions, response, consequences, and boundary; or
- at least two independent, successful uses exist and the relevant checks pass.

Treat uses as independent only when one is not generated, copied, or derived from the other. Do not promote a repository because its tutorial is polished, its tests pass in isolation, no one objected, or the README calls it established.

Before teaching an established pattern, verify that a learner can:

1. complete the documented setup from a clean checkout;
2. run the reference implementation and observe the claimed behavior;
3. complete the guided change or experiment and verify its effect;
4. recognize a new situation in which the pattern applies;
5. explain why the response fits the tensions;
6. adapt the response without copying this implementation; and
7. name a counterexample or boundary where it should not be used.

Keep the repository a candidate if this transfer test fails.

## Begin with real cases

Inspect the closest project evidence before creating or changing a pattern repository: requirements, code, tests, settings, operating behavior, failures, and recorded decisions. Use memory and familiar names to search, not to invent support.

Compare cases before claiming that they share a pattern. Look for different causes that produce the same surface form, different responses that satisfy the same tensions, negative cases, and changes in scope or time that break the relation.

Try to refute the hypothesis. Apply it to another case and predict what should happen. Find the strongest competing explanation and nearest boundary. Let a mismatch change the relation, example, scope, status, or existence of the repository.

Do not create a whole collection of pattern repositories unless the user asks for one. Do not delay requested product work to extract a weak or marginal lesson.

## Learn from and maintain repositories

When applying a pattern:

1. Read its `README.md`.
2. Inspect its manifest, implementation, tests, and fixtures.
3. Run its documented setup and verification commands.
4. Check its assumptions against the current project's requirements, versions, code, settings, and behavior.
5. Use an applicable `established` pattern as a default only while it still fits.
6. Treat a `candidate` as a hypothesis to test.
7. Use a `retired` pattern only to understand old work or migrate to its replacement.

Maintain the teaching repository when evidence or runtime behavior changes:

- update the example and teaching path together;
- narrow the stated situation or boundary when transfer fails;
- split a repository when one relation contains materially different situations, tensions, responses, consequences, or boundaries;
- merge duplicate lessons by choosing one surviving repository and redirecting or archiving the other;
- delete an unpublished candidate when its support disappears or it has no reusable lesson; and
- retire a published established repository when it must no longer guide new work, explaining why and linking its replacement.

Do not rewrite production code merely to make a pattern easier to teach. Preserve unrelated user changes. Keep generated, vendor, secret, and personal material out of the repository.

## Verify the teaching repository

Before handoff, reproduce the learner journey from a clean checkout or equivalent clean worktree:

1. install only the documented prerequisites;
2. run the exact setup command;
3. run the reference implementation;
4. confirm the documented observation;
5. run the automated checks;
6. perform the guided change or exercise;
7. run its verification;
8. follow reset or cleanup instructions; and
9. inspect the repository for secrets, private dependencies, generated clutter, and undocumented state.

If a clean run is not possible in the current environment, state exactly which step remains unverified and why. Never describe a repository as runnable based only on reading its code.

Report the `patterns/<pattern-name>/` path or remote URL, status, learner commands, verification results, and remaining platform or dependency limits. When the task is read-only, do not create or change a repository; report the proposed child name, status, teaching journey, and required checks instead.

Finish when one independent repository under `patterns/` teaches one qualified pattern, the documented journey works from a clean state, the code and prose express the same relation, and the evidence supports its status.
