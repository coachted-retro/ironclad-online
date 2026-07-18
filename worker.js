// Ironclad Online Worker
// The public, paying-subscriber side of Ironclad Fitness -- completely
// separate database and Worker from Retro Fitness Fairless Hills'
// operations (which run on ABC/ClubOS, plus a separate PT tool Bill
// approved that lives in the pt-tools/retro-crm system). Nothing here
// touches Retro's client data, and nothing there touches this.

const ok = (data, cors) => new Response(JSON.stringify({ ok: true, ...data }), { status: 200, headers: cors });
const bad = (msg, cors) => new Response(JSON.stringify({ ok: false, error: msg }), { status: 200, headers: cors });

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function makeToken(id, email, role, secret) {
  const payload = btoa(JSON.stringify({ id, email, role, exp: Date.now() + 86400000 * 30 }));
  const sig = (await sha256(payload + secret)).slice(0, 16);
  return payload + '.' + sig;
}
async function verifyToken(token, secret) {
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = (await sha256(payload + secret)).slice(0, 16);
  if (sig !== expected) return null;
  try { const d = JSON.parse(atob(payload)); if (d.exp < Date.now()) return null; return d; } catch (e) { return null; }
}

// ── SQUARE HELPERS ─────────────────────────────────────────────────
async function verifySquareSignature(payload, key, signatureB64) {
  if (!signatureB64) return false;
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuf = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(payload));
  const computedB64 = btoa(String.fromCharCode(...new Uint8Array(sigBuf)));
  if (computedB64.length !== signatureB64.length) return false;
  let diff = 0;
  for (let i = 0; i < computedB64.length; i++) diff |= computedB64.charCodeAt(i) ^ signatureB64.charCodeAt(i);
  return diff === 0;
}
async function squareGetCustomer(customerId, env) {
  if (!customerId || !env.SQUARE_ACCESS_TOKEN) return null;
  const r = await fetch(`https://connect.squareup.com/v2/customers/${customerId}`, {
    headers: { 'Authorization': 'Bearer ' + env.SQUARE_ACCESS_TOKEN, 'Square-Version': '2026-05-20' }
  });
  const d = await r.json();
  return d.customer || null;
}

// ── AI COACH ─────────────────────────────────────────────────────
async function generateAICoachMessage(env, client, workoutInfo) {
  if (!env.ANTHROPIC_KEY || !client) return;
  try {
    const recentWorkouts = await env.DB.prepare(
      'SELECT log_date, routine_label FROM workout_logs WHERE client_id=? ORDER BY log_date DESC LIMIT 6'
    ).bind(client.id).all();
    const history = (recentWorkouts.results || [])
      .map(w => `${w.log_date}: ${w.routine_label}`).join('\n') || 'no prior history on file';
    const clientName = ((client.first_name || '') + ' ' + (client.last_name || '')).trim() || 'there';

    const sys = `You are the AI training assistant for Ironclad Fitness. A client just logged a workout. Write ONE short message (2-4 sentences max) reacting to it -- genuine and specific, never generic filler. If their recent history shows good consistency, acknowledge it. If there's a gap, be warm and encouraging rather than critical. Never invent facts you weren't given. No "As an AI" disclaimer -- sender identity is shown separately in the app.`;
    const user = `Client: ${clientName}\nGoal: ${client.goal_primary || 'not specified'}\nJust logged: "${workoutInfo.routine_label}" on ${workoutInfo.log_date}\n\nRecent workout history (most recent first):\n${history}`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 300, system: sys, messages: [{ role: 'user', content: user }] })
    });
    const data = await resp.json();
    const text = (data.content && data.content[0] && data.content[0].text || '').trim();
    if (!text) return;
    await env.DB.prepare('INSERT INTO portal_messages (client_id,coach_name,sender,body) VALUES (?,?,?,?)')
      .bind(client.id, 'Ironclad AI Coach', 'coach', text).run();
  } catch (e) { /* best-effort */ }
}

// ── DRIP CAMPAIGN ────────────────────────────────────────────────
// Five touches over three weeks, for prospects who took the
// assessment but haven't converted (no active subscription_plan set)
// yet. Tone throughout: confidence and trust first, persuasion last --
// never a countdown/urgency trick, always a real, low-pressure path to
// actually enrolling by the final email.
const DRIP_STAGES = [
  { day: 0, subject: (n) => `Welcome, ${n} — here's what happens next` },
  { day: 3, subject: () => `You already did the hard part` },
  { day: 7, subject: () => `The real reason most plans don't work` },
  { day: 14, subject: (n) => `Still thinking it over, ${n}?` },
  { day: 21, subject: () => `No pressure — just leaving the door open` }
];

