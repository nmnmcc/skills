# ZIO

## Think in ZIO

Treat ZIO as the language of the whole program, not as a tool used in a few places.

Describe work as `ZIO[R, E, A]` values. Compose those descriptions into a program. Run the program only at a deliberate edge. Let `R` show what the work requires, `E` show its expected failure, and `A` show its success.

Start from the meaning of the work. Ask:

- What workflow are we describing?
- Which facts must remain visible?
- Which services and context does each part require?
- Which successes, typed failures, defects, and interruptions must callers understand?
- Where does description become execution?
- How does this part join the whole without losing meaning?
- Which exact source proves the model and the code?

Build every capability that ZIO can express inside ZIO from the start. Do not first control the work with Futures, callbacks, blocking JVM calls, raw threads, or runtime calls and wrap it later. Pure values and calculations may remain plain only when they own no effect, resource, lifetime, or running work.

Treat any direct Future or callback execution, blocking or foreign API, raw resource, unmanaged thread or fiber, or inner unsafe runtime call that bypasses ZIO as an escape hatch. Use one only after the exact resolved public API, source, and tests show that no supported ZIO construction can meet the need.

Before adding, expanding, or relying on an escape hatch, show the user why ZIO-native paths fail, name the exact boundary and risks, describe the adapter contract, and get explicit approval for that boundary. Silence, a broad request, or existing code is not approval. Without approval, do not implement it. If approved, isolate the smallest adapter, model success, typed failure, defect, interruption, and finalization, then return to ZIO at once.

## Carry one model through the whole workflow

Use ZIO thinking from the first question to the final proof:

1. Study the real need and the current program.
2. Model the workflow and its meaning before choosing names from the API.
3. Discover the ZIO vocabulary that already expresses that model.
4. Build by composing public ZIO values.
5. Join the change to the rest of the program without changing its meaning at a boundary.
6. Provide the full environment and execute at an owned application or runtime edge.
7. Verify types, behavior, scope, interruption, fiber ownership, and the final result together.
8. Teach the small part of the model that makes the solution reusable.

Do not let ZIO become a local wrapper around a program controlled in another way. Keep the model alive across files, modules, services, layers, and system edges. Use a ZIO-native adapter when one exists. If approved non-ZIO contact is unavoidable, keep it narrow and bring success, failure, interruption, and cleanup back into ZIO at once.

## Learn the exact ZIO in front of you

Treat the project and its matching source as the truth. Do not trust memory, an old example, or a fluent guess when the source can answer.

1. Read the nearest build definition, project settings, dependency declarations, resolved dependency report, Scala version, and platform target for the part being changed.
2. Find every relevant ZIO module and record its exact resolved version, organization, artifact name, Scala suffix, and platform suffix.
3. Resolve the real binary and source artifacts with the project's build tool or dependency manager. Do not assume one cache layout.
4. Read the public Scaladoc, signatures, module metadata, and package surface. Use only public packages and supported modules.
5. Read the project's existing ZIO code to learn its service, layer, error, scope, fiber, stream, and test patterns. Treat it as evidence, then check it against the installed version.
6. Read the matching sources JAR or release source, implementation, tests, and examples as needed.
7. When fuller source is needed, use an existing local checkout or inspect the [official ZIO repository](https://github.com/zio/zio) in a temporary location.
8. Match the artifact, release, tag, branch line, or commit to the installed version before trusting it. Do not silently use a moving branch or another release line.

If exact source cannot be reached, say what evidence is available and what remains uncertain. Do not hide the gap with a fixed recipe.

## Follow the need through the source

Search by meaning before searching by a remembered method name.

- Start from the public `ZIO[R, E, A]` contract and the source tree of the module that owns the need.
- Read the public signature and Scaladoc first. Understand what the library promises to callers.
- Follow the definition into implementation only far enough to understand runtime meaning and important conditions.
- Read the nearest specifications, examples, and compiler-checked uses. Use them to see how the contract composes and what the types preserve.
- Follow related public definitions until the chosen construction fits the whole program, not only the local expression.
- Read change history when installed code, project code, documentation, and remembered use disagree.

Give each source its proper role: public types and Scaladoc define supported use, implementation explains runtime meaning, and tests provide behavior and boundary evidence. Never import an internal package or copy private runtime machinery merely because reading it was useful.

Do not stop at the first expression that compiles. Confirm that its meaning, type behavior, runtime behavior, interruption behavior, and place in the complete program all fit the need.

## Use the whole ZIO language

Before inventing a helper, wrapper, local protocol, or new dependency, search the complete public ZIO source and the relevant official module for an existing expression of the same idea.

Prefer ZIO's own environment, service, layer, scope, error, cause, schedule, stream, state, and concurrency models when they preserve the needed meaning. Exhaust the public ZIO model before proposing an escape hatch. Keep `R`, `E`, and `A` honest. Do not provide the environment too early, widen useful errors without reason, confuse typed failures with defects or interruption, detach fibers, or run unsafe code inside the program merely to make a local type easier.

Use existing project patterns when they agree with the exact source and keep the full model intact. Repair or replace a stale pattern when the installed version gives a clearer or safer expression.

Do not reduce ZIO to the small part already familiar to you. Each unfamiliar need is a reason to study the source, widen the map, and learn how that part belongs to the rest of the system.

## Prove and teach the result

Use the project itself as the final check:

1. Make the smallest disposable compile probe when a public type or composition is still unclear.
2. Run the project's compile checks and the closest meaningful ZIO tests.
3. Check environment requirements, typed failures, defects, interruption, finalizers, scopes, and fiber ownership where they matter.
4. Check the complete path when the change crosses a JVM, process, storage, framework, or outside-system boundary.
5. Confirm that imports and modules are public, match the resolved version, and every escape hatch has explicit user approval and one narrow adapter.
6. Remove temporary probes and keep only evidence that belongs in the project.

Lead the handoff with the result. Then explain, in a few useful sentences:

- the ZIO model used for the work;
- the exact source and tests that established it;
- why the chosen composition keeps its meaning through the whole program;
- how to follow the same source path for the next nearby question.

Keep the teaching proportional. Give the user a reusable way to think and discover without turning a small task into a long lesson.

Finish only when the public API matches the resolved version, `R`, `E`, and `A` agree with runtime meaning, relevant checks pass, every scope and fiber has an owner, and every approved escape hatch is a deliberate, narrow, verified boundary.
