---
name: point
description: Complete a bounded software-engineering change with a narrow blast radius and a local acceptance criterion. Use for isolated bug fixes, small features, configuration changes, targeted refactors, or a specific failing test. Layer it with line or plane when the focused change is part of broader domain-wide or cross-domain work.
---

# Point

Complete one small engineering outcome without expanding its scope unnecessarily.

## Work the change

1. Restate the requested outcome, the primary change surface, and a directly verifiable acceptance criterion.
2. Inspect the nearest entry point, call path, tests, and constraints. Expand the investigation only as far as the complete fix requires.
3. Implement the smallest complete change. Do not include opportunistic cleanup or unrelated refactoring.
4. Run the most focused useful validation, plus adjacent regression checks when the changed behavior can affect nearby paths.
5. Report the result, validation evidence, and any remaining risk or unverified condition.

## Layer with other skills

- Apply point to bounded work units even when line or plane also applies.
- Let line govern architectural invariants and consistency within a domain.
- Let plane govern cross-domain contracts, sequencing, and end-to-end acceptance.
- Explore once, implement once, and report once across all active skills; do not duplicate their workflows.
- Accumulate all applicable constraints. If they cannot be reconciled, surface the conflict and request a decision instead of silently overriding one.
