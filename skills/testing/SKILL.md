---
name: testing
description: Write good software tests after proving every rule that can be proved. Use when you design, change, fix, review, or release software; choose test cases, boundaries, levels, doubles, fixtures, assertions, or checks; decide which tests to run; or fix a test suite that is weak, flaky, slow, hard to change, or gives a false picture. Put rules first in the design, types, exhaustive checks, schemas, constraints, static analysis, or direct proof. Then test the important risk left where proof ends.
---

# Testing

## Prove what you can. Test what is left.

Testing is one part of making software right. It is not the source of all that is right. A test sees only the runs you choose. It cannot prove a rule for every allowed case.

First put every rule that can be proved into the software or its checks. Where you can, make a bad state impossible. Use the design, types, compiler checks, a check of every case, a `schema` (rules for the form of data), database rules, a `static check` (a check that does not run the software), or a direct proof.

Say that a rule is proved only if the proof covers every allowed case under clear conditions. A type, build, schema, or lint check may prove one part and leave another part open. Do not say it proves more than it does.

For each promise, state:

- What is proved, how it is proved, and under what conditions
- Where values, effects, versions, machines, people, or outside systems leave the proof
- What may go wrong in the gap and how much harm it may do
- Which test, if any, can show that risk

Every test kept over time must fill a named gap in proof and guard a separate, important risk. If a stronger proof later closes the gap, remove the test when it adds no more useful information.

## Know the real test setup

Before you write a test:

- Read the wanted behavior, its real callers, the code, the proof already in place, and the nearest tests.
- Find the normal test commands, settings, test data, helpers, and `CI` checks. `CI` means the shared automatic checks.
- Find who or what sees the promise. Find the first place where a wrong result can be seen.
- Run the nearest check that is already there when it gives a useful starting point.
- Use the test tools and style already in the project. Add a new tool only when the old tools cannot make a needed check and the new cost will be useful for a long time.

Judge a test by what it truly does, not by a folder or a name such as `unit`, `integration`, or `end-to-end`.

For a review or a search for the cause of a fault, inspect and report. Change tests only when the work also asks for a change.

## Know what to test and when

Add or keep a test when an important promise is not proved. Give most care to:

- A known bug that gives a real bad example
- Input and output at run time, framework behavior, `serialization` (putting data into a form for storage or transfer), settings, or links between deployed parts
- Time, random values, work done at the same time, queues, retries, stopping work, or recovery
- An agreement between systems, clients, or versions that may change on their own
- Access rights, security, privacy, money, loss of data, support for old forms, or access for people with different needs
- Speed, use of memory or other resources, or an important user journey
- A rule over a large set of inputs when there is no full proof

Do not add a test only because lines changed. Do not repeat a rule already proved by the compiler, a type, a schema, or a data rule. For a document, code form, `generated output` (files made by a tool), or `vendor code` (code from outside the project), it is often better to check the source rule or generator directly.

Choose the time from the kind of work:

- For a bug, make the smallest bad example fail before the fix when that is useful. If the fix proves that the whole bad state is impossible, keep the proof instead of a test that says the same thing. If not, keep the smallest useful test for the bug.
- For a change that should keep behavior the same, write a `characterization test` only for important behavior that a user can see and that no other check proves. This test records what the software does now.
- For a new feature, make its acceptance rule clear early. Prove what you can in the design. Add tests for the gaps before other code needs the feature or before release.
- For a planned behavior change, change only the tests for that promise. Tests for other promises should stay the same.
- For a short study or trial, test as needed to learn. Keep a test only for behavior that will stay and is not proved.

Work test-first when seeing the right failure will make the rule clearer or guard the fix. Do not do it only as a ceremony.

## Choose a small set of strong cases

Choose cases from the rule and the risk, not from the branches in the code:

- Put inputs and states into groups that should act in the same way. Pick one clear member of each important good and bad group.
- At a point where behavior changes, test just below it, at it, and just above it when those values exist.
- Use a `decision table` when several conditions join to give different results. The table shows each useful set of conditions and its result.
- Test allowed and forbidden moves between states. Test important orders of moves when past events change the result.
- Keep a real failure from use as a named example when the larger group behind it is still not proved.
- Test success, refusal, failure, recovery, and no unwanted effect only when each one guards a different risk.

Use a table of cases, sometimes called a `parameterized test`, when all cases state the same rule and each failure still shows which input was wrong. Split cases when their setup, action, meaning, or fault report is different.

Use a `property test` or `fuzz test` when one stable rule covers a very large input set. Such a test makes many inputs and looks for a bad example. Give it an `oracle`: a separate way to know the right answer. Make useful edge inputs, make a failure repeatable, and cut it down to a small bad example. These runs search for faults; they do not prove the rule.

Do not test every mix of values without a reason based on risk. Pick the few cases most able to tell right behavior from a likely fault.

## Put the test where proof ends

Use the smallest boundary that goes past the unproved condition and can see its effect:

- Use a unit test for one local behavior that is not proved in another way.
- Use a component or integration test for work with a framework, database, file system, process, or several real parts.
- Use a contract test where parts that change on their own must agree on data, errors, order, or support for old forms.
- Use an end-to-end test for deployed links or an important result that no smaller test can show.
- Use a `benchmark` or load test for speed and capacity, a `fault-injection test` that forces a fault, or an `exploratory test` guided by a person when normal examples cannot show the risk.

Use more than one test level only when each level fills a different gap. Choose the faster, smaller test when it gives the same trust and points to the fault as well. Keep a wide test when only it can see the real promise and its cost is fair. Do not follow a fixed count or shape of test levels.

