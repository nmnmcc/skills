# Cats Effect

## Think in Cats Effect

Use this guide for Cats Effect 3. Treat Cats Effect as the language of the whole program, not as a wrapper around work controlled in another way.

Describe concrete work as `IO[A]` values. `A` states the success value. It does not state the error type: `IO` normally reports failures as `Throwable`, and a running fiber may succeed, fail, be canceled, or never finish. Use `Outcome` when code must observe that full result. Write polymorphic code as `F[_]` only when callers need that freedom. Require the weakest Cats Effect type class that states the real capability. Keep application code concrete in `IO` when a generic effect adds no useful contract.

Start from the meaning of the work. Ask:

- What program are we describing?
- Which values, services, and outside systems does it need?
- Which successes, failures, and cancelations must callers handle?
- Which resources and fibers need an owner?
- Which work may block, wait, overlap, or stop?
- Where does description become execution?
- Which exact source proves the model and the code?

Build every supported capability inside Cats Effect from the start. Suspend synchronous, blocking, interruptible, and callback work with the matching public construction. Do not first run a `Future`, callback, raw thread, resource, or host effect and wrap its result later. Treat direct `unsafeRun*` calls, raw runtime use, unmanaged threads or resources, and control passed to an impure host as escape hatches. Use `IOApp` or the framework's owned Cats Effect entry point for normal application execution. When an impure callback must submit effects, `Dispatcher` is the scoped Cats Effect adapter, but its unsafe submission methods still mark an escape boundary. Apply the main skill's approval rule before adding that boundary.

## Carry one model through the whole workflow

Use Cats Effect thinking from the first question to the final proof:

1. Study the real need and the current program.
2. Choose concrete `IO` or a polymorphic `F[_]` with the smallest needed capability.
3. Model delay, failure, cancelation, resources, time, state, and concurrency before choosing API names.
4. Build by composing public Cats Effect values.
5. Keep every resource and fiber inside a visible lifetime.
6. Execute at `IOApp`, an owned framework edge, or an explicitly approved narrow adapter.
7. Verify types, behavior, finalization, cancelation, scheduling, and the final result together.
8. Teach the small part of the model that makes the solution reusable.

Do not let Cats Effect become a local shell around a program controlled by `Future`, blocking calls, callbacks, or raw executors. Use an effect-native adapter when one exists. If approved non-effectful contact is unavoidable, keep it narrow and bring its result, failure, cancelation, and cleanup back into Cats Effect at once.

## Learn the exact Cats Effect in front of you

Treat the project and its resolved artifacts as the truth. This guide describes Cats Effect 3. If the resolved major version is 2, stop using this guide as API authority and inspect the matching Cats Effect 2 sources and migration material.

