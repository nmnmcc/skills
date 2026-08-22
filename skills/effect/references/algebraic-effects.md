# Algebraic Effects

## Treat operations and handlers as a contract

Use this guide when a project has language-native algebraic effect operations and handlers, abilities, or an explicit free, freer, or extensible-effect encoding.

An algebraic effect describes computational behavior with named operations and, when the system states them, laws for those operations. Each operation has input and reply types. A computation requests an operation; a handler or interpreter gives that request meaning and decides what happens to the rest of the computation.

Do not apply this model merely because code uses a type named `Effect`, `IO`, or `ZIO`, a monad, dependency injection, exceptions, callbacks, or an ordinary service interface. Those forms may model effects without providing algebraic operations, handlers, or resumptions. Classical algebraic effects also do not cover every computational or control effect. Follow the exact system when it adds higher-order, scoped, or other extended effects.

In a native handler system, performing an operation may transfer control to a handler with a delimited continuation for the suspended computation. In an explicit free or freer encoding, the program normally builds a value that an interpreter consumes. Do not claim that an encoding captured the host stack or that a native handler built a syntax tree unless the implementation proves it.

## Learn the exact system

Treat the installed language, compiler, runtime, libraries, project code, and matching public sources as the truth.

1. Resolve the exact language, compiler, runtime, library, and target versions.
2. Find how the system declares effects and operations and whether it tracks effects in rows, sets, abilities, capabilities, or only at runtime.
3. Record each operation's identity, input, reply type, and any declared laws. Check whether effect instances or generative identities can distinguish operations with the same shape.
4. Read the handler form, including its value or return case, operation cases, forwarding rules, residual effects, and behavior for an unhandled operation.
5. Determine whether handler lookup and scope are lexical, dynamic, or expressed by explicit values, and whether handlers are deep or shallow.
6. Determine the continuation and answer types, whether a continuation may be resumed zero, one, or many times, and whether it may be stored, cloned, moved, or resumed across threads or callbacks.
7. Learn how failure, abort, cancellation, finalization, resources, concurrency, and foreign calls interact with suspension and resumption.
8. Read compiler checks, public signatures, implementation, and behavior tests for these rules. Do not copy the semantics of one algebraic effect system into another.

Effect tracking and effect handling are separate properties. A system may support handlers without proving statically that every operation is handled. When tracking is absent or partial, keep the possible unhandled outcome visible and verify it at runtime.

## Design the protocol before its handlers

State the effect protocol in terms of what callers may request, not how one handler happens to implement it:

- Give every operation the smallest input and reply contract that preserves its meaning.
- Keep the required effect, ability, row, or capability visible until the intended handler owns it.
- State algebraic laws only when the project or system actually requires them. Do not invent equations from an example implementation.
- Distinguish an operation returning a value from the whole handled computation returning its answer.
- Preserve effect polymorphism when callers are meant to choose or add handlers.

For each handler, state:

- how normal return is transformed;
- how every owned operation is interpreted;
- whether the suspended computation is stopped, resumed once, or resumed more than once;
- which operations are forwarded and which effects remain after handling;
- which new effects the handler performs or requires;
- which state, resources, and running work it owns; and
- what failure, abort, cancellation, and cleanup mean.

Choose handler nesting deliberately. Reordering handlers can change the meaning of state, failure, nondeterminism, logging, resource use, and other effects. Do not claim that a handler removes an effect when it only forwards, translates, or introduces another effect.

## Keep resumption honest

A resumption is control over the suspended rest of a computation. Its rules are part of the public contract, not an implementation detail.

- Resuming zero times stops or replaces the suspended path. Account for resources and cleanup held by that path. Some systems require every captured continuation to reach one terminal action, such as resume or discontinue, even when the computation is abandoned; learn and enforce the exact rule.
- A one-shot continuation must not be resumed twice. Do not clone or replay it through an internal or unsafe API. If the system also requires it to be consumed at least once, manually releasing one known resource does not prove that the whole captured stack and its finalizers were released.
- Resuming more than once replays the suspended path. Check repeated state changes, output, input, resource acquisition, finalizers, and outside calls before using a multi-shot continuation.
- A deep handler normally handles later operations after resumption again. A shallow handler normally requires the next handler to be supplied when resuming. Use the installed system's exact rule.
- A stored continuation may retain stack, state, resources, or other live data. Give it a bounded owner and release path.

Do not assume that a continuation may cross a thread, callback, signal, finalizer, foreign-function, or runtime boundary. Use such a path only when the matching public contract supports it.

## Keep interpretation at an owned boundary

A supported handler or interpreter may implement an operation with state, I/O, failure, scheduling, or another host behavior at the boundary the effect system defines. Normal handling, forwarding, legal resumption, and an official runner or adapter are not escape hatches.

The boundary becomes an escape hatch when it bypasses the project's effect protocol, effect tracking, handler scope, resumption rules, resource ownership, cancellation, or other claimed guarantees. Apply the main skill's approval rule to that bypass. Keep any approved adapter narrow, and restore the declared effect model immediately.

When a handler introduces other effects, keep them visible in its type or runtime contract. Handle them at an outer owned boundary or leave them as explicit requirements; do not hide them inside the handler.

## Prove the handler model

Use static and runtime checks for different claims:

1. Let the compiler or type checker verify operation inputs and replies, effect requirements, residual effects, answer types, and resumption types where the system can state them.
2. Exercise normal return and every owned operation case. Check the value passed back when the computation resumes.
3. Exercise forwarding and the unhandled-operation outcome. Confirm that a catch-all does not swallow effects owned by an outer handler.
4. Check nested handlers in the order that matters to the program.
5. Check zero, one, or multiple resumptions only where the system permits each case. Have a resumed computation perform another operation when that can distinguish deep from shallow handling.
6. Check cleanup when a handler returns without resuming, resumes, aborts, fails, or is cancelled. Check repeated I/O, state, and resource behavior when multi-shot resumption is allowed.
7. Exercise the real thread, callback, foreign-function, or runtime boundary when the result depends on that boundary.
8. When the protocol declares laws, use equational or property checks to show that each handler preserves them.

Do not call a program effect-safe because its examples run. Finish only when the declared operations and handler boundaries match the exact system, residual effects remain honest, every continuation follows its allowed lifetime and resumption count, and relevant runtime outcomes have direct evidence.
