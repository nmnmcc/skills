---
name: proof
description: Write and maintain human-checkable, mathematical-style proofs of correctness and optimality beside first-party production code. Use when designing, writing, changing, reviewing, or releasing production functions or modules and Codex must prove that each implementation satisfies its contract and that no other correct solution is strictly better within an explicit solution space and ordering; justify choices such as binding versus inlining, algorithms, data forms, control flow, abstractions, boundaries, dependencies, and effects; establish a whole-project proof baseline; or re-prove every affected obligation. Treat correctness as the feasibility gate and do not use tests or machine checks as substitutes for the written proof.
---

# Proof

## Prove correctness, then optimality

Treat correctness as a relation between a program and a stated contract. First say exactly what must be true. Then give a logical argument that the code makes it true for every allowed case.

Treat correctness as the entry condition for comparison. An incorrect solution is not a candidate for "better." Only after the chosen implementation is proved correct may its optimality be considered.

Treat optimality as a universal claim. Define the allowed solution space and what "strictly better" means, then prove that no other correct solution in that space is strictly better. Comparing only a few remembered alternatives is not an optimality proof.

Write proofs that a person can inspect. Use definitions, stated assumptions, language and library semantics, and proofs already established for dependencies. Do not replace reasoning with a tool result. A passing test, compiler, type checker, static analyzer, model checker, or theorem prover belongs to another validation layer. It does not stand in for the written proof required here.

Keep the proof beside the code it explains. Do not claim that a function, module, change, or project is correct or optimal while the matching obligation is open or disproved.

## Set the production boundary

Find the code that the project owns and that runs to provide the production result. Read manifests, entry points, package boundaries, build settings, and deployment paths to find it.

Include every first-party production module and every callable body inside it:

- functions, methods, constructors, accessors, handlers, and jobs;
- local functions, closures, callbacks, and other anonymous callable bodies;
- production migrations or start-up work when they run against the live system.

Do not require a proof for tests, fixtures, examples, CI, or development-only tools. Treat generated code and vendor code as outside-owned code. State the generator rule or published external contract as an assumption, then prove that first-party production code uses it correctly. Leave the obligation open when that contract is missing or too weak.

Use search, parsers, or language tools to find all production code, but do not confuse an inventory result with semantic proof. Account for every callable body. An anonymous callable may have its own proof or be an explicit lemma inside the proof of its enclosing function.

When no proof baseline exists, map the whole production boundary and every production choice before claiming project correctness or optimality. After the baseline exists, use each change and its dependency path to find the smaller set that must be proved again.

## State the contract before the proof

Get the contract from the requirement, public interface, trusted domain rule, and real caller. Do not use the present implementation or its tests as the wanted specification.

For each function, state every fact needed to judge it:

- the domain and preconditions of every input and relevant starting state;
- the return value, output relation, postconditions, and state that must not change;
- every allowed failure, refusal, non-returning result, and visible effect;
- the order, count, ownership, and cleanup rules for effects and resources;
- termination, progress, or the intended long-running condition;
- every outside fact on which the claim depends.

For each module, state its owned purpose, exports, initialization behavior, shared invariants, and relation between its functions.

If a trusted specification is missing, derive the smallest honest contract from authoritative requirements, public promises, and callers. Mark every inference. Ask about any material ambiguity. Keep the proof open until the contract is trustworthy.

Reject a contract that is circular, empty, weaker than the real promise, or only says that the code does what the code does.

## Define the optimization problem

Do not use "best," "simplest," "cleanest," "fastest," or "most maintainable" before defining an order that makes the word true.

For each choice, state:

- the decision boundary and the set `S` of every implementation allowed by the contract, language, project rules, and task scope;
- the feasible set `F`, containing exactly every member of `S` that satisfies the correctness contract, with membership or exclusion established by proof;
- the hard constraints that remove a member from `F`;
- the ordered criteria used after correctness, including their units and priority;
- whether the order is total, lexicographic, weighted, or partial;
- which differences count as equal and how a tie is handled.

