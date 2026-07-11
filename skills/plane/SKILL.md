---
name: plane
description: Deliver one user or business outcome across two or more technical domains. Use when work connects boundaries such as UI, API, services, data, infrastructure, or observability and requires contract design, sequencing, integration, migration, or end-to-end validation. Layer it with point and line when those task shapes also apply.
---

# Plane

Complete one observable outcome across every technical boundary it traverses.

## Deliver the outcome

1. Define the user-observable outcome and a complete end-to-end acceptance scenario.
2. Trace the control flow and data flow across interfaces, services, storage, infrastructure, and operational surfaces that participate in the outcome.
3. Establish cross-boundary contracts before implementation, including types, APIs, state transitions, error semantics, and compatibility requirements.
4. Order the work for compatibility. Keep intermediate states buildable, testable, deployable, or reversible as the repository and delivery model require.
5. Connect the thinnest complete path first, then cover failure handling, permissions, observability, migrations, and recovery behavior that the outcome requires.
6. Validate contracts and integrations, plus at least one end-to-end scenario at the highest practical level.
7. Report each domain's delivery state, contract changes, end-to-end evidence, and release or migration risks.

## Layer with other skills

- Apply point to bounded work units within the outcome.
- Apply line wherever the outcome changes shared architecture or invariants inside a participating domain.
- Retain responsibility here for cross-domain contracts, implementation sequence, and the complete observable outcome.
- Explore once, implement once, and report once across all active skills; do not duplicate their workflows.
- Accumulate all applicable constraints. If they cannot be reconciled, surface the conflict and request a decision instead of silently overriding one.
