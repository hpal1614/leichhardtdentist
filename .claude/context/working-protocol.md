# Working Protocol — how Claude & sub-agents operate on this project

The owner is non-technical and is relying on Claude as technical advisor/manager.
These rules exist to prevent hallucination, scope-creep, and breakage. They are
binding on the main assistant AND every sub-agent spawned for this project.

## The five hard rules

1. **Evidence over assumption.** Every factual claim about the code must cite a
   real `file:line` or a real command output (grep/ls/HTTP check). If something
   cannot be verified, say **"NOT VERIFIED"** and state what's needed — never
   guess, never invent file names, props, configs, routes, or behavior.

2. **Read before you change.** Read the actual code (not just file names) before
   proposing or making any edit. No edit based on a guess about what a file does.

3. **Investigate → Plan → Approve → Change → Verify.** Default to a read-only
   investigation. Present findings + a plan. Get the owner's explicit "go" before
   editing website code. After any change: run `npm run build` (must exit 0), and
   for any visible/behaviour change, verify in the browser or with a screenshot.

4. **Stay in scope.** Do only what was asked. No opportunistic refactors, no
   "while I'm here" changes, no deleting/overwriting anything you didn't create
   without flagging it first. Prefer reversible changes; note how to revert.

5. **Never publish without permission.** No git commit/push, no deploy, no
   sending email/external posts, no Sanity writes unless explicitly asked.

## Project-specific gates (in addition to the above)

- **AHPRA gate:** any change to user-visible copy, alt text, imagery, or meta
  tags must pass an AHPRA review (see `ahpra-compliance.md`) before shipping.
  When unsure whether copy is compliant, flag it — do not merge.
- **Sanity dual-write:** the live site reads copy from Sanity (project `ez5kieuq`)
  which overrides the static fallbacks per-field. Any copy fix must be applied to
  BOTH the fallback file AND Sanity, or it won't show.
- **Secrets:** `.env` is gitignored and must stay so. Never print secret values.
- **Media renames** (Cloudinary): verify the new URL returns 200 and confirm no
  other code/CMS references the old name before switching code.

## Sub-agent dispatch rules

- One clear concern per agent. Give it the five hard rules verbatim.
- Read-only unless the task explicitly authorises edits (and isolation is set).
- Require structured output with `file:line` evidence and severity.
- The main assistant synthesises; agents do not change shared files in parallel.

## Email / contact routing (current state)

- Public display address (shown on site): `leichhardtdentist@gmail.com`.
- Form delivery inbox (where leads go): `keebhutia872@gmail.com` (decoupled in
  `src/lib/practice.ts` as `ENQUIRY_DELIVERY_EMAIL`).
- Current sender: FormSubmit (plain emails, active). Planned: EmailJS for branded
  HTML emails — templates in `/email-templates/`.
