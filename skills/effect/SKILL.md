---
name: effect
description: "Use Effect thinking throughout every task in a repository that depends on effect or @effect/*. Learn the exact installed version from its public source, declarations, implementation, tests, and type tests. Model the whole program as composable typed descriptions, keep its meaning intact from design through execution, discover the library's existing vocabulary before inventing local machinery, validate against the real project, and briefly teach the reasoning and source path instead of relying on memory or fixed recipes."
---

# Effect

## Think in Effect

Treat Effect as the language of the whole program, not as a tool used in a few places.

Describe work as typed values. Compose those descriptions into a program. Run the program only at a deliberate edge. Let each type give a live account of what a description means, what it needs, and what it may yield.

Start from the meaning of the work. Ask:

- What program are we describing?
- Which facts must remain visible?
- What does each part need from the rest of the program?
- Which results must callers be able to understand and act on?
- Where does description become execution?
- How does this part join the whole without losing meaning?
- Which exact source proves the model and the code?

Do not first build the real program with untracked host-language control flow and wrap it later. Shape the program in Effect from the start. Keep plain facts as plain values, but make their place in the whole Effect program clear.

## Carry one model through the whole workflow

Use Effect thinking from the first question to the final proof:

1. Study the real need and the current program.
2. Model the work and its meaning before choosing names from the API.
3. Discover the library language that already expresses that model.
4. Build by composing public Effect descriptions.
5. Join the change to the rest of the program without changing its meaning at a boundary.
6. Execute at an owned edge where the complete program is ready.
7. Verify the types, behavior, and final result together.
8. Teach the small part of the model that makes the solution reusable.

Do not let Effect become a local wrapper around a program controlled in another way. Keep the model alive across files, modules, components, and system edges. When an edge must use a host or third-party API, keep that contact narrow and bring its meaning back into the Effect program at once.

## Learn the exact Effect in front of you

Treat the project and its matching source as the truth. Do not trust memory, an old example, or a fluent guess when the source can answer.

1. Read the nearest package manifest, workspace settings, and lockfile for the part being changed.
2. Find every installed Effect package that is relevant to that part and record its exact resolved version.
3. Resolve the real package directory with the project's package manager or runtime. Follow links instead of assuming a flat node_modules layout.
4. Read the package manifest and its export map. Use only paths the package makes public.
5. Read the project's existing Effect code to learn its shared language and the shape of the complete program. Treat it as evidence, then check it against the installed version.
6. Read local TypeScript source when the package includes it. Otherwise read the public declarations and their documentation, then the shipped implementation and source maps as needed.
7. When fuller source is needed, look for an existing local Effect repository. If none exists and network access is allowed, inspect the official Effect repository in a temporary location.
8. Match the repository package, version, tag, or commit to the installed package before trusting it. Do not silently use a moving branch or a different release.

If exact source cannot be reached, say what evidence is available and what remains uncertain. Do not hide the gap with a fixed recipe.

## Follow the need through the source

Search by meaning before searching by a remembered function name.

- Start from the package's public surface and source tree. Search broadly enough to learn the vocabulary around the problem.
- Read the public signature and documentation first. Understand what the library promises to callers.
- Follow the definition into the implementation only far enough to understand the runtime meaning and important conditions.
- Read the nearest behavior tests and type tests. Use them to see how the public contract is meant to compose and what the types must preserve.
- Follow related public definitions until the chosen construction fits the whole program, not only the local line.
- Read change history when installed code, project code, and remembered usage disagree.

Give each source its proper role: the public surface defines supported use, the implementation explains runtime meaning, and tests provide examples and boundary evidence. Never import a private path or copy an internal helper merely because reading it was useful.

Do not stop at the first API that compiles. Confirm that its meaning, type behavior, runtime behavior, and place in the complete program all fit the need.

## Use the whole Effect language

Before inventing a helper, wrapper, local protocol, or new dependency, search the complete public Effect source for an existing expression of the same idea.

Prefer the library's own composition model when it preserves the needed meaning. Let one description connect to the next without hiding requirements or results. Keep execution out of inner code when the program can remain a value and be interpreted once at its edge.

Use existing project patterns when they agree with the exact source and keep the full model intact. Repair or replace a stale pattern when the installed version gives a clearer or safer expression.

Do not reduce Effect to the small part already familiar to you. Each unfamiliar need is a reason to study the source, widen the map, and learn how that part belongs to the rest of the system.

## Prove and teach the result

Use the project itself as the final check:

1. Make the smallest disposable compile probe when a public type or composition is still unclear.
2. Run the project's type check and the closest meaningful tests.
3. Check the complete path when the change crosses a boundary.
4. Confirm that all imports are public and match the installed version.
5. Remove temporary probes and keep only evidence that belongs in the project.

Lead the handoff with the result. Then explain, in a few useful sentences:

- the Effect model used for the work
- the exact source and tests that established it
- why the chosen composition keeps its meaning through the whole program
- how to follow the same source path for the next nearby question

Keep the teaching proportional. Give the user a reusable way to think and discover without turning a small task into a long lesson.

Finish only when the public API matches the installed version, the types and runtime meaning agree, the relevant checks pass, and every exit from the Effect model is a deliberate boundary.