For a chosen implementation `c`, the needed claim is:

```text
Correctness: c is in F.
Optimality: there is no x in F such that x is strictly better than c.
```

Call `c` the unique optimum only if every different member of `F` is strictly worse. Call it a tied optimum when no member is better but another member is equal. With several criteria that have no justified priority, prove only that `c` is Pareto optimal: no correct member is at least as good in every criterion and strictly better in one.

The optimality claim is only as broad as `S`. Prove that `S` covers every allowed solution to the stated problem before saying "globally optimal." Do not hide an unknown alternative by defining the solution space around the chosen code.

Do not invent weights or priorities to make the current implementation win. Get them from the requirement, measured limit, project rule, or user decision. When two criteria conflict and no order is authoritative, keep global optimality open.

## Prove every real choice

Account for every production choice that has a feasible alternative. Include:

- introducing a binding or inlining an expression;
- naming, scope, lifetime, evaluation count, and evaluation order;
- a direct expression, helper, function, type, class, abstraction, or layer;
- an algorithm, data structure, representation, branch order, or state model;
- an interface, module boundary, dependency, cache, concurrency model, error form, or effect boundary;
- duplication, sharing, eager work, delayed work, and generated work.

Group repeated mechanical choices under one proved project rule when the same argument covers every case. For a form forced by syntax, generated output, or an authoritative formatter, cite that constraint and prove there is no choice inside the stated space. Do not write a separate fake decision proof for punctuation.

For every remaining choice:

1. State the chosen form and the exact question it answers.
2. Prove the chosen form correct.
3. Characterize all other correct forms, not only the easy alternatives.
4. Apply the stated order to eliminate or tie every other form.
5. Conclude the strongest true result: unique optimum, tied optimum, Pareto optimum, or optimality open.

For a binding versus inlining, compare at least evaluation count and order, effects, reuse, scope, lifetime, type narrowing, domain meaning, duplication, reading cost, and change cost. A binding is not optimal merely because its name sounds helpful. Inlining is not optimal merely because it removes a line. If both forms are correct and the stated order cannot distinguish them, record a tie. If an expression is effectful or used more than once, prove whether inlining changes evaluation or duplicates work. If a pure single-use binding does no proved work and fewer unnecessary parts is the first criterion, inlining strictly dominates it.

## Use the minimal complete proof normal form

Use the following semantic normal form. The exact labels and layout may follow the host language, but every applicable fact must remain explicit. Merge fields in a short proof only when the merged form has the same meaning and can still be audited independently.

```text
Proof: <stable subject>

Correctness theorem
- Authority: <requirement, public contract, domain rule, or non-circular proved theorem>
- Requires: <allowed inputs and starting states>
- Ensures: <return, output relation, post-state, failures, and refusals>
- Effects/frame: <state read or changed, all visible effects and resources, and what cannot change>
- Termination/progress: <required termination, permitted divergence, or progress/liveness condition>

Premises and dependencies
- <defined term, language or library semantic fact, outside assumption, or proved lemma>

Correctness proof
1. <subclaim>. <reason from named premises, code semantics, or earlier steps>
2. <remaining cases, invariant preservation, effects, cleanup, and termination>
3. Therefore, every execution admitted by Requires establishes the theorem.
Correctness status: proved | open: <exact gap> | disproved: <counterexample>

[Continue below only when Correctness status is proved.]

Optimality theorem
- Decision: <chosen implementation c and exact decision boundary>
- Solution space: <S, all implementations allowed by the authority and boundary>
- Feasible set: F = {x in S | x satisfies the correctness theorem}
- Strict order: better(x, y) exactly when <criteria, priority, units, and equality>
- Claim: no x in F satisfies better(x, c)

Solution-space completeness proof
1. <exhaustion, normal form, generative grammar, or other reason every allowed
   implementation belongs to S>

Optimality proof
1. c is in F by the correctness proof.
2. <lower bound, dominance, exhaustive comparison, contradiction, or decomposition>
3. Therefore, no x in F is strictly better than c.
Optimality status: proved as unique | proved as tied | proved as Pareto |
                   open: <exact gap> | disproved: <strictly better correct x>
```