function buildDripEmail(stage, client) {
  const name = client.first_name || 'there';
  const goal = client.goal_primary || 'your goals';
  const program = client.onboarding_json ? (JSON.parse(client.onboarding_json).answers?.recommended_bundle_name || null) : null;

  const bodies = [
    // Day 0 -- warm welcome, sets expectation of a real human, not just an inbox
    `<p>Hey ${name},</p>
     <p>Thanks for taking the assessment. Based on what you shared, we matched you toward <b>${goal}</b>${program ? ` with a program built around <b>${program}</b>` : ''} — that's already sitting in your results.</p>
     <p>A real coach reviews every assessment personally, not just an algorithm. If anything about your results raises a question, just reply to this email — it comes straight to us.</p>
     <p>Talk soon,<br>Coach Ted</p>`,
    // Day 3 -- pure encouragement, zero pitch
    `<p>Hey ${name},</p>
     <p>Just a quick one — most people never get past thinking about it. You already filled out a real assessment and got a real plan back. That's further than most people ever go.</p>
     <p>Whatever pace you take from here, that's a genuine head start, not nothing.</p>
     <p>Coach Ted</p>`,
    // Day 7 -- value/education touch, builds trust through substance
    `<p>Hey ${name},</p>
     <p>Quick thing worth knowing: most programs fail people not from lack of effort, but because they treat every calorie the same. Protein, carbs, and fat each do a completely different job in your body — get that balance wrong and it doesn't matter how hard you train.</p>
     <p>That's exactly why your plan pairs training with real nutrition guidance, not a generic calculator. It's built to actually work with how your body responds, not against it.</p>
     <p>Coach Ted</p>`,
    // Day 14 -- soft check-in, addresses hesitation directly and honestly
    `<p>Hey ${name},</p>
     <p>Still thinking it over? That's completely normal — starting something new is genuinely the hardest part, harder than any workout in the program.</p>
     <p>If something specific is holding you back — time, cost, not knowing where to start — just reply and tell me. I'd rather answer the real question than have it be the reason you don't start.</p>
     <p>Coach Ted</p>`,
    // Day 21 -- final touch, low-pressure but with a clear, easy path to act
    `<p>Hey ${name},</p>
     <p>Last note from me on this — I don't want to keep filling your inbox. The door's open whenever you're ready, no expiration on that.</p>
     <p>Your plan is still saved and ready to go whenever you want to start:</p>
     <p><a href="https://myironcladfit.com/assessment.html" style="display:inline-block;background:#1B4D8C;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700">See My Plan Again &rarr;</a></p>
     <p>Rooting for you either way,<br>Coach Ted</p>`
  ];
  return bodies[DRIP_STAGES.indexOf(stage)];
}

async function sendDripCampaign(env) {
  if (!env.RESEND_KEY || !env.DB) return;
  try {
    const rows = await env.DB.prepare(`
      SELECT * FROM clients
      WHERE status = 'prospect' AND (subscription_plan IS NULL OR subscription_plan = '')
        AND email IS NOT NULL AND drip_stage < ${DRIP_STAGES.length}
    `).all();
    const now = new Date();

    for (const client of (rows.results || [])) {
      try {
        const stage = DRIP_STAGES[client.drip_stage];
        const createdAt = new Date(client.created_at);
        const daysSinceSignup = Math.floor((now - createdAt) / 86400000);
        if (daysSinceSignup < stage.day) continue;
        if (client.drip_last_sent) {
          const daysSinceLastSend = Math.floor((now - new Date(client.drip_last_sent)) / 86400000);
          if (daysSinceLastSend < 1) continue; // never double-send same day, safety net
        }

        const html = `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;font-size:15px;line-height:1.6;color:#15171A">${buildDripEmail(stage, client)}</div>`;
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + env.RESEND_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: env.MAIL_FROM || 'onboarding@resend.dev', to: [client.email], subject: stage.subject(client.first_name), html })
        });
        await env.DB.prepare('UPDATE clients SET drip_stage = drip_stage + 1, drip_last_sent = ? WHERE id = ?')
          .bind(now.toISOString(), client.id).run();
      } catch (e) { /* one client's failure shouldn't block the rest of the batch */ }
    }
  } catch (e) { /* best-effort nightly job */ }
}

