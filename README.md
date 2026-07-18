# Ironclad Online

The public, self-serve, paying-subscriber side of Ironclad Fitness --
completely separate database and Worker from Retro Fitness Fairless
Hills' own systems.

## Why this is a separate repo/database/Worker

Retro Fitness Fairless Hills runs its actual gym operations on ABC and
ClubOS -- always has. Separately, Bill approved a specific PT
training/intake tool (no cost to Retro) that lives in the pt-tools repo
against the retro-crm database. That tool is scoped narrowly to that
approved use.

This repo is the entirely separate, publicly-marketed, Square-billed
subscription product -- assessment funnel, self-serve program
selection, workout logging, AI coach. Online signups here are never
mixed with Retro's client data.

## What's here
- `assessment.html` -- public self-assessment + program recommendation + Square checkout links
- `client-login.html` / `client-app.html` -- subscriber login, self-serve program picker, workout logging, AI coach chat
- `admin-login.html` / `admin-dashboard.html` -- private, Ted-only view of online client signups
- `worker.js` -- Cloudflare Worker: assessment intake, Square webhook, client auth, AI coach
- `bundles-library.js` -- shared program catalog (same content as the Ironclad/pt-tools version, imported as a starting point; edits here don't sync back)

## Stack
- Cloudflare Worker (`worker.js`) + D1 (`ironclad-online-db`)
- Static frontend on GitHub Pages, auto-deployed on push to `main`
- Worker auto-deploys via `.github/workflows/deploy-worker.yml` (needs `CLOUDFLARE_API_TOKEN` repo secret)

## Secrets needed on the Worker (Cloudflare dashboard, not this repo)
- `SQUARE_ACCESS_TOKEN`, `SQUARE_WEBHOOK_SIGNATURE_KEY` -- new webhook subscription needed, pointed at this Worker's own URL
- `ANTHROPIC_KEY` -- for the AI coach
- `RESEND_KEY`, `MAIL_FROM` -- for welcome emails
- `JWT_SECRET` -- session token signing