Make every numbered step a claim with its reason, not a topic label. Structure a nontrivial step into numbered substeps whose stated goal implies the parent step. Cite only earlier steps, declared premises, or already-proved dependencies. This exposes missing reasoning and prevents circular proof.

Trace every `Requires`, `Ensures`, `Effects/frame`, and `Termination/progress` clause to the stated authority or show its derivation from that authority. A proof premise may define semantics or cite an outside fact; it must not narrow the allowed inputs, weaken the promised result, or grant the implementation behavior merely because the proof needs it. Mark correctness open when a needed premise has no authority. Never move such a premise into `Requires` to make the current code provable.

If correctness is incomplete, replace its conclusion with the exact missing premise, case, or contradiction, write `Correctness status: open`, then stop and write only `Optimality status: not applicable because correctness is not proved`. Write `Correctness status: disproved` when a counterexample proves the claim false, then stop in the same way. Do not instantiate `S`, `F`, or the order when the feasibility gate has not closed. If correctness is proved but the solution space, order, lower bound, or universal comparison is incomplete, write `Optimality status: open`. Write `Optimality status: disproved` when a strictly better correct member of `F` is exhibited. Never mark either proof as complete only because the result or choice looks likely.

A simple function or forced choice may use one short paragraph when it still contains every applicable field. When correctness is proved, that includes the optimization model, completeness reason, and both statuses; otherwise stop at the feasibility gate above. Use `none` for an empty effects set or assumption set; do not silently omit it. Do not use words such as "obvious" or merely restate the code.

### Why this normal form is optimal

Limit the comparison to human-readable, source-adjacent schemas that must prove total program correctness and global choice optimality, may reuse proved lemmas from the nearest `PROOF.md`, and must represent incomplete or disproved work honestly. Judge schemas lexicographically:

1. admit a `proved` status only when the logical obligations are sufficient;
2. expose every fact needed to check the theorem and universal optimality claim;
3. expose proof dependencies and the first open or false step for local review and invalidation;
4. after those conditions tie, require no repeated independent fact or ceremonial field.

The normal form is a tied optimum under that order:

1. A correctness proof needs a subject and exact theorem; otherwise there is no fixed proposition to prove. Authority is necessary to distinguish the wanted theorem from a self-serving description inferred from the implementation. Preconditions, outcomes, frame/effects, and termination/progress are independent: two programs can agree on any three and differ on the fourth.
2. Premises and proved dependencies are necessary to check that every inference is supported and non-circular. A derivation is necessary because premises plus a conclusion are not a proof. An explicit status is necessary because this workflow also records open and disproved obligations.
3. An optimality proof necessarily identifies `c`, `S`, the correctness-filtered `F`, and `better`; without any one of them, "no better correct solution" has no defined truth condition. A completeness proof for `S` and a universal argument over `F` are necessary to establish, rather than merely state, that truth condition.
4. The normal form contains each independent fact once. Hierarchical substeps refine the derivation without adding a new kind of obligation. Any additional necessary detail is a refinement of one of these fields; any unrelated mandatory field cannot improve the first three criteria. Removing a field loses an independent obligation, while adding repetition loses the fourth criterion.

Therefore no schema in the stated comparison class is strictly better. Equivalent headings, reordered fields with unchanged dependencies, and equally non-redundant encodings tie; the literal English labels are not claimed to be uniquely optimal.

## Put the proof beside the code

Put a proof comment immediately before or inside each production function. Follow the language's normal comment form. Avoid a runtime docstring when it changes runtime behavior, package size, generated documentation, or public API.

