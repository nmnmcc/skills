---
name: line
description: Make coherent changes across one technical domain while preserving its architecture and invariants. Use for work spanning multiple components within frontend, backend, data, infrastructure, testing, security, or another single domain, including systematic refactors, migrations, consistency work, and domain-wide reviews. Layer it with point or plane when those task shapes also apply.
---

# Line

Keep work across one technical domain coherent, compatible, and consistent.

## Evolve the domain

1. Define the domain boundary, entry points, shared abstractions, core invariants, and established conventions.
2. Map the affected components and dependencies. Identify duplicated implementations, divergent patterns, and compatibility requirements.
3. Choose one domain-wide approach and define the migration order, including any temporary transition state.
4. Preserve consistency in interfaces, error handling, naming, and testing strategy throughout the domain.
5. Validate representative components, shared contracts, and the relevant domain-wide tests or static checks.
6. Report the governing approach, coverage, migration state, validation evidence, and intentional exceptions.

## Layer with other skills

- Apply line whenever a change must preserve coherence across a technical domain, including a domain participating in plane work.
- Let point govern the scope and verification of individual work units.
- Let plane govern cross-domain contracts, sequencing, and end-to-end acceptance.
- Explore once, implement once, and report once across all active skills; do not duplicate their workflows.
- Accumulate all applicable constraints. If they cannot be reconciled, surface the conflict and request a decision instead of silently overriding one.