A unit test with a `mock` (a made-up part used in place of a real part) cannot show that data conversion, a query, deployment, or an outside contract is right.

## Test what a user can see

Use the public interface, or the same path as a real caller, when you can. Check the result, saved state, lasting effects, meaning of an error, or that an effect did not happen. Check what happened more often than how the code got there.

Check a call or other contact between parts only when that contact is itself the promise. It may be a needed notice, a forbidden write, a call limit, an order, or a retry. Do not test private helpers, calls that are only an inner detail, inner state, or component layout only because they are easy to reach.

A code change that keeps the promise the same should most often leave the test body the same. If harmless inner movement breaks many tests, move those tests to the boundary where the behavior can be seen.

## Make each test clear and strong

For each test:

1. Name the condition, action, and wanted result. A failure report should say what broke.
2. Set up the smallest useful state. Show every fact needed to understand the case and no fact that takes attention away.
3. Do one main action through the chosen boundary.
4. Check the exact result and important effects. Use a way of knowing the right answer that is separate from the code under test.
5. Make the wanted value, real value, input, and useful fault facts easy to see.
6. Make sure the test fails for the bad example or likely fault it is meant to find.

Use Given/When/Then or Arrange/Act/Assert when it makes cause and effect clear. One test should explain one whole behavior. It does not have to have only one check. Keep several checks together when they describe one result. Split different causes or promises.

Keep test code straight and plain. Do not use loops, branches, worked-out wanted values, or clever helpers when fixed examples are clearer. A little repeated setup is good when it keeps the important state in view. Make a helper only to hide setup that does not matter or to give a clear name to a business or product idea.

Use a `snapshot` only when the exact full output is the promise. Keep it small. Read every change to it with the same care as a check written by hand.

## Use real parts and test doubles with care

A `test double` is a part used in place of a real part. Use the real part when it is fast, safe, simple to make, and gives the same result each time. Real behavior is better evidence than a copy of it.

When the real part is slow, has a high cost, may do harm, is not present, gives changing results, or cannot make a rare failure:

- Use a `fake` when you need a working but simpler form of a part you own.
- Use a `stub` when the case needs one small, fixed answer.
- Use a `mock` when the calls are the promise or no result or state can be seen. A mock records or checks calls.
- Put the double at a stable boundary you own. Do not put it around private helpers or plain values.

Keep a test with the real contract or real parts where a double may get out of step. Do not use the same wrong idea to make a mock and to say that both sides of a contract are right.

## Keep the result the same every time

Take control of every input that can change the result. Do not depend on test order, shared changing setup, the wall clock, random values you do not control, live services, or things left by another test.

- Take control of clocks, random sources, names, work order, and points of failure.
- Give each test its own short-lived state. Clean up what it makes.
- Wait for work that is not immediate. Use an event or a check with a time limit for a result that can be seen. Do not sleep for a guessed time.
- Save and use again the input or seed from a failed generated case.
- Keep tests run at the same time from using the same names, ports, accounts, or records.

A `flaky test` can pass or fail with the same code. Treat it as a fault in the test signal. Run it again to learn, not to turn a failure into a pass. Find the hidden input or the `race condition` (a fault caused by the order or time of work). Take the test out of the main run for a short time only when that is needed to make the suite useful again. Name the person who will repair it and how.

## Check the test itself

Read each new or changed test as carefully as product code. Ask if it is right, useful, simple, and able to fail when the product is wrong.

For a test made for a bug, see it fail for the right reason before the fix when you can. For an important or doubtful test, remove or change the guarded behavior, put in a likely fault, or use `mutation testing`. Mutation testing makes small false changes to the code and checks if tests find them. First make sure the change truly breaks the promise. If the test still passes, it does not guard that promise.

Use code coverage to find behavior whose proof is not known. Do not use it as a mark of test quality. Much coverage can have weak checks. Little coverage does not say which missing test matters.

Never make a check weaker, replace real behavior with a mock, add another try, or remove a test only to make all tests pass. First find whether the promise, the proof, or the test is wrong.

## Run checks in the right order

1. State the promise, its proof, the conditions of that proof, and the risk that is left.
2. Choose the smallest useful cases and the boundary that can show the gap.
3. Run the compiler, type, schema, data-rule, static, or formal checks that carry the proof.
4. Run the new or nearest test. See the wanted failure when that is useful.
5. Make the smallest part of the behavior work. Run the close check again.
6. Run the tests for the nearby file, package, or part to find local breaks.
7. Go wider only over contracts, links, settings, and user journeys touched by the change.
8. Run the normal `CI` command before you say the work is complete when you can.

Run fast checks close to every edit. Put slower and wider checks at commit, CI, before release, or at set times. Choose the place from their cost and how soon the team needs to know about a failure.

Read every failure. Tell apart a product fault, a test fault, a machine or setup fault, a flaky signal, and an old failure not caused by this work. Fix only what the work owns, but report every limit on trust.

## Keep only useful tests

- Repair real failures soon so people keep trust in the suite.
- Keep tests fast enough for the place where they run and small enough to point to a fault.
- Remove a test when proof closes its gap, its risk is gone, or a stronger test gives the same signal.
- Fix test data and helpers when setup hides meaning or shared state ties tests together.
- Keep the suite easier to understand and change than the behavior it guards.

Report what is proved, what is still open, which test fills each important gap, the exact checks run and their results, and any gap in the tests or their setup. Never call a passing test a general proof. Never say a check ran when it did not.

Stop when every important promise is proved or guarded where proof ends, every chosen test can find a meaningful fault, and more cases would add no useful trust.
