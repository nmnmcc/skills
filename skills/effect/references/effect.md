# Effect

## Think in Effect

Treat Effect as the language of the whole program, not as a tool used in a few places.

Describe work as `Effect<Success, Error, Requirements>` values. Compose those descriptions into a program. Run the program only at a deliberate edge. Let each type give a live account of what a description may yield, how it may fail, and what it needs.

Start from the meaning of the work. Ask:

- What program are we describing?
- Which facts must remain visible?
- What does each part need from the rest of the program?
- Which results and failures must callers understand and act on?
- Where does description become execution?
- How does this part join the whole without losing meaning?
- Which exact source proves the model and the code?

Build every capability that Effect can express inside Effect from the start. Do not first control the work with Promises, callbacks, host-language effects, or runtime calls and wrap it later. Pure values and calculations may remain plain only when they own no effect, resource, lifetime, or running work.

Treat any direct Promise or callback execution, host API, raw resource, unmanaged task, or inner runtime call that bypasses Effect as an escape hatch. Use one only after the exact installed public API, source, and tests show that no supported Effect construction can meet the need.

Before adding, expanding, or relying on an escape hatch, show the user why Effect-native paths fail, name the exact boundary and risks, describe the adapter contract, and get explicit approval for that boundary. Silence, a broad request, or existing code is not approval. Without approval, do not implement it. If approved, isolate the smallest adapter, model success, error, defect, interruption, and cleanup, then return to Effect at once.

## Carry one model through the whole workflow

Use Effect thinking from the first question to the final proof:

1. Study the real need and the current program.
2. Model the work and its meaning before choosing names from the API.
3. Discover the library language that already expresses that model.
4. Build by composing public Effect descriptions.
5. Join the change to the rest of the program without changing its meaning at a boundary.
6. Provide every requirement and execute at an owned edge where the complete program is ready.
7. Verify the types, behavior, resource lifetime, and final result together.
8. Teach the small part of the model that makes the solution reusable.

Do not let Effect become a local wrapper around a program controlled in another way. Keep the model alive across files, modules, components, and system edges. Use an Effect-native adapter when one exists. If approved non-Effectful contact is unavoidable, keep it narrow and bring success, failure, cancellation, and cleanup back into Effect at once.

## Learn the exact Effect in front of you

Treat the project and its matching source as the truth. Do not trust memory, an old example, or a fluent guess when the source can answer.

1. Read the nearest package manifest, workspace settings, lockfile, TypeScript settings, and runtime version for the part being changed.
2. Find every installed `effect` or `@effect/*` package that is relevant to that part and record its exact resolved version.
3. Resolve the real package directory with the project's package manager or runtime. Follow links instead of assuming a flat dependency layout.
4. Read the package manifest and export map. Use only paths the package makes public.
5. Read the project's existing Effect code to learn its shared language and the shape of the complete program. Treat it as evidence, then check it against the installed version.
6. Read local TypeScript source when the package includes it. Otherwise read public declarations and documentation, then shipped implementation and source maps as needed.
7. When fuller source is needed, use an existing local checkout or inspect the [official Effect repository](https://github.com/Effect-TS/effect) in a temporary location.
8. Match the package, release, tag, or commit to the installed version before trusting it. Do not silently use a moving branch or a different release.

If exact source cannot be reached, say what evidence is available and what remains uncertain. Do not hide the gap with a fixed recipe.

## Follow the need through the source

Search by meaning before searching by a remembered function name.

- Start from the package's public surface and source tree. Search broadly enough to learn the vocabulary around the problem.
- Read the public signature and documentation first. Understand what the library promises to callers.
- Follow the definition into implementation only far enough to understand runtime meaning and important conditions.
- Read the nearest behavior tests and type tests. Use them to see how the public contract composes and what the types must preserve.
- Follow related public definitions until the chosen construction fits the whole program, not only the local line.
- Read change history when installed code, project code, documentation, and remembered use disagree.

Give each source its proper role: the public surface defines supported use, implementation explains runtime meaning, and tests provide examples and boundary evidence. Never import a private path or copy an internal helper merely because reading it was useful.

Do not stop at the first API that compiles. Confirm that its meaning, type behavior, runtime behavior, interruption behavior, and place in the complete program all fit the need.

## Use the whole Effect language

Before inventing a helper, wrapper, local protocol, or new dependency, search the complete public Effect source for an existing expression of the same idea.

Prefer the library's own composition, service, layer, scope, error, schedule, stream, and concurrency models when they preserve the needed meaning. Exhaust the public Effect model before proposing an escape hatch. Keep success, error, and requirements honest. Do not provide requirements too early, erase useful errors, hide defects, detach fibers, or run inner effects merely to make a local type easier.

Use existing project patterns when they agree with the exact source and keep the full model intact. Repair or replace a stale pattern when the installed version gives a clearer or safer expression.

Do not reduce Effect to the small part already familiar to you. Each unfamiliar need is a reason to study the source, widen the map, and learn how that part belongs to the rest of the system.

## Prove and teach the result

Use the project itself as the final check:

1. Make the smallest disposable compile probe when a public type or composition is still unclear.
2. Run the project's type check and the closest meaningful behavior and type tests.
3. Check requirements, typed errors, defects, interruption, cleanup, and fiber ownership where they matter.
4. Check the complete path when the change crosses a boundary.
5. Confirm that all imports are public, match the installed version, and every escape hatch has explicit user approval and one narrow adapter.
6. Remove temporary probes and keep only evidence that belongs in the project.

Lead the handoff with the result. Then explain, in a few useful sentences:

- the Effect model used for the work;
- the exact source and tests that established it;
- why the chosen composition keeps its meaning through the whole program;
- how to follow the same source path for the next nearby question.

Keep the teaching proportional. Give the user a reusable way to think and discover without turning a small task into a long lesson.

Finish only when the public API matches the installed version, success, error, and requirements agree with runtime meaning, relevant checks pass, every resource and fiber has an owner, and every approved escape hatch is a deliberate, narrow, verified boundary.