1. Read the nearest build definition, project settings, dependency declarations, resolved dependency report, Scala version, and platform target.
2. Record each relevant Cats Effect organization, artifact, resolved version, Scala binary suffix, and JVM, Scala.js, or Scala Native target.
3. Resolve binary and source artifacts with the project's build tool or dependency manager. Do not assume one cache layout.
4. Read public Scaladoc, signatures, package aliases, and module metadata before implementation.
5. Read existing project code to learn its `IO`, type class, `Resource`, error, state, fiber, and test patterns. Check those patterns against the resolved version.
6. Use `cats-effect-kernel` for the capability and lifetime model, `cats-effect` for `IO` and its runtime, and `cats-effect-std` for standard concurrent tools. Use laws and testkit modules only when the work needs them.
7. Read matching source JARs, implementations, laws, and tests as needed.
8. When fuller source is needed, use a local checkout or inspect the [official Cats Effect repository](https://github.com/typelevel/cats-effect) at the matching release or commit. Do not add an official module only because this guide names it. Use only modules the real need justifies. If exact source cannot be reached, say what evidence is available and what remains uncertain.

## Follow the need through the source

Search by meaning before searching by a remembered method name.

- Start from `IO` or the smallest relevant public capability, such as `MonadCancel`, `Spawn`, `Concurrent`, `Temporal`, `Sync`, or `Async`.
- Read the public signature and Scaladoc first. Understand what success, failure, cancelation, finalization, and blocking mean to callers.
- Follow the definition into implementation only far enough to understand runtime meaning and important conditions.
- Read the nearest laws, behavior tests, examples, and compiler-checked uses.
- Follow related public definitions until the construction fits the whole program, not only the local expression.
- Read change history when resolved code, project code, documentation, and remembered use disagree.

Give each source its proper role: public types and Scaladoc define supported use, implementation explains runtime meaning, and laws and tests provide behavior and boundary evidence. Never import an internal package or copy private runtime code merely because reading it was useful. Do not stop at the first expression that compiles. Confirm that its type contract, runtime behavior, cancelation behavior, resource lifetime, and place in the complete program all fit the need.

## Use the whole Cats Effect language

Before inventing a helper, wrapper, local protocol, or new dependency, search the resolved public Cats Effect modules for an existing expression of the same idea.

Prefer the library's own `IO`, type class, `Resource`, `Outcome`, clock, fiber, state, coordination, and concurrency models when they preserve the needed meaning. Use `Ref` and `Deferred` for effectful state and signals, and use matching `cats-effect-std` tools such as queues, semaphores, supervisors, and dispatchers when their contracts fit. Keep resource and fiber ownership explicit. Prefer scoped or joined work over detached fibers. Make shutdown behavior clear for success, failure, cancelation, and application exit.

Use the matching public construction for delayed work, blocking calls, interruptible blocking calls, asynchronous registration, and foreign futures. Preserve cancelation and provide a finalizer when the foreign operation supports one. Do not use a broad `delay` or `blocking` block to hide a workflow.

Keep errors honest. An `IO[A]` type shows `A`, not its possible `Throwable` failures. State expected domain refusal in the project's chosen value or error model, and keep unexpected failure and cancelation behavior clear at the interface.

Use `Dispatcher` only when an impure host must call into Cats Effect and the user has approved that escape boundary. Keep it inside its `Resource` lifetime, choose its supported mode from the resolved API, and define ownership of submitted work, cancelation, shutdown, and reported failure.

Do not reduce Cats Effect to the small part already familiar to you. Do not generalize every function to `F[_]`, require `Async` for work that needs less, or run inner effects merely to make a local type easier.

For FS2, http4s, doobie, or another Typelevel library, inspect that library's resolved public sources and lifecycle rules. Do not treat this Cats Effect guide as its API guide.

## Prove and teach the result

Use the project itself as the final check:

1. Make the smallest disposable compile probe when a public type or composition is unclear.
2. Run the project's compiler and the closest meaningful behavior and law tests.
3. Check success, failure, cancelation, finalizers, fiber ownership, ordering, blocking, and shutdown where they guard real risk.
4. Use Cats Effect testkit for controlled time or scheduling only when its model fits the code. Check real runtime behavior when external I/O, executors, or schedulers matter.
5. Confirm that every import and artifact is public, needed, and matches the resolved version and platform.
6. Confirm that execution occurs only at an owned edge and every escape hatch has explicit user approval and one narrow adapter.
7. Remove temporary probes and keep only evidence that belongs in the project.

Lead the handoff with the result. Then explain, in a few useful sentences:

- the Cats Effect model used for the work;
- the exact artifacts, sources, laws, and tests that established it;
- why the chosen composition keeps its meaning through the whole program;
- how to follow the same source path for the next nearby question.

Keep the teaching proportional. Give the user a reusable way to think and discover without turning a small task into a long lesson.

Finish only when the public API matches the resolved Cats Effect 3 version, `IO` or each `F[_]` constraint states the intended capability, relevant checks pass, every resource and fiber has an owner, and every approved escape hatch is a deliberate, narrow, verified boundary.
