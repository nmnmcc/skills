---
name: effect
description: "Use effect-aware thinking whenever designing, writing, changing, reviewing, or debugging code. Make observable work, dependencies, failures, state changes, resource lifetimes, concurrency, cancellation, and execution boundaries explicit. Follow the project's existing language and tools, learn the exact public API when a library is involved, keep meaning intact from design through execution, and verify the real behavior without forcing a new effect system."
---

# Effect

## Make effects explicit

An **effect** is work that changes or depends on something outside a returned plain value. It may read or write data, use time or random values, change state, fail, start work, wait, use a resource, or contact another system.

Make each important effect visible in the form that the project can support. This may be a type, value, return result, exception, function signature, interface, dependency, runtime contract, or clear control-flow boundary.

Do not assume that every effect needs a special library or type. Do not hide important work only because the current language cannot state it in a static type.

Start from the meaning of the work. Ask:

- What work can be seen outside this operation?
- Which inputs, services, state, and outside systems does it need?
- What can succeed, return no value, refuse, fail, or stop early?
- Which state can change, and who owns that change?
- Which resources must be opened, used, and closed?
- Can work overlap, time out, or be cancelled?
- Where does description or preparation become execution?
- Which source and checks prove the model and the code?

Keep plain calculations plain. Keep effects clear where they enter, compose, and run.

## Learn the effect model in front of you

Treat the project and its matching sources as the truth. Do not force a remembered pattern onto a different language, library, or codebase.

1. Read the project settings, build files, manifests, lockfiles, and language or runtime versions for the part being changed.
2. Read existing code to learn how the project represents input and output, state, failure, resources, delayed work, concurrency, and cancellation.
3. Find the language features, standard-library tools, framework rules, or effect libraries that own those concerns.
4. When a library is involved, resolve the exact installed version and public surface with the project's own build or package tools.
5. Read public documentation, signatures, declarations or headers, implementation, behavior tests, and type tests as available.
6. Match fuller source to the installed release before trusting it. Do not silently use a moving branch or a different version.

Use each source for its proper job: public documentation and signatures define supported use, implementation explains runtime meaning, and tests give behavior and boundary evidence. Never import a private path or copy an internal helper merely because reading it was useful.

If the project has no effect library, use its normal language and framework tools. Do not add a library only to make the code follow a preferred style. Add a new tool only when the real need justifies its cost and the user has authorized that change.

If exact source cannot be reached, say what evidence is available and what remains uncertain. Do not hide the gap with a fixed recipe.

## Carry the model through the whole workflow

Use one effect model from the first question to the final proof:

1. Study the real need and current program.
2. State the observable work, dependencies, results, failures, state changes, lifetimes, and execution boundary.
3. Choose the existing project forms that express those facts.
4. Build the operation so each step keeps the facts visible that later code must handle.
5. Join it to the rest of the program without changing its meaning at a boundary.
6. Execute at an owned edge where dependencies, cleanup, failure handling, and cancellation are ready.
7. Verify static guarantees where they exist, then test the runtime behavior and final result.
8. Teach the small part of the model that makes the solution reusable.

Do not build important effects in hidden control flow and label them only after the fact. When code meets a host, framework, or third-party API, keep that contact narrow and bring its result, failure, and lifetime back into the program's visible model at once.

## Keep the important facts visible

For every important operation, show the facts that callers need:

- **Requirements:** input, services, state, authority, and settings needed to run.
- **Results:** every useful success value and the meaning of no value.
- **Failures:** expected refusal or error, unexpected defects, and which code may handle each one.
- **State:** what may change, who owns it, and what other work may observe.
- **Resources:** how acquisition, use, cleanup, and partial failure fit together.
- **Time and concurrency:** delay, timeout, retry, cancellation, ordering, and ownership of work.
- **Execution:** the point where prepared work actually starts and where its outcome is observed.

Use the strongest clear form the project already supports:

- When the type system can carry requirements, results, or failures, keep those links in the types.
- When the language uses exceptions, callbacks, asynchronous control flow, context, or protocols, make their contract and ownership clear at the interface.
- When checks happen at runtime, validate at the boundary and make each possible outcome visible to later code.
- When direct imperative code is the clearest fit, isolate the effect and keep its inputs, outputs, failure, and cleanup explicit. Do not wrap it in machinery that adds no useful guarantee.

No one style is always right. Judge the form by whether it keeps the needed meaning visible and makes correct composition, execution, testing, and repair easier.

## Follow the need through the source

Search by meaning before searching by a remembered function name.

- Start from the project's public surface and the source tree of the feature or dependency that owns the need.
- Read the public contract first. Understand what callers may rely on.
- Follow the definition into implementation only far enough to understand runtime behavior and important conditions.
- Read the nearest behavior and type checks to learn how the contract composes and where its proof ends.
- Follow related public definitions until the chosen construction fits the whole program, not only the local line.
- Read change history when installed code, project code, documentation, and remembered use disagree.

Before inventing a helper, wrapper, local protocol, or dependency, search the project and relevant public source for an existing expression of the same idea. Prefer an existing form when it preserves the needed meaning. Repair a stale pattern when current project evidence shows a clearer or safer form.

Do not stop at the first construction that builds or runs. Confirm that its meaning, checking behavior, runtime behavior, and place in the complete program all fit the need.

## Keep execution at an owned boundary

Prepare and compose work before running it when the project's model supports that split. Otherwise keep the start of observable work clear in the control flow.

At the execution boundary:

- provide every required dependency and permission;
- decide who handles each expected failure and unexpected defect;
- own resource cleanup on success, failure, timeout, and cancellation;
- make concurrent work, ordering, and shutdown rules clear;
- expose only the result and effects that the caller is meant to observe.

Do not start work in a helper, constructor, import, callback setup, or background task when its owner cannot see, stop, await, or clean it up. If the host or framework controls execution, state that boundary and follow its lifetime rules.

## Prove and teach the result

Use the project itself as the final check:

1. Make the smallest disposable probe when a public contract or composition is still unclear.
2. Run the project's compiler, type checker, static analyzer, or contract checks where they can prove part of the model.
3. Test success, refusal, failure, cleanup, cancellation, ordering, and no unwanted effect where each guards a real unproved risk.
4. Check the complete path when the work crosses a process, storage, framework, or outside-system boundary.
5. Confirm that library use is public and matches the installed version.
6. Remove temporary probes and keep only evidence that belongs in the project.

Lead the handoff with the result. Then explain, in a few useful sentences:

- the effect model used for the work;
- the project or library sources that established it;
- why the chosen form keeps requirements, outcomes, and execution clear;
- how to follow the same source path for the next nearby question.

Keep the teaching proportional. Give the user a reusable way to think and discover without turning a small task into a long lesson.

Finish only when the important effects and execution boundaries are visible, the chosen form fits the existing project, static claims match their proof, runtime behavior has fitting checks, and every resource or running task has a clear owner.
