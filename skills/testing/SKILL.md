---
name: testing
description: Write maintainable software tests that exercise observable behavior. Use when you design, change, fix, review, or release software; choose test cases, runtime boundaries, levels, doubles, fixtures, or assertions; decide which tests to run; or fix a test suite that is weak, flaky, slow, hard to change, or gives a false picture. Choose the smallest runtime boundary that can expose the important risk, then verify the result and effects a real caller can observe.
---

# Testing

## Test important behavior

Run the software through a real boundary and observe its result, state, effects, or failure.

For each promise, state:

- What a real caller can observe
- Which inputs, states, effects, versions, machines, people, or outside systems may change the result
- What may go wrong and how much harm it may do
- Which runtime boundary and test can expose that risk

Keep a test only when it guards a named, important risk. Remove it when the risk is gone or another behavioral test gives the same useful signal.

## Know the real test setup

Before you write a test:

- Read the wanted behavior, its real callers, the code, and the nearest tests.
- Find the normal test commands, settings, test data, helpers, and `CI` jobs. `CI` means the shared automatic test jobs.
- Find who or what sees the promise. Find the first place where a wrong result can be seen.
- Run the nearest test that is already there when it gives a useful starting point.
- Use the test tools and style already in the project. Add a new tool only when the old tools cannot exercise a needed behavior and the new cost will be useful for a long time.

Judge a test by what it truly does, not by a folder or a name such as `unit`, `integration`, or `end-to-end`.

For a review or a search for the cause of a fault, inspect and report. Change tests only when the work also asks for a change.

## Know what to test and when

Add or keep a test when an important promise has meaningful risk and no existing behavioral test guards it. Give most care to:

- A known bug that gives a real bad example
- Input and output at run time, framework behavior, `serialization` (putting data into a form for storage or transfer), settings, or links between deployed parts
- Time, random values, work done at the same time, queues, retries, stopping work, or recovery
- An agreement between systems, clients, or versions that may change on their own
- Access rights, security, privacy, money, loss of data, support for old forms, or access for people with different needs
- Speed, use of memory or other resources, or an important user journey
- A rule over a large set of inputs where a few examples may miss important faults

Do not add a test only because lines changed. Do not repeat behavior already guarded at an equally useful boundary. For `generated output` (files made by a tool) or `vendor code` (code from outside the project), test only behavior the project owns and can observe. Static checks are brittle, difficult to maintain, and **extremely discouraged**.

Choose the time from the kind of work:

- For a bug, make the smallest bad example fail before the fix when that is useful. Keep the smallest runtime regression test that exposes the bug.
- For a change that should keep behavior the same, write a `characterization test` only for important behavior that a user can see and that no other behavioral test guards. This test records what the software does now.
- For a new feature, make its acceptance rule clear early. Add tests for the important runtime risks before other code needs the feature or before release.
- For a planned behavior change, change only the tests for that promise. Tests for other promises should stay the same.
- For a short study or trial, test as needed to learn. Keep a test only for behavior that will stay and remains at risk.

Work test-first when seeing the right failure will make the rule clearer or guard the fix. Do not do it only as a ceremony.

## Choose a small set of strong cases

Choose cases from the rule and the risk, not from the branches in the code:

- Put inputs and states into groups that should act in the same way. Pick one clear member of each important good and bad group.
- At a point where behavior changes, test just below it, at it, and just above it when those values exist.
- Use a `decision table` when several conditions join to give different results. The table shows each useful set of conditions and its result.
- Test allowed and forbidden moves between states. Test important orders of moves when past events change the result.
- Keep a real failure from use as a named example when the larger group behind it remains at risk.
- Test success, refusal, failure, recovery, and no unwanted effect only when each one guards a different risk.

Use a table of cases, sometimes called a `parameterized test`, when all cases state the same rule and each failure still shows which input was wrong. Split cases when their setup, action, meaning, or fault report is different.

Use a `property test` or `fuzz test` when one stable rule covers a very large input set. Such a test makes many inputs and looks for a bad example. Give it an `oracle`: a separate way to know the right answer. Make useful edge inputs, make a failure repeatable, and cut it down to a small bad example. These runs search for faults; they do not establish correctness for every input.

Do not test every mix of values without a reason based on risk. Pick the few cases most able to tell right behavior from a likely fault.

## Put the test at an observable boundary

Use the smallest runtime boundary that can exercise the promise and see its effect:

- Use a unit test for one local behavior.
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

Use code coverage to find behavior that may not be exercised. Do not use it as a mark of test quality. Much coverage can have weak assertions. Little coverage does not say which missing test matters.

Never make an assertion weaker, replace real behavior with a mock, add another try, or remove a test only to make all tests pass. First find whether the promise, the implementation, or the test is wrong.

## Run tests in the right order

1. State the promise, the conditions that affect it, and the risk that is left.
2. Choose the smallest useful cases and the runtime boundary that can expose the risk.
3. Run the new or nearest test. See the wanted failure when that is useful.
4. Make the smallest part of the behavior work. Run the close test again.
5. Run the tests for the nearby file, package, or part to find local breaks.
6. Go wider only over contracts, links, settings, and user journeys touched by the change.
7. Run the normal `CI` test command before you say the work is complete when you can.

Run fast tests close to every edit. Put slower and wider tests at commit, CI, before release, or at set times. Choose the place from their cost and how soon the team needs to know about a failure.

Read every failure. Tell apart a product fault, a test fault, a machine or setup fault, a flaky signal, and an old failure not caused by this work. Fix only what the work owns, but report every limit on trust.

## Keep only useful tests

- Repair real failures soon so people keep trust in the suite.
- Keep tests fast enough for the place where they run and small enough to point to a fault.
- Remove a test when its risk is gone or a stronger behavioral test gives the same signal.
- Fix test data and helpers when setup hides meaning or shared state ties tests together.
- Keep the suite easier to understand and change than the behavior it guards.

Report which runtime behavior is covered, what is still open, which test guards each important risk, the exact tests run and their results, and any gap in the tests or their setup. Never call a passing test a general guarantee. Never say a test ran when it did not.

Stop when every important promise is guarded at a meaningful runtime boundary, every chosen test can find a meaningful fault, and more cases would add no useful trust.