export default {
  async fetch(request, env, ctx) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(request.url);
    const SECRET = env.JWT_SECRET || 'ironclad-online-dev-secret';

    try {
      if (url.pathname === '/health') return ok({ db: !!env.DB }, cors);

      // ── PUBLIC ASSESSMENT INTAKE ─────────────────────────────
      if (url.pathname === '/assessment/submit' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const firstName = (b.first_name || '').trim();
        if (!firstName) return bad('Name is required', cors);
        if (!b.phone && !b.email) return bad('Phone or email is required', cors);
        const now = new Date().toISOString();
        const insertRes = await env.DB.prepare(
          `INSERT INTO clients (first_name,last_name,email,phone,status,goal_primary,notes,onboarding_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)`
        ).bind(
          firstName, b.last_name || null, b.email || null, b.phone || null, 'prospect', b.goal_primary || null,
          [b.age ? `Age: ${b.age}` : null, b.sex ? `Sex: ${b.sex}` : null, b.height ? `Height: ${b.height}` : null,
           b.weight_lbs ? `Weight: ${b.weight_lbs} lbs` : null, b.weight_trend ? `Weight trend: ${b.weight_trend}` : null,
           b.equipment_access ? `Equipment: ${b.equipment_access}` : null,
           b.experience ? `Experience: ${b.experience}` : null, b.days_per_week ? `Availability: ${b.days_per_week}` : null,
           (b.parq_flags && b.parq_flags.length) ? `PAR-Q flags: ${b.parq_flags.join('; ')}` : null,
           b.injuries ? `Injuries: ${b.injuries}` : null, b.dietary ? `Dietary: ${b.dietary}` : null,
           b.tried_before ? `Tried before: ${b.tried_before}` : null,
           b.training_preference ? `Training preference: ${b.training_preference}` : null,
           b.zip ? `Zip: ${b.zip}` : null,
           (b.training_preference === 'in_person') ? `In-person eligible: ${b.in_person_eligible ? 'yes' : 'no'}` : null,
           b.commitment_level ? `Commitment level: ${b.commitment_level}` : null].filter(Boolean).join('\n'),
          JSON.stringify({ answers: b }), now, now
        ).run();
        return ok({ id: insertRes.meta?.last_row_id, submitted: true }, cors);
      }

      // ── SQUARE WEBHOOK ────────────────────────────────────────
      if (url.pathname === '/webhooks/square' && request.method === 'POST') {
        if (!env.DB) return new Response('No DB', { status: 500 });
        if (!env.SQUARE_WEBHOOK_SIGNATURE_KEY) return new Response('Webhook not configured', { status: 500 });
        const rawBody = await request.text();
        const signature = request.headers.get('x-square-hmacsha256-signature') || '';
        const notificationUrl = url.origin + '/webhooks/square';
        const valid = await verifySquareSignature(notificationUrl + rawBody, env.SQUARE_WEBHOOK_SIGNATURE_KEY, signature);
        if (!valid) return new Response('Invalid signature', { status: 401 });

        let event;
        try { event = JSON.parse(rawBody); } catch (e) { return new Response('Bad JSON', { status: 400 }); }

        try {
          if (event.type === 'invoice.payment_made') {
            const invoice = event.data && event.data.object && event.data.object.invoice;
            const customerId = invoice && invoice.primary_recipient && invoice.primary_recipient.customer_id;
            const customer = await squareGetCustomer(customerId, env);
            if (customer && customer.email_address) {
              const email = customer.email_address.toLowerCase().trim();
              const firstName = customer.given_name || 'there';
              const lastName = customer.family_name || null;
              const now = new Date().toISOString();
              let client = await env.DB.prepare('SELECT id FROM clients WHERE email=?').bind(email).first();
              let clientId;
              if (client) {
                clientId = client.id;
                await env.DB.prepare('UPDATE clients SET status=?, updated_at=? WHERE id=?').bind('active', now, clientId).run();
              } else {
                const ins = await env.DB.prepare(
                  `INSERT INTO clients (first_name,last_name,email,status,created_at,updated_at) VALUES (?,?,?,?,?,?)`
                ).bind(firstName, lastName, email, 'active', now, now).run();
                clientId = ins.meta.last_row_id;
              }
              const tempPassword = Math.random().toString(36).slice(-10);
              const hash = await sha256(tempPassword);
              const existingAuth = await env.DB.prepare('SELECT id FROM client_auth WHERE client_id=?').bind(clientId).first();
              if (existingAuth) {
                await env.DB.prepare('UPDATE client_auth SET password_hash=?, must_change_password=1, active=1 WHERE client_id=?').bind(hash, clientId).run();
              } else {
                await env.DB.prepare('INSERT INTO client_auth (client_id,email,password_hash,must_change_password,active) VALUES (?,?,?,1,1)').bind(clientId, email, hash).run();
              }
              if (env.RESEND_KEY) {
                const html = `<div style="font-family:sans-serif;max-width:480px;margin:0 auto">
                  <h2 style="color:#1B4D8C;font-family:Oswald,sans-serif">Welcome to Ironclad, ${firstName}!</h2>
                  <p>Your membership is active. Here's how to get started:</p>
                  <p><a href="https://myironcladfit.com/client-login.html" style="display:inline-block;background:#1B4D8C;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700">Sign In &rarr;</a></p>
                  <table style="margin-top:16px;font-size:14px"><tr><td style="padding:4px 12px 4px 0;color:#6B7280">Login email</td><td><b>${email}</b></td></tr><tr><td style="padding:4px 12px 4px 0;color:#6B7280">Temporary password</td><td><b>${tempPassword}</b></td></tr></table>
                  <p style="font-size:13px;color:#6B7280;margin-top:12px">You'll be asked to set your own password the first time you sign in.</p></div>`;
                try {
                  await fetch('https://api.resend.com/emails', {
                    method: 'POST', headers: { 'Authorization': 'Bearer ' + env.RESEND_KEY, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ from: env.MAIL_FROM || 'onboarding@resend.dev', to: [email], subject: 'Welcome to Ironclad — your login is ready', html })
                  });
                } catch (e) {}
              }
            }
          } else if (event.type === 'subscription.updated') {
            const sub = event.data && event.data.object && event.data.object.subscription;
            if (sub && sub.status) {
              const customer = await squareGetCustomer(sub.customer_id, env);
              if (customer && customer.email_address) {
                const email = customer.email_address.toLowerCase().trim();
                const client = await env.DB.prepare('SELECT id FROM clients WHERE email=?').bind(email).first();
                if (client) {
                  if (sub.status === 'CANCELED') {
                    await env.DB.prepare('UPDATE clients SET status=? WHERE id=?').bind('canceled', client.id).run();
                    await env.DB.prepare('UPDATE client_auth SET active=0 WHERE client_id=?').bind(client.id).run();
                  } else if (sub.status === 'PAUSED') {
                    await env.DB.prepare('UPDATE clients SET status=? WHERE id=?').bind('paused', client.id).run();
                    await env.DB.prepare('UPDATE client_auth SET active=0 WHERE client_id=?').bind(client.id).run();
                  } else if (sub.status === 'ACTIVE') {
                    await env.DB.prepare('UPDATE clients SET status=? WHERE id=?').bind('active', client.id).run();
                    await env.DB.prepare('UPDATE client_auth SET active=1 WHERE client_id=?').bind(client.id).run();
                  }
                }
              }
            }
          }
        } catch (e) { console.log('Square webhook error:', e.message); }
        return new Response('OK', { status: 200 });
      }

      // ── ADMIN (Ted only) ──────────────────────────────────────
      if (url.pathname === '/admin/login' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, password } = await request.json().catch(() => ({}));
        if (!email || !password) return bad('email and password required', cors);
        const row = await env.DB.prepare('SELECT * FROM admin_auth WHERE email=? AND active=1').bind(email.toLowerCase().trim()).first();
        if (!row) return ok({ ok: false, error: 'Invalid email or password' }, cors);
        if (await sha256(password) !== row.password_hash) return ok({ ok: false, error: 'Invalid email or password' }, cors);
        await env.DB.prepare('UPDATE admin_auth SET last_login=? WHERE id=?').bind(new Date().toISOString(), row.id).run();
        const token = await makeToken(row.id, email, 'admin', SECRET);
        return ok({ token, must_change: row.must_change_password }, cors);
      }

      if (url.pathname === '/admin/change-password' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        if (!b.email || !b.old_password || !b.new_password) return bad('missing fields', cors);
        if (b.new_password.length < 8) return bad('New password must be at least 8 characters', cors);
        const row = await env.DB.prepare('SELECT * FROM admin_auth WHERE email=? AND active=1').bind(b.email.toLowerCase().trim()).first();
        if (!row) return bad('Not found', cors);
        if (await sha256(b.old_password) !== row.password_hash) return bad('Current password incorrect', cors);
        await env.DB.prepare('UPDATE admin_auth SET password_hash=?, must_change_password=0 WHERE id=?').bind(await sha256(b.new_password), row.id).run();
        return ok({ changed: true }, cors);
      }

      // ── REVIEWS ────────────────────────────────────────────────
      // Every review, good or bad, always reaches Ted -- nothing is
      // filtered before it lands here. "consent_to_feature" is the
      // client explicitly agreeing their name/words can be used
      // publicly; admin approval on top of that is what actually
      // controls what goes live. Neither step ever hides a review
      // from Ted himself.
      if (url.pathname === '/client/submit-review' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const claims = await verifyToken(b.token, SECRET);
        if (!claims || claims.role !== 'client') return bad('Unauthorized', cors);
        const rating = parseInt(b.rating, 10);
        if (!rating || rating < 1 || rating > 5) return bad('rating (1-5) required', cors);
        await env.DB.prepare('INSERT INTO reviews (client_id,rating,comment,consent_to_feature) VALUES (?,?,?,?)')
          .bind(claims.id, rating, b.comment || null, b.consent_to_feature ? 1 : 0).run();
        return ok({ submitted: true }, cors);
      }

      if (url.pathname === '/admin/reviews' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const claims = await verifyToken(url.searchParams.get('token'), SECRET);
        if (!claims || claims.role !== 'admin') return bad('Unauthorized', cors);
        const rows = await env.DB.prepare(`
          SELECT r.*, c.first_name, c.last_name FROM reviews r
          JOIN clients c ON c.id = r.client_id ORDER BY r.created_at DESC
        `).all();
        return ok({ reviews: rows.results || [] }, cors);
      }

      if (url.pathname === '/admin/reviews/status' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const claims = await verifyToken(b.token, SECRET);
        if (!claims || claims.role !== 'admin') return bad('Unauthorized', cors);
        if (!['approved', 'declined', 'pending'].includes(b.status)) return bad('Invalid status', cors);
        await env.DB.prepare('UPDATE reviews SET status=? WHERE id=?').bind(b.status, b.review_id).run();
        return ok({ updated: true }, cors);
      }

      if (url.pathname === '/reviews/featured' && request.method === 'GET') {
        // Public endpoint -- only ever returns reviews that are BOTH
        // client-consented AND admin-approved. Never exposes rating,
        // comment, or existence of any review that fails either check.
        if (!env.DB) return bad('No DB', cors);
        const rows = await env.DB.prepare(`
          SELECT r.rating, r.comment, c.first_name FROM reviews r
          JOIN clients c ON c.id = r.client_id
          WHERE r.consent_to_feature = 1 AND r.status = 'approved'
          ORDER BY r.created_at DESC LIMIT 12
        `).all();
        return ok({ reviews: rows.results || [] }, cors);
      }

      if (url.pathname === '/admin/content-calendar' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const claims = await verifyToken(url.searchParams.get('token'), SECRET);
        if (!claims || claims.role !== 'admin') return bad('Unauthorized', cors);
        const rows = await env.DB.prepare('SELECT slot_key FROM content_calendar_log WHERE posted=1').all();
        return ok({ posted: (rows.results || []).map(r => r.slot_key) }, cors);
      }

      if (url.pathname === '/admin/content-calendar' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const claims = await verifyToken(b.token, SECRET);
        if (!claims || claims.role !== 'admin') return bad('Unauthorized', cors);
        if (!b.slot_key) return bad('slot_key required', cors);
        const existing = await env.DB.prepare('SELECT id FROM content_calendar_log WHERE slot_key=?').bind(b.slot_key).first();
        if (existing) {
          await env.DB.prepare('UPDATE content_calendar_log SET posted=?, posted_date=? WHERE slot_key=?')
            .bind(b.posted ? 1 : 0, b.posted ? new Date().toISOString() : null, b.slot_key).run();
        } else {
          await env.DB.prepare('INSERT INTO content_calendar_log (slot_key,posted,posted_date) VALUES (?,?,?)')
            .bind(b.slot_key, b.posted ? 1 : 0, b.posted ? new Date().toISOString() : null).run();
        }
        return ok({ saved: true }, cors);
      }

      if (url.pathname === '/admin/clients' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const claims = await verifyToken(url.searchParams.get('token'), SECRET);
        if (!claims || claims.role !== 'admin') return bad('Unauthorized', cors);
        const rows = await env.DB.prepare(`
          SELECT c.*, (SELECT MAX(submitted_at) FROM weekly_checkins WHERE client_id=c.id) as last_checkin
          FROM clients c ORDER BY c.created_at DESC
        `).all();
        return ok({ clients: rows.results || [] }, cors);
      }

      // Full drill-down for one online client -- assessment answers, current
      // program, workout history, weekly check-ins, and any reviews they've
      // submitted, all in one place instead of five separate lookups.
      if (url.pathname === '/admin/client-detail' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const claims = await verifyToken(url.searchParams.get('token'), SECRET);
        if (!claims || claims.role !== 'admin') return bad('Unauthorized', cors);
        const clientId = parseInt(url.searchParams.get('client_id'), 10);
        if (!clientId) return bad('client_id required', cors);
        const client = await env.DB.prepare('SELECT * FROM clients WHERE id=?').bind(clientId).first();
        if (!client) return bad('Client not found', cors);
        const [program, workouts, checkins, reviews, messages] = await Promise.all([
          env.DB.prepare('SELECT * FROM client_programs WHERE client_id=? AND active=1 ORDER BY selected_at DESC LIMIT 1').bind(clientId).first(),
          env.DB.prepare('SELECT * FROM workout_logs WHERE client_id=? ORDER BY log_date DESC LIMIT 20').bind(clientId).all(),
          env.DB.prepare('SELECT * FROM weekly_checkins WHERE client_id=? ORDER BY submitted_at DESC LIMIT 12').bind(clientId).all(),
          env.DB.prepare('SELECT * FROM reviews WHERE client_id=? ORDER BY created_at DESC').bind(clientId).all(),
          env.DB.prepare('SELECT * FROM portal_messages WHERE client_id=? ORDER BY created_at DESC LIMIT 20').bind(clientId).all()
        ]);
        let onboarding = null;
        try { onboarding = client.onboarding_json ? JSON.parse(client.onboarding_json).answers : null; } catch (e) {}
        return ok({
          client, onboarding, program: program || null,
          workouts: workouts.results || [], checkins: checkins.results || [],
          reviews: reviews.results || [], messages: messages.results || []
        }, cors);
      }

      // ── CLIENT AUTH ────────────────────────────────────────────
      if (url.pathname === '/client/login' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const { email, password } = await request.json().catch(() => ({}));
        if (!email || !password) return bad('email and password required', cors);
        const row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=? AND active=1').bind(email.toLowerCase().trim()).first();
        if (!row) return ok({ ok: false, error: 'Invalid email or password' }, cors);
        if (await sha256(password) !== row.password_hash) return ok({ ok: false, error: 'Invalid email or password' }, cors);
        await env.DB.prepare('UPDATE client_auth SET last_login=? WHERE id=?').bind(new Date().toISOString(), row.id).run();
        const token = await makeToken(row.client_id, email, 'client', SECRET);
        return ok({ token, client_id: row.client_id, must_change: row.must_change_password }, cors);
      }

      if (url.pathname === '/client/change-password' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        if (!b.email || !b.old_password || !b.new_password) return bad('missing fields', cors);
        if (b.new_password.length < 8) return bad('New password must be at least 8 characters', cors);
        const row = await env.DB.prepare('SELECT * FROM client_auth WHERE email=? AND active=1').bind(b.email.toLowerCase().trim()).first();
        if (!row) return bad('Not found', cors);
        if (await sha256(b.old_password) !== row.password_hash) return bad('Current password incorrect', cors);
        await env.DB.prepare('UPDATE client_auth SET password_hash=?, must_change_password=0 WHERE id=?').bind(await sha256(b.new_password), row.id).run();
        return ok({ changed: true }, cors);
      }

      // ── CLIENT APP ─────────────────────────────────────────────
      if (url.pathname === '/client/me' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const claims = await verifyToken(url.searchParams.get('token'), SECRET);
        if (!claims || claims.role !== 'client') return bad('Unauthorized', cors);
        const client = await env.DB.prepare('SELECT * FROM clients WHERE id=?').bind(claims.id).first();
        if (!client) return bad('Client not found', cors);
        const program = await env.DB.prepare('SELECT * FROM client_programs WHERE client_id=? AND active=1 ORDER BY selected_at DESC LIMIT 1').bind(claims.id).first();
        return ok({ client, program: program || null }, cors);
      }

      if (url.pathname === '/client/select-program' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const claims = await verifyToken(b.token, SECRET);
        if (!claims || claims.role !== 'client') return bad('Unauthorized', cors);
        if (!b.bundle_id || !b.bundle_name) return bad('bundle_id, bundle_name required', cors);
        await env.DB.prepare('UPDATE client_programs SET active=0 WHERE client_id=? AND active=1').bind(claims.id).run();
        await env.DB.prepare('INSERT INTO client_programs (client_id,bundle_id,bundle_name) VALUES (?,?,?)').bind(claims.id, b.bundle_id, b.bundle_name).run();
        return ok({ selected: true }, cors);
      }

      if (url.pathname === '/client/log-workout' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const claims = await verifyToken(b.token, SECRET);
        if (!claims || claims.role !== 'client') return bad('Unauthorized', cors);
        const logDate = b.log_date || new Date().toISOString().slice(0, 10);
        const routineLabel = b.routine_label || 'Workout';
        await env.DB.prepare('INSERT INTO workout_logs (client_id,log_date,routine_label,bundle_id,exercises_json) VALUES (?,?,?,?,?)')
          .bind(claims.id, logDate, routineLabel, b.bundle_id || null, JSON.stringify(b.exercises || [])).run();
        const client = await env.DB.prepare('SELECT * FROM clients WHERE id=?').bind(claims.id).first();
        ctx.waitUntil(generateAICoachMessage(env, client, { log_date: logDate, routine_label: routineLabel }));
        return ok({ logged: true }, cors);
      }

      // ── WEEKLY CHECK-IN (Remote Coaching accountability cadence) ──
      // Async, client-submitted -- the weekly half of the check-in
      // structure. The monthly half is a live call booked through Ted's
      // own Google Calendar link, outside this system entirely.
      if (url.pathname === '/client/weekly-checkin' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        const claims = await verifyToken(b.token, SECRET);
        if (!claims || claims.role !== 'client') return bad('Unauthorized', cors);
        await env.DB.prepare(
          `INSERT INTO weekly_checkins (client_id,training_review,soreness_pain,nutrition_adherence,questions) VALUES (?,?,?,?,?)`
        ).bind(claims.id, b.training_review || null, b.soreness_pain || null, b.nutrition_adherence || null, b.questions || null).run();
        return ok({ submitted: true }, cors);
      }

      if (url.pathname === '/client/weekly-checkins' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const claims = await verifyToken(url.searchParams.get('token'), SECRET);
        if (!claims || claims.role !== 'client') return bad('Unauthorized', cors);
        const rows = await env.DB.prepare('SELECT * FROM weekly_checkins WHERE client_id=? ORDER BY submitted_at DESC LIMIT 12').bind(claims.id).all();
        return ok({ checkins: rows.results || [] }, cors);
      }

      // ── PORTAL MESSAGES (client <-> AI coach / Ted) ────────────
      if (url.pathname === '/portal/messages' && request.method === 'GET') {
        if (!env.DB) return bad('No DB', cors);
        const clientId = url.searchParams.get('client_id');
        if (!clientId) return bad('client_id required', cors);
        const rows = await env.DB.prepare('SELECT * FROM portal_messages WHERE client_id=? ORDER BY created_at ASC LIMIT 200').bind(clientId).all();
        return ok({ messages: rows.results || [] }, cors);
      }

      if (url.pathname === '/portal/messages/send' && request.method === 'POST') {
        if (!env.DB) return bad('No DB', cors);
        const b = await request.json().catch(() => ({}));
        if (!b.client_id || !b.sender || !b.body) return bad('client_id, sender, body required', cors);
        const sender = ['coach', 'client'].includes(b.sender) ? b.sender : 'client';
        await env.DB.prepare('INSERT INTO portal_messages (client_id,coach_name,sender,body) VALUES (?,?,?,?)')
          .bind(b.client_id, b.coach_name || null, sender, b.body).run();
        return ok({ sent: true }, cors);
      }

      return bad('Not found', cors);
    } catch (e) {
      return bad('Server error: ' + e.message, cors);
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(sendDripCampaign(env));
  }
};
