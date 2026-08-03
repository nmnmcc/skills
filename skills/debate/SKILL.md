---
name: debate
description: Improve a meaningful decision through direct dialogue between the main Codex agent and one independent subagent. Use across any domain when the user asks for a subagent debate or when another independent view could realistically change the next action enough to justify its cost. Let both agents form their own views before they exchange them; do not assign sides; resolve factual differences with evidence; act after the decision is resolved; and ask the user when a material disagreement remains.
---

# Debate

## Think with one independent peer

Use one subagent as a peer, not as an opponent, judge, or worker. Seek the best next action, not a win. Keep the main agent responsible for the question, the dialogue, the decision, and the result.

Hold one main rule:

> Use a debate because the user asks, or because one independent view could realistically change the next meaningful action enough to justify another agent.

Do not debate for ceremony or use dialogue in place of a direct check. Debate an open choice, assumption, tradeoff, or frame. Keep goals, limits, and values that the user has already settled out of dispute.

## Keep one question and two agents

- Treat the agent that owns the current task and will act after the debate as the main agent. A spawned agent can hold this role. Do not confuse being a subagent in a larger workflow with being the debate peer.
- Start exactly one subagent. Name it as the only debate peer in its brief and tell it not to delegate. Do not add fixed sides, a judge, a panel, or a vote.
- Keep both agents in study mode until the decision is resolved. Do not begin the disputed implementation while the dialogue is open.
- Let the subagent inspect sources and run safe, read-only checks. Do not let it edit artifacts, send messages to people, take external actions, or make the disputed change.
- If the current brief names you as the debate peer, do not start another debate or delegate any work. Form your own view and return it to the main agent.

The two agents share one purpose. Either may agree, disagree, combine ideas, or change the question when the old frame hides the real choice.

## Form independent views

1. State the open decision in neutral words. Include the shared result, relevant facts and sources, user limits, authority boundary, important unknowns, and the criteria that should guide the choice.
2. Before reading the peer's answer, form a short working view. Name the proposed next action, the strongest reason, the main doubt, and what could change the view.
3. Start a fresh subagent with only the context it needs when the tool supports this. Send the neutral brief and needed source locations, but do not send the main agent's working choice or argument.
4. Ask the peer for its current best action or new frame, decisive evidence, strongest risk or alternative, important uncertainty, and what could change its view.

Give the peer enough real context to judge the same question. Do not hide a user constraint to make the views look more independent.

## Exchange evidence and update the views

After both opening views exist:

1. Compare the proposed actions, facts, assumptions, values, risks, and unknowns. Find the few differences that can change the action.
2. Send the main agent's view and those differences to the same peer. Ask one focused question that gives the peer a fair chance to correct the main view.
3. Continue through focused follow-ups only while a reply can add evidence, answer an open question, expose an assumption, reframe the choice, or change a view.
4. Resolve a factual conflict with the closest useful source, inspection, calculation, or test. Share the result so both agents judge from the same evidence.
5. State every meaningful change of view. Concede a sound point without trying to preserve a side.
6. When the agents agree, name the strongest remaining objection and the condition that would make the shared answer wrong.

Do not treat confidence, length, forceful language, or agreement itself as evidence. Do not repeat a point only to create the look of a debate.

## Know when the decision is resolved

End the exchange when one of these states is real:

- Both agents support the same next action for compatible reasons and understand its main risk.
- A direct check settles the difference.
- A material difference remains because of a user value, priority, risk choice, authority question, or evidence that cannot be obtained now.
- A new reply would only repeat old information. Treat this as unresolved, not as agreement.

Do not count rounds. Continue only while another exchange can change the decision. If the peer lacks needed context, repair the brief once; if it still cannot form an independent view, do not call the decision resolved.

The main agent owns the final decision. Do not outsource it to the peer or follow agreement blindly.

## Act or ask

- When the decision is resolved, let only the main agent carry out the next action. Stay inside the user's original request, authority, and safety limits.
- When a material difference remains, do not take the disputed action. Ask the user for their view. State the shared ground, the main agent's current view and reason, the peer's different view and reason, and the exact choice that belongs to the user.
- When the resolved action needs authority or scope that the user did not give, ask before acting. Agreement between agents never grants permission.
- When subagents are unavailable, say that a real debate could not run and ask whether to continue with single-agent analysis. Never invent a peer or a dialogue.
- When the user asks only for deliberation, stop with the result of the debate instead of acting.

## Report the useful turn

Lead with the result or action. Then give a short account of:

- the choice the dialogue resolved;
- the evidence or idea that decided it;
- any important change in the main agent's view; and
- uncertainty that still matters.

Do not copy the full exchange into the main response unless the user asks for it. Never report agreement, execution, or evidence that did not exist.

## Work with other skills

Use `study` to build the neutral brief and check disputed facts. Use `just-do-it` to act once the choice is resolved. Keep all domain skills and task limits active; debate improves one decision inside the task and does not replace the task's real work or proof.