Put a short module proof near the module header or public surface when one source comment can cover its exports, initialization, shared invariant, and design optimum. Give it the same correctness and optimality structure as a function proof; a module contract or design rationale alone is not a proof. Use a `PROOF.md` in the nearest component directory when the argument joins several functions or files. Put shared definitions, assumptions, lemmas, module theorems, optimization criteria, solution-space arguments, composition proofs, and open obligations there. Link each theorem to stable source symbols or paths and leave a short source comment that points to it. Keep function-local reasoning in source comments and do not copy the same proof into both places.

Create a root `PROOF.md` only for a correctness theorem, invariant, or optimality claim that truly joins several components. Do not move local proofs into a distant central catalog.

## Build a complete argument

Follow the code as a mathematical object:

- For straight-line code, show that each step preserves the facts needed by the next step.
- For a call, establish the callee's preconditions and use no result stronger than its proved postconditions.
- For branches and matches, show that the cases cover every allowed state and prove the claim in each case.
- For a loop, state an invariant, prove initialization and preservation, use the exit condition to reach the postcondition, and give a well-founded decreasing measure for termination.
- For recursion, prove the base cases, the inductive step, and a well-founded measure that becomes smaller.
- For mutable state, show the state before and after every change and prove the frame condition for state that must stay unchanged.
- For errors and cleanup, prove every exceptional path and every required release or rollback.
- For concurrency, prove the allowed interleavings, atomic steps, ownership, ordering, cancellation, and progress assumptions.
- For time, randomness, floating-point values, overflow, or other nondeterminism, prove the claim for every allowed outcome under the exact stated model.
- For outside systems, prove only the conditional result supported by their contract. Keep unknown behavior visible.

Prove a module theorem from its function proofs and shared invariants. Never use the module theorem as a premise for a function proof that is needed to establish that same theorem.

Try to refute every proof. Look for a missing case, false premise, counterexample, hidden side effect, non-termination, circular dependency, or stronger conclusion than the argument supports. Repair the contract, code, or proof at the first false step.

## Prove that no better solution exists

Do not treat a list of alternatives as a proof that no other alternative exists. Close the universal claim with one or more sound forms:

- **Exhaustion:** enumerate a finite solution space, prove the enumeration complete, and compare every correct member.
- **Lower bound:** prove that every correct solution has a minimum unavoidable cost, then show that the chosen solution reaches that bound.
- **Dominance:** show that every other correct solution can be changed into the chosen form without making any criterion worse and with at least one strict improvement when uniqueness is claimed.
- **Normal form:** prove that every correct solution has an equivalent canonical form, then optimize over all canonical forms.
- **Contradiction:** assume a strictly better correct solution exists and derive a break in the contract, constraint, lower bound, or ordering.
- **Induction or decomposition:** prove optimal substructure and that local optima compose. Do not assume that locally best choices make a globally best system.

Reject each incorrect alternative at the correctness gate, not by assigning it a worse score. Compare only correct alternatives.

Measure cost across the whole affected path. Do not call one function simpler, faster, or safer by moving knowledge, work, memory, effects, risk, or maintenance cost to callers or another part. Include construction, use, failure, repair, and later change when the declared order includes them.

Turn qualities such as clarity or maintainability into explicit project rules or observable decision criteria before using them. A personal preference or confident prediction cannot prove a global optimum. If the criterion cannot support a sound comparison, remove it from the ordering or keep optimality open.

Try to construct a strictly better correct alternative after the proof is written. If one exists, the chosen form is not optimal. If the search space cannot be shown complete, the result may be a justified choice or a local optimum, but it is not a proved global optimum.

## Keep proofs current

Treat a proof as part of the code contract:

- A function body change invalidates its function proof.
- A contract change invalidates every caller proof that uses it.
- A shared definition, invariant, or outside assumption change invalidates every dependent function, module, and system theorem.
- A solution-space, constraint, criterion, priority, or cost-model change invalidates every dependent optimality proof.
- A new feasible alternative invalidates any proof whose completeness argument did not already cover it.
- A move or rename requires nearby comments and document links to move with it.
- Removing production code requires removing its proof and repairing every composition proof that used it.

Trace correctness and optimality invalidation through the dependency graph. Prove the smallest closed affected set, not only the edited file. Keep the whole-project baseline complete after every incremental change.

Store the new or repaired proof in the same change as the production code. Do not put volatile timestamps, commit hashes, raw tool logs, or test results inside the proof.

Do not refactor or rewrite correct production code merely to make its proof shorter or easier. In a review or proof-only task, preserve every executable statement and add or repair only proof comments and proof documents. When proof work exposes wrong or suboptimal code, change it only when the user's task explicitly authorizes implementation; otherwise write the correctness counterexample or strictly better correct alternative and leave the matching obligation open without silently changing behavior.

## Reject false proofs

Do not accept:

- a list of passing checks or tested examples;
- a paraphrase of each code line with no logical link to the claim;
- the wanted conclusion used as one of its own premises;
- a proof that skips a branch, failure, effect, cleanup path, or termination claim;
- an unstated fact about a caller, library, runtime, service, clock, or scheduler;
- a local proof used to claim an end-to-end result without a composition proof;
- present behavior treated as proof of wanted behavior;
- a comparison with only the alternatives that happened to be named;
- a solution space defined so narrowly that it excludes a possible better form;
- criteria, weights, or priorities chosen after seeing which option wins;
- "clearer," "simpler," "more flexible," or "more maintainable" with no defined order;
- a local optimum called global without a proof that local optima compose;
- an incorrect alternative kept in the ranking instead of rejected as infeasible;
- a tie called a unique optimum or a Pareto result called a total optimum;
- "it is obvious," confidence, convention, or lack of a known counterexample.

Name the first invalid step. Mark the matching correctness or optimality obligation open when support is incomplete and disproved when a counterexample closes the negation. Never hide a gap behind more words.

## Run the proof loop

1. State the production boundary, wanted result, and authoritative specification.
2. Inventory every production module and callable body. Establish the full baseline when none exists.
3. Write or repair each contract before reasoning from it.
4. Prove correctness for every function, module, and composition before comparing solutions.
5. Inventory every production choice, including local bindings and inlining, and define its complete solution space and order.
6. Prove a lower bound, exhaustive comparison, dominance transformation, normal form, contradiction, or another sound universal argument.
7. Write each local correctness and optimality proof beside its code and each composition proof in the nearest `PROOF.md`.
8. Try to break correctness with a counterexample and optimality with a strictly better correct solution.
9. Re-prove every transitive dependent affected by a changed body, contract, invariant, assumption, alternative, or optimization rule.
10. Run tests and machine checks only as a separate validation layer when another active skill or the task calls for them.
11. Report the proved scope, assumptions, solution spaces, orders, proof locations, open obligations, and separate validation results.

Finish only when every in-scope production module and callable body is proved correct, every real production choice is proved to have no strictly better correct alternative in a complete stated solution space, every composition claim follows from non-circular premises, and no needed obligation is open or disproved. If correctness is open or disproved, optimality is not applicable. If correctness is proved but optimality is open, report the result as correct but not proved optimal. If optimality is disproved, report the strictly better correct solution. State exactly what would close each gap.

## Work with the other skills

Use `study` to learn the real contract, alternatives, and system before proving them. Use `simplicity` to find whether each part does necessary work across the whole system. Use `typesafe` for guarantees carried by types and runtime contracts, `effect` for observable work and execution boundaries, and `testing` for execution evidence where written reasoning does not remove practical risk. Keep those machine and runtime checks separate from this human-readable proof.

Use `point` for one local proof, `line` for one invariant across a technical domain, and `plane` for a theorem that must compose across system boundaries. Use `just-do-it` to turn each closed obligation into a complete result.
