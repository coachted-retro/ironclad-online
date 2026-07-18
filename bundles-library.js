// bundles-library.js
// SINGLE SOURCE OF TRUTH for all pre-built workout programs / bundles.
// Used by member-app.html (client-facing Training tab) AND coach-crm.html
// (coach's program picker when scheduling a client). Do not fork this list --
// before this file existed, member-app.html and coach-crm.html each had their
// own separate, drifting copy (member-app had Ironclad Iron Protocol + Ironclad Ironman
// Circuit that coaches never saw; coach-crm had 11 equipment-based bundles clients
// never saw). Consolidated July 14, 2026 per Ted -- add new bundles here once,
// both apps pick them up automatically.
//
// Exercise objects: {name, sets, reps, rest, note?}. The 11 equipment-based bundles
// ported over from the old coach-only list (kb_foundations through foam_roller_recovery)
// only have {name} -- sets/reps/rest were never defined for those and are left blank
// rather than invented. Rendering code should treat sets/reps/rest as optional.
const BUNDLES = [
  {
    id: "upper_lower",
    icon: "🔁",
    name: "Upper / Lower Split",
    desc: "Alternate upper and lower body sessions for balanced development",
    days: "4 days / week",
    accent: "#2563EB",
    goal: ["recomp", "build", "general"],
    routines: [
      { label: "Day A — Upper Body Push", exercises: [
        {name:"Barbell Bench Press", sets:4, reps:"8-10", rest:"90s"},
        {name:"Incline Dumbbell Press", sets:3, reps:"10-12", rest:"60s"},
        {name:"Overhead Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Lateral Raises", sets:3, reps:"15", rest:"45s"},
        {name:"Tricep Pushdown", sets:3, reps:"12-15", rest:"45s"}
      ]},
      { label: "Day B — Lower Body", exercises: [
        {name:"Barbell Squat", sets:4, reps:"6-8", rest:"2min"},
        {name:"Leg Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Romanian Deadlift", sets:3, reps:"10", rest:"90s"},
        {name:"Leg Curl", sets:3, reps:"12", rest:"60s"},
        {name:"Calf Raises", sets:4, reps:"15-20", rest:"45s"}
      ]},
      { label: "Day C — Upper Body Pull", exercises: [
        {name:"Pull-Ups / Lat Pulldown", sets:4, reps:"8-10", rest:"90s"},
        {name:"Seated Cable Row", sets:3, reps:"10-12", rest:"60s"},
        {name:"Face Pulls", sets:3, reps:"15", rest:"45s"},
        {name:"Barbell Curl", sets:3, reps:"10-12", rest:"45s"},
        {name:"Hammer Curl", sets:2, reps:"12", rest:"45s"}
      ]},
      { label: "Day D — Lower Body + Core", exercises: [
        {name:"Deadlift", sets:4, reps:"5-6", rest:"2-3min"},
        {name:"Bulgarian Split Squat", sets:3, reps:"8 each side", rest:"90s"},
        {name:"Hip Thrust", sets:3, reps:"12", rest:"60s"},
        {name:"Plank", sets:3, reps:"45s hold", rest:"30s"},
        {name:"Cable Crunch", sets:3, reps:"15", rest:"30s"}
      ]},
    ]
  },
  {
    id: "push_pull_legs",
    icon: "🔺",
    name: "Push / Pull / Legs",
    desc: "The classic 3-day split for strength and muscle. Run it twice a week for 6 days.",
    days: "3–6 days / week",
    accent: "#E0192B",
    goal: ["build", "recomp"],
    routines: [
      { label: "Push — Chest, Shoulders, Triceps", exercises: [
        {name:"Flat Bench Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Incline Dumbbell Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Shoulder Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Cable Fly", sets:3, reps:"12-15", rest:"60s"},
        {name:"Lateral Raise", sets:4, reps:"15", rest:"30s"},
        {name:"Tricep Dips", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Pull — Back, Biceps", exercises: [
        {name:"Deadlift", sets:3, reps:"5", rest:"3min"},
        {name:"Pull-Ups", sets:4, reps:"6-8", rest:"90s"},
        {name:"Barbell Row", sets:3, reps:"8-10", rest:"90s"},
        {name:"Lat Pulldown", sets:3, reps:"10-12", rest:"60s"},
        {name:"Face Pulls", sets:3, reps:"15-20", rest:"30s"},
        {name:"EZ Bar Curl", sets:4, reps:"10", rest:"45s"}
      ]},
      { label: "Legs — Quads, Hamstrings, Glutes, Calves", exercises: [
        {name:"Barbell Squat", sets:4, reps:"6-8", rest:"2-3min"},
        {name:"Leg Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Romanian Deadlift", sets:3, reps:"10-12", rest:"90s"},
        {name:"Walking Lunges", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Leg Curl", sets:3, reps:"12-15", rest:"60s"},
        {name:"Standing Calf Raise", sets:4, reps:"15-20", rest:"30s"}
      ]},
    ]
  },
  {
    id: "full_body",
    icon: "⚡",
    name: "Full Body",
    desc: "Hit every muscle group each session. Great for 3 days/week or beginners.",
    days: "3 days / week",
    accent: "#1E9E5A",
    goal: ["general", "cut", "recomp"],
    routines: [
      { label: "Full Body A", exercises: [
        {name:"Squat", sets:3, reps:"8-10", rest:"90s"},
        {name:"Bench Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Barbell Row", sets:3, reps:"8-10", rest:"90s"},
        {name:"Overhead Press", sets:2, reps:"10-12", rest:"60s"},
        {name:"Romanian Deadlift", sets:2, reps:"12", rest:"60s"},
        {name:"Plank", sets:3, reps:"30-60s", rest:"30s"}
      ]},
      { label: "Full Body B", exercises: [
        {name:"Deadlift", sets:3, reps:"5-6", rest:"2min"},
        {name:"Incline Dumbbell Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Pull-Ups / Lat Pulldown", sets:3, reps:"8-10", rest:"90s"},
        {name:"Dumbbell Shoulder Press", sets:3, reps:"10-12", rest:"60s"},
        {name:"Leg Press", sets:3, reps:"12-15", rest:"60s"},
        {name:"Cable Crunch", sets:3, reps:"15", rest:"30s"}
      ]},
    ]
  },
  {
    id: "core_conditioning",
    icon: "🔥",
    name: "Core & Conditioning",
    desc: "Core strength, stability, and cardio conditioning. Pairs with any split.",
    days: "Add-on · 2–3x / week",
    accent: "#D97706",
    goal: ["cut", "general"],
    routines: [
      { label: "Core + Cardio Circuit", exercises: [
        {name:"Plank Hold", sets:4, reps:"45s", rest:"20s"},
        {name:"Dead Bug", sets:3, reps:"10 each side", rest:"30s"},
        {name:"Cable Crunch", sets:3, reps:"15-20", rest:"30s"},
        {name:"Russian Twist", sets:3, reps:"20 total", rest:"30s"},
        {name:"Mountain Climbers", sets:3, reps:"30s", rest:"30s"},
        {name:"Rowing Machine or Bike", sets:1, reps:"10 min steady", rest:"—"}
      ]},
      { label: "Glutes & Core", exercises: [
        {name:"Hip Thrust", sets:4, reps:"12-15", rest:"60s"},
        {name:"Glute Bridge", sets:3, reps:"15", rest:"45s"},
        {name:"Side-Lying Clam Shell", sets:3, reps:"15 each", rest:"30s"},
        {name:"Bird Dog", sets:3, reps:"10 each side", rest:"30s"},
        {name:"Reverse Crunch", sets:3, reps:"15", rest:"30s"},
        {name:"Pallof Press", sets:3, reps:"12 each side", rest:"30s"}
      ]},
    ]
  },
  {
    id: "strength_5x5",
    icon: "🏋️",
    name: "Strength Foundation 5×5",
    desc: "Compound lifts only. Progressive overload every session. The fastest way to get genuinely strong.",
    days: "3 days / week",
    accent: "#1A1D21",
    goal: ["strength", "general"],
    routines: [
      { label: "Workout A", exercises: [
        {name:"Barbell Squat", sets:5, reps:"5", rest:"3 min"},
        {name:"Barbell Bench Press", sets:5, reps:"5", rest:"3 min"},
        {name:"Barbell Row", sets:5, reps:"5", rest:"3 min"}
      ]},
      { label: "Workout B", exercises: [
        {name:"Barbell Squat", sets:5, reps:"5", rest:"3 min"},
        {name:"Overhead Press", sets:5, reps:"5", rest:"3 min"},
        {name:"Deadlift", sets:1, reps:"5", rest:"5 min"}
      ]},
    ]
  },
  {
    id: "fat_loss_circuit",
    icon: "⚡",
    name: "Fat Loss Circuit",
    desc: "Supersets with minimal rest. Keeps heart rate elevated, burns more in less time. No cardio excuses.",
    days: "3–4 days / week",
    accent: "#D97706",
    goal: ["cut", "recomp"],
    routines: [
      { label: "Circuit A — Upper + Lower Superset", exercises: [
        {name:"Dumbbell Press (superset with Row)", sets:4, reps:"12", rest:"20s between, 60s after"},
        {name:"Dumbbell Row", sets:4, reps:"12", rest:"60s after superset"},
        {name:"Goblet Squat (superset with RDL)", sets:4, reps:"12", rest:"20s between, 60s after"},
        {name:"Romanian Deadlift", sets:4, reps:"12", rest:"60s after superset"},
        {name:"Plank to Push-Up", sets:3, reps:"10", rest:"45s"}
      ]},
      { label: "Circuit B — Push + Pull Superset", exercises: [
        {name:"Incline Press (superset with Pull-Up)", sets:4, reps:"10", rest:"20s between, 60s after"},
        {name:"Pull-Up or Lat Pulldown", sets:4, reps:"10", rest:"60s after superset"},
        {name:"Shoulder Press (superset with Face Pull)", sets:3, reps:"12", rest:"20s between, 60s after"},
        {name:"Face Pull", sets:3, reps:"15", rest:"60s after superset"},
        {name:"Dip (superset with Curl)", sets:3, reps:"10", rest:"20s between, 60s after"},
        {name:"Barbell Curl", sets:3, reps:"10", rest:"60s after superset"}
      ]},
    ]
  },
  {
    id: "functional_strength",
    icon: "🔩",
    name: "Functional Strength",
    desc: "Movement patterns over muscle groups. Built for real-world strength, injury prevention, and longevity.",
    days: "3 days / week",
    accent: "#2563EB",
    goal: ["general", "strength"],
    routines: [
      { label: "Day 1 — Hinge & Push", exercises: [
        {name:"Trap Bar Deadlift or Kettlebell Swing", sets:4, reps:"8", rest:"90s"},
        {name:"Push-Up Variations (tempo)", sets:4, reps:"10-12", rest:"60s"},
        {name:"Cable Pull-Through", sets:3, reps:"15", rest:"60s"},
        {name:"Farmers Carry", sets:4, reps:"40 yards", rest:"60s"},
        {name:"Pallof Press", sets:3, reps:"12 each side", rest:"30s"}
      ]},
      { label: "Day 2 — Squat & Pull", exercises: [
        {name:"Goblet Squat or Safety Bar Squat", sets:4, reps:"10", rest:"90s"},
        {name:"Single-Arm Dumbbell Row", sets:4, reps:"10 each", rest:"60s"},
        {name:"Step-Up with Dumbbells", sets:3, reps:"10 each leg", rest:"60s"},
        {name:"Band Pull-Apart", sets:4, reps:"20", rest:"20s"},
        {name:"Dead Bug", sets:3, reps:"10 each side", rest:"30s"}
      ]},
      { label: "Day 3 — Carry & Rotate", exercises: [
        {name:"Single-Leg RDL", sets:3, reps:"8 each", rest:"60s"},
        {name:"Landmine Press", sets:3, reps:"10 each", rest:"60s"},
        {name:"Suitcase Carry", sets:4, reps:"40 yards each", rest:"60s"},
        {name:"Cable Woodchop", sets:3, reps:"12 each side", rest:"45s"},
        {name:"Plank Row", sets:3, reps:"10 each", rest:"45s"}
      ]},
    ]
  },
  {
    id: "chest_arms",
    icon: "💪",
    name: "Chest & Arms",
    desc: "Extra volume on the muscles men want most. Run alongside any base split for accelerated chest and arm development.",
    days: "2 days / week (add-on)",
    accent: "#E0192B",
    goal: ["build", "recomp"],
    routines: [
      { label: "Chest Specialization Day", exercises: [
        {name:"Flat Barbell Bench Press", sets:5, reps:"5-6", rest:"3 min"},
        {name:"Incline Dumbbell Press", sets:4, reps:"8-10", rest:"90s"},
        {name:"Low Cable Fly", sets:4, reps:"12-15", rest:"60s"},
        {name:"Decline Push-Up", sets:3, reps:"15-20", rest:"45s"},
        {name:"Cable Chest Press", sets:3, reps:"12", rest:"45s"}
      ]},
      { label: "Arms Specialization Day", exercises: [
        {name:"EZ Bar Preacher Curl", sets:4, reps:"10", rest:"60s"},
        {name:"Skull Crushers", sets:4, reps:"10", rest:"60s"},
        {name:"Incline Dumbbell Curl", sets:3, reps:"12", rest:"45s"},
        {name:"Cable Tricep Pushdown", sets:3, reps:"15", rest:"45s"},
        {name:"Hammer Curl", sets:3, reps:"12", rest:"45s"},
        {name:"Overhead Tricep Extension", sets:3, reps:"12", rest:"45s"},
        {name:"Reverse Curl", sets:2, reps:"15", rest:"30s"}
      ]},
    ]
  },
  {
    id: "bodybuilding_5day",
    icon: "🏆",
    name: "Bodybuilding Split",
    desc: "High volume, isolation work, aesthetics focus. For experienced members chasing size and definition.",
    days: "5 days / week",
    accent: "#7C3AED",
    goal: ["build", "recomp"],
    routines: [
      { label: "Day 1 — Chest", exercises: [
        {name:"Flat Barbell Bench Press", sets:4, reps:"6-8", rest:"2 min"},
        {name:"Incline Dumbbell Press", sets:4, reps:"10-12", rest:"90s"},
        {name:"Decline Bench Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Cable Fly", sets:4, reps:"12-15", rest:"45s"},
        {name:"Push-Up Burnout", sets:2, reps:"failure", rest:"60s"}
      ]},
      { label: "Day 2 — Back", exercises: [
        {name:"Deadlift", sets:4, reps:"5-6", rest:"3 min"},
        {name:"Wide-Grip Pull-Up", sets:4, reps:"8-10", rest:"90s"},
        {name:"T-Bar Row", sets:4, reps:"10", rest:"90s"},
        {name:"Seated Cable Row", sets:3, reps:"12", rest:"60s"},
        {name:"Straight-Arm Pulldown", sets:3, reps:"15", rest:"45s"},
        {name:"Face Pull", sets:3, reps:"20", rest:"30s"}
      ]},
      { label: "Day 3 — Shoulders", exercises: [
        {name:"Overhead Press (Barbell)", sets:4, reps:"6-8", rest:"2 min"},
        {name:"Dumbbell Lateral Raise", sets:5, reps:"15", rest:"30s"},
        {name:"Arnold Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Rear Delt Fly", sets:4, reps:"15", rest:"30s"},
        {name:"Cable Lateral Raise", sets:3, reps:"15 each", rest:"30s"},
        {name:"Shrugs", sets:3, reps:"12-15", rest:"45s"}
      ]},
      { label: "Day 4 — Arms", exercises: [
        {name:"EZ Bar Curl", sets:4, reps:"10-12", rest:"60s"},
        {name:"Close-Grip Bench Press", sets:4, reps:"10-12", rest:"60s"},
        {name:"Incline Dumbbell Curl", sets:3, reps:"12", rest:"45s"},
        {name:"Skull Crushers", sets:3, reps:"10-12", rest:"60s"},
        {name:"Concentration Curl", sets:3, reps:"12", rest:"30s"},
        {name:"Overhead Tricep Extension", sets:3, reps:"12", rest:"45s"},
        {name:"Reverse Curl", sets:2, reps:"15", rest:"30s"}
      ]},
      { label: "Day 5 — Legs", exercises: [
        {name:"Barbell Squat", sets:4, reps:"8-10", rest:"2-3 min"},
        {name:"Leg Press", sets:4, reps:"12", rest:"90s"},
        {name:"Romanian Deadlift", sets:3, reps:"10-12", rest:"90s"},
        {name:"Leg Curl", sets:4, reps:"12", rest:"60s"},
        {name:"Leg Extension", sets:4, reps:"12-15", rest:"45s"},
        {name:"Standing Calf Raise", sets:5, reps:"15-20", rest:"30s"}
      ]},
    ]
  },
  {
    id: "beginner_foundation",
    icon: "🌱",
    name: "Beginner Foundation",
    desc: "Your first 6 weeks. Form before intensity. 3 days, never back-to-back. Build the base everything else stands on.",
    days: "3 days / week · Mon, Wed, Fri",
    accent: "#1E9E5A",
    goal: ["beginner", "general"],
    routines: [
      { label: "Week 1–2: Movement Patterns", exercises: [
        {name:"Goblet Squat", sets:3, reps:"10", rest:"90s", note:"Feet shoulder-width. Chest up. Sit between your heels."},
        {name:"Dumbbell Bench Press", sets:3, reps:"10", rest:"90s", note:"Start light. Full range of motion. Control the descent."},
        {name:"Seated Cable Row", sets:3, reps:"10", rest:"90s", note:"Pull to your belly button. Squeeze shoulder blades together."},
        {name:"Dumbbell Shoulder Press", sets:3, reps:"10", rest:"60s", note:"Don't lock out at the top. Stay controlled."},
        {name:"Plank", sets:3, reps:"20-30s hold", rest:"45s", note:"Straight line head to heels. Don't let hips sag."}
      ]},
      { label: "Week 3–4: Adding Load", exercises: [
        {name:"Barbell Squat (light)", sets:3, reps:"8", rest:"2 min", note:"Add the bar when goblet squat feels solid."},
        {name:"Barbell Bench Press (light)", sets:3, reps:"8", rest:"2 min", note:"Have a spotter or use a rack with safety bars."},
        {name:"Lat Pulldown", sets:3, reps:"10", rest:"90s", note:"Pull to chin. Lead with elbows, not hands."},
        {name:"Dumbbell Row", sets:3, reps:"10 each", rest:"60s", note:"One hand on bench. Full stretch at bottom."},
        {name:"Romanian Deadlift (dumbbell)", sets:3, reps:"10", rest:"90s", note:"Hip hinge. Push hips back. Feel the hamstrings stretch."},
        {name:"Plank + Side Plank", sets:3, reps:"30s each", rest:"30s"}
      ]},
      { label: "Week 5–6: Progressive Overload", exercises: [
        {name:"Barbell Squat", sets:4, reps:"6", rest:"2-3 min", note:"Add 5 lb each session if form is clean."},
        {name:"Barbell Bench Press", sets:4, reps:"6", rest:"2-3 min", note:"Add 5 lb each session."},
        {name:"Deadlift (intro)", sets:3, reps:"5", rest:"3 min", note:"This is the king of exercises. Take your time learning it."},
        {name:"Barbell Row", sets:3, reps:"8", rest:"90s"},
        {name:"Overhead Press", sets:3, reps:"8", rest:"90s"},
        {name:"Ab Wheel or Cable Crunch", sets:3, reps:"10", rest:"30s"}
      ]},
    ]
  },
  {
    id: "athletic_performance",
    icon: "🚀",
    name: "Athletic Performance",
    desc: "Power, speed, and explosive strength. For competitive men who want to feel athletic, not just look it.",
    days: "3–4 days / week",
    accent: "#0891B2",
    goal: ["strength", "general"],
    routines: [
      { label: "Power Day A", exercises: [
        {name:"Box Jump", sets:5, reps:"3", rest:"2 min", note:"Full reset between reps. Land soft."},
        {name:"Power Clean or Hang Clean", sets:5, reps:"3", rest:"2-3 min"},
        {name:"Barbell Squat (explosive)", sets:4, reps:"4", rest:"2 min", note:"Drive up as fast as possible. Control descent."},
        {name:"Broad Jump", sets:4, reps:"3", rest:"90s"},
        {name:"Med Ball Slam", sets:4, reps:"8", rest:"60s"}
      ]},
      { label: "Power Day B", exercises: [
        {name:"Trap Bar Jump Deadlift", sets:5, reps:"3", rest:"2 min"},
        {name:"Push Press (barbell)", sets:5, reps:"3", rest:"2 min"},
        {name:"Single-Leg Bound", sets:4, reps:"5 each", rest:"90s"},
        {name:"Battle Ropes", sets:5, reps:"20s on, 40s off", rest:"40s"},
        {name:"Sprint (treadmill or turf)", sets:6, reps:"10 sec all-out", rest:"50s"}
      ]},
    ]
  },
  {
    id: "mobility_recovery",
    icon: "🧘",
    name: "Mobility & Recovery",
    desc: "The work that protects the work. Do this on rest days or before any session. 20–30 minutes.",
    days: "Rest days · or pre-session",
    accent: "#059669",
    goal: ["recovery", "general"],
    routines: [
      { label: "Full Body Mobility Flow", exercises: [
        {name:"Foam Roll — T-Spine", sets:1, reps:"60s", rest:"—", note:"Find tight spots, pause and breathe into them."},
        {name:"Foam Roll — Lats", sets:1, reps:"45s each", rest:"—"},
        {name:"90/90 Hip Stretch", sets:2, reps:"60s each side", rest:"—", note:"Sit tall. Switch sides slowly."},
        {name:"World's Greatest Stretch", sets:3, reps:"5 each side", rest:"—"},
        {name:"Cat-Cow", sets:2, reps:"10 slow", rest:"—", note:"Breathe through each rep. Full range."},
        {name:"Thoracic Rotation (half-kneeling)", sets:2, reps:"10 each side", rest:"—"},
        {name:"Hip Flexor Stretch", sets:2, reps:"60s each", rest:"—", note:"Squeeze the glute of the back leg. Feel the stretch change."},
        {name:"Shoulder CARs (Controlled Articular Rotations)", sets:2, reps:"5 each direction", rest:"—"},
        {name:"Hamstring Floss (banded or towel)", sets:2, reps:"10 each", rest:"—"}
      ]},
      { label: "Pre-Session Activation", exercises: [
        {name:"Band Pull-Apart", sets:3, reps:"20", rest:"—"},
        {name:"Hip Circle", sets:2, reps:"10 each direction", rest:"—"},
        {name:"Glute Bridge Activation", sets:2, reps:"15", rest:"—"},
        {name:"Inchworm", sets:2, reps:"8", rest:"—"},
        {name:"Leg Swing (front-back + lateral)", sets:2, reps:"10 each direction", rest:"—"},
        {name:"Light Goblet Squat (warm-up weight)", sets:2, reps:"10", rest:"—"}
      ]},
    ]
  },
  {
    id: "retro_iron_protocol",
    icon: "🦾",
    name: "Ironclad Iron Protocol",
    desc: "Elite 5-day mass and strength split for advanced lifters chasing maximum growth. Every muscle group trained twice a week. Not for beginners — every set pushes close to failure.",
    days: "5 days / week",
    accent: "#111827",
    goal: ["build", "strength"],
    routines: [
      { label: "Phase 1 (Weeks 1-6) — Day 1: Push", exercises: [
        {name:"Barbell Bench Press", sets:4, reps:"6-8", rest:"2-3min"},
        {name:"Incline Dumbbell Press", sets:4, reps:"8-10", rest:"90s"},
        {name:"Standing Overhead Press", sets:3, reps:"6-8", rest:"2min"},
        {name:"Cable Lateral Raise", sets:4, reps:"12-15", rest:"60s"},
        {name:"Weighted Dips", sets:3, reps:"8-12", rest:"90s"},
        {name:"Overhead Tricep Extension", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 2: Pull", exercises: [
        {name:"Deadlift", sets:4, reps:"5", rest:"3min"},
        {name:"Weighted Pull-Ups", sets:4, reps:"6-8", rest:"2min"},
        {name:"Barbell Row", sets:4, reps:"8-10", rest:"90s"},
        {name:"Face Pull", sets:3, reps:"15", rest:"60s"},
        {name:"Barbell Curl", sets:3, reps:"8-10", rest:"60s"},
        {name:"Hammer Curl", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 3: Legs", exercises: [
        {name:"Barbell Back Squat", sets:4, reps:"6-8", rest:"3min"},
        {name:"Romanian Deadlift", sets:4, reps:"8-10", rest:"2min"},
        {name:"Leg Press", sets:3, reps:"10-12", rest:"90s"},
        {name:"Leg Curl", sets:3, reps:"10-12", rest:"60s"},
        {name:"Walking Lunge", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Standing Calf Raise", sets:4, reps:"12-15", rest:"45s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 4: Upper", exercises: [
        {name:"Incline Barbell Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Chest-Supported Row", sets:4, reps:"8-10", rest:"90s"},
        {name:"Seated Dumbbell Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Lat Pulldown (wide grip)", sets:3, reps:"10-12", rest:"60s"},
        {name:"Cable Fly", sets:3, reps:"12-15", rest:"45s"},
        {name:"Close-Grip Bench Press", sets:3, reps:"8-10", rest:"60s"}
      ]},
      { label: "Phase 1 (Weeks 1-6) — Day 5: Lower", exercises: [
        {name:"Front Squat", sets:4, reps:"6-8", rest:"2-3min"},
        {name:"Hip Thrust", sets:4, reps:"8-10", rest:"90s"},
        {name:"Bulgarian Split Squat", sets:3, reps:"10 each leg", rest:"60s"},
        {name:"Seated Leg Curl", sets:3, reps:"12-15", rest:"60s"},
        {name:"Leg Extension", sets:3, reps:"12-15", rest:"45s"},
        {name:"Seated Calf Raise", sets:4, reps:"15-20", rest:"45s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 1: Push", exercises: [
        {name:"Incline Barbell Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Flat Dumbbell Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Push Press", sets:3, reps:"5-6", rest:"2min", note:"More explosive/power-focused than the strict overhead press from Phase 1 — same muscles, different stimulus."},
        {name:"Egyptian Lateral Raise", sets:3, reps:"12-15", rest:"60s"},
        {name:"Weighted Dips", sets:3, reps:"8-10", rest:"90s"},
        {name:"Skull Crusher", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 2: Pull", exercises: [
        {name:"Rack Pull", sets:4, reps:"5", rest:"3min", note:"Partial-range pull from just below the knee — heavier loads, less lower-back demand than a full deadlift."},
        {name:"Chest-Supported T-Bar Row", sets:4, reps:"8-10", rest:"90s"},
        {name:"Single-Arm Dumbbell Row", sets:3, reps:"10-12 each arm", rest:"60s"},
        {name:"Rear Delt Fly", sets:3, reps:"15", rest:"60s"},
        {name:"Preacher Curl", sets:3, reps:"8-10", rest:"60s"},
        {name:"Cable Curl", sets:3, reps:"12-15", rest:"60s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 3: Legs", exercises: [
        {name:"Front Squat", sets:4, reps:"6-8", rest:"3min"},
        {name:"Stiff-Leg Deadlift", sets:4, reps:"8-10", rest:"2min"},
        {name:"Hack Squat", sets:3, reps:"10-12", rest:"90s"},
        {name:"Lying Leg Curl", sets:3, reps:"8-10", rest:"60s"},
        {name:"Reverse Lunge", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Standing Calf Raise (paused)", sets:4, reps:"12-15", rest:"45s", note:"2-second pause at full stretch — same movement as Phase 1, different tempo for a fresh stimulus."}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 4: Upper", exercises: [
        {name:"Flat Barbell Bench Press", sets:4, reps:"6-8", rest:"2min"},
        {name:"Pendlay Row", sets:4, reps:"6-8", rest:"2min"},
        {name:"Arnold Press", sets:3, reps:"8-10", rest:"90s"},
        {name:"Straight-Arm Pulldown", sets:3, reps:"12-15", rest:"60s"},
        {name:"Pec Deck Fly", sets:3, reps:"12-15", rest:"45s"},
        {name:"EZ-Bar Skull Crusher", sets:3, reps:"10-12", rest:"60s"}
      ]},
      { label: "Phase 2 (Weeks 7-12) — Day 5: Lower", exercises: [
        {name:"Back Squat (paused)", sets:4, reps:"6-8", rest:"3min", note:"2-second pause in the hole — same lift pattern as Phase 1 Front Squat day, different variation for a fresh stimulus."},
        {name:"Good Morning", sets:4, reps:"8-10", rest:"2min"},
        {name:"Walking Lunge (weighted)", sets:3, reps:"12 each leg", rest:"60s"},
        {name:"Lying Leg Curl", sets:3, reps:"12-15", rest:"60s"},
        {name:"Single-Leg Extension", sets:3, reps:"12-15 each leg", rest:"45s"},
        {name:"Seated Calf Raise", sets:4, reps:"15-20", rest:"45s"}
      ]},
    ]
  },
  {
    id: "retro_ironman_circuit",
    icon: "🔥",
    name: "Ironclad Ironman Circuit",
    desc: "One hour, all-out full-body conditioning. Tire flips, kettlebells, battle ropes, box jumps, sprints — built for the PTC turf room. Hardcore by design, not for the faint of heart.",
    days: "60 min · as often as you can handle it",
    accent: "#DC2626",
    goal: ["cut", "build", "general"],
    routines: [
      { label: "Block 1 — The Gauntlet (2 rounds, 40s work / 20s rest per station)", exercises: [
        {name:"Tire Flips", sets:2, reps:"40s work", rest:"20s"},
        {name:"Battle Ropes (alternating waves)", sets:2, reps:"40s work", rest:"20s"},
        {name:"Box Jumps", sets:2, reps:"40s work", rest:"20s"},
        {name:"Kettlebell Swings", sets:2, reps:"40s work", rest:"20s"},
        {name:"Sled Push / Pull", sets:2, reps:"40s work", rest:"20s"},
        {name:"Bear Crawl (turf length, down and back)", sets:2, reps:"40s work", rest:"20s"},
        {name:"Turf Sprints", sets:2, reps:"40s work", rest:"20s"},
        {name:"Burpees", sets:2, reps:"40s work", rest:"20s"},
        {name:"Med Ball Slams", sets:2, reps:"40s work", rest:"20s", note:"End of Block 1 — rest 2 min before Block 2."}
      ]},
      { label: "Block 2 — The Grind (15-minute AMRAP, track total rounds completed)", exercises: [
        {name:"Tire Flips", sets:1, reps:"10 reps", rest:"—"},
        {name:"Kettlebell Swings", sets:1, reps:"20 reps", rest:"—"},
        {name:"Box Jumps", sets:1, reps:"15 reps", rest:"—"},
        {name:"Battle Rope Slams", sets:1, reps:"30s", rest:"—"},
        {name:"Burpees", sets:1, reps:"10 reps", rest:"—", note:"Cycle through this full circuit as many times as possible in 15 minutes straight. Write down your round count — beat it next time."}
      ]},
      { label: "Block 3 — Finisher (3 rounds, no rest between exercises, 1 min rest between rounds)", exercises: [
        {name:"Wall Balls (or Med Ball Slams)", sets:3, reps:"20 reps", rest:"—"},
        {name:"Turf Sprint", sets:3, reps:"200m", rest:"—"},
        {name:"Kettlebell Swings", sets:3, reps:"15 reps", rest:"60s", note:"Rest a full minute after each complete round, not between exercises within a round."}
      ]},
    ]
  },
  {
    id: "ironclad_mass_protocol",
    icon: "🦍",
    name: "Ironclad Mass Protocol",
    desc: "The most extreme hypertrophy split on the platform — German Volume Training overload in Phase 1, stacked failure-intensity techniques on every set in Phase 2. Not a variation on Iron Protocol — a genuinely different, harder methodology. 90-120 minute sessions, 5 days a week. Advanced lifters only.",
    days: "5 days / week",
    accent: "#1B4D8C",
    goal: ["build", "strength"],
    routines: [
      { label: "Phase 1 (Wks 1-8) — Chest/Triceps: GVT Overload", exercises: [
        {name:"Barbell Bench Press", sets:10, reps:"10", rest:"60s", note:"German Volume Training — same weight for all 10 sets (~60% 1RM), no adding weight even if it speeds up. The last 3-4 sets should be a genuine grind. This is the single most demanding set-count on the whole platform."},
        {name:"Incline DB Press + Flat DB Fly + Push-Up to Failure", sets:3, reps:"10 / 12 / max", rest:"0s between, 2min after", note:"Giant set — all three back to back with zero rest, then rest 2 minutes before the next round. 3 full rounds."},
        {name:"Weighted Dips", sets:4, reps:"failure + drop", rest:"90s", note:"Every set (not just the last) goes to true failure, then strip weight and continue for a drop set."},
        {name:"Cable Crossover", sets:3, reps:"12 + 12 + 12", rest:"90s", note:"Mechanical drop set — high-to-low, then immediately low-to-high, then immediately straight-across, dropping the pin weight each switch. One long set."},
        {name:"Skull Crusher + Close-Grip Push-Up", sets:3, reps:"10-12 / max", rest:"60s", note:"Myo-rep finisher — skull crushers to near-failure, then straight into close-grip push-ups to true failure, no rest between the two."}
      ]},
      { label: "Phase 1 (Wks 1-8) — Back/Rear Delts: GVT Overload", exercises: [
        {name:"Deadlift", sets:5, reps:"3", rest:"3min", note:"Kept heavy and low-volume on purpose — GVT's 10x10 is deliberately NOT applied to deadlift here. Spinal loading fatigues too fast at that volume to be worth the injury risk."},
        {name:"Barbell Row", sets:10, reps:"10", rest:"60s", note:"German Volume Training — same weight for all 10 sets. This is the volume-overload lift for back day."},
        {name:"Weighted Pull-Ups + Straight-Arm Pulldown", sets:3, reps:"max / 15", rest:"0s between, 90s after", note:"Giant set pairing — pull-ups to failure straight into pulldowns, no rest. 3 rounds."},
        {name:"Rear Delt Fly", sets:4, reps:"15 + drop", rest:"45s", note:"Drop set on every set, not just the last."},
        {name:"Face Pull", sets:3, reps:"20", rest:"45s", note:"Rest-pause on every set — to failure, 15s pause, keep going, 15s pause, finish it."}
      ]},
      { label: "Phase 1 (Wks 1-8) — Legs (Quad Emphasis): GVT Overload", exercises: [
        {name:"Barbell Back Squat", sets:10, reps:"10", rest:"90s", note:"German Volume Training — same weight for all 10 sets. Expect this to be the hardest single exercise block in the entire program."},
        {name:"Front Squat", sets:4, reps:"8-10 + drop", rest:"2min", note:"Drop set on every set."},
        {name:"Leg Press + Walking Lunge", sets:3, reps:"15 / 12 each leg", rest:"0s between, 2min after", note:"Giant set — leg press straight into walking lunges, no rest. 3 rounds."},
        {name:"Leg Extension", sets:4, reps:"15-20 + drop", rest:"45s", note:"Drop set on every set."},
        {name:"Standing Calf Raise", sets:5, reps:"15-20", rest:"30s", note:"Rest-pause on every set."}
      ]},
      { label: "Phase 1 (Wks 1-8) — Shoulders/Traps: GVT Overload", exercises: [
        {name:"Standing Overhead Press", sets:10, reps:"10", rest:"60s", note:"German Volume Training — same weight for all 10 sets."},
        {name:"Seated DB Press + Cable Lateral Raise", sets:3, reps:"10 / 15", rest:"0s between, 90s after", note:"Giant set. 3 rounds."},
        {name:"Egyptian Lateral Raise", sets:4, reps:"12-15 + drop", rest:"45s", note:"Drop set on every set."},
        {name:"Barbell Shrug", sets:4, reps:"12-15", rest:"45s", note:"Rest-pause on every set."},
        {name:"Reverse Pec Deck", sets:3, reps:"15-20", rest:"45s"}
      ]},
      { label: "Phase 1 (Wks 1-8) — Legs (Ham/Glute) + Arms: GVT Overload", exercises: [
        {name:"Romanian Deadlift", sets:5, reps:"6-8", rest:"2min", note:"Kept as heavy top sets, not GVT — hip-hinge volume at 10x10 fatigues too fast to be worth it back to back with squat day."},
        {name:"Hip Thrust", sets:4, reps:"10-12 + drop", rest:"90s", note:"Drop set on every set."},
        {name:"Seated Leg Curl", sets:4, reps:"15 + drop", rest:"60s", note:"Drop set on every set."},
        {name:"Barbell Curl + Hammer Curl", sets:3, reps:"10 / 10", rest:"0s between, 60s after", note:"Giant set. 3 rounds."},
        {name:"Skull Crusher", sets:3, reps:"10-12 + drop", rest:"60s", note:"Drop set on every set."}
      ]},
      { label: "Phase 2 (Wks 9-16) — Chest/Triceps: Failure Density", exercises: [
        {name:"Incline Barbell Press", sets:6, reps:"6-8 + rest-pause", rest:"2min", note:"Rest-pause on every set — to failure, 15s pause, push out 2-3 more, 15s pause, finish it."},
        {name:"Flat DB Press", sets:4, reps:"failure + drop + drop", rest:"90s", note:"Double drop set on every set — to failure, strip weight, failure again, strip again, finish."},
        {name:"Weighted Dips + Bench Dips to Failure", sets:3, reps:"max / max", rest:"0s between, 2min after", note:"Giant set, weighted dips straight into bodyweight bench dips. 3 rounds."},
        {name:"Cable Fly", sets:4, reps:"12-15 + drop", rest:"45s", note:"Drop set on every set."},
        {name:"Cable Tricep Pushdown", sets:4, reps:"failure + rest-pause", rest:"45s", note:"Rest-pause on every set."}
      ]},
      { label: "Phase 2 (Wks 9-16) — Back/Rear Delts: Failure Density", exercises: [
        {name:"Rack Pull", sets:5, reps:"3-5", rest:"3min", note:"Still kept low-volume and heavy — this is a strength anchor, not a place to stack intensity techniques."},
        {name:"Chest-Supported T-Bar Row", sets:5, reps:"failure + drop", rest:"90s", note:"Drop set on every set."},
        {name:"Single-Arm DB Row + Seated Cable Row", sets:3, reps:"10 each arm / 12", rest:"0s between, 90s after", note:"Giant set. 3 rounds."},
        {name:"Rear Delt Fly", sets:4, reps:"failure + drop + drop", rest:"45s", note:"Double drop set on every set."},
        {name:"Face Pull", sets:4, reps:"20 + rest-pause", rest:"45s", note:"Rest-pause on every set."}
      ]},
      { label: "Phase 2 (Wks 9-16) — Legs (Quad Emphasis): Failure Density", exercises: [
        {name:"Front Squat", sets:6, reps:"6-8 + rest-pause", rest:"3min", note:"Rest-pause on every set."},
        {name:"Hack Squat", sets:4, reps:"failure + drop", rest:"90s", note:"Drop set on every set."},
        {name:"Leg Press", sets:3, reps:"20+ + drop + drop", rest:"90s", note:"Double drop set on every set."},
        {name:"Walking Lunge (weighted) + Bodyweight Jump Squat", sets:3, reps:"12 each leg / max", rest:"0s between, 2min after", note:"Giant set. 3 rounds."},
        {name:"Standing Calf Raise (paused)", sets:5, reps:"15-20 + rest-pause", rest:"30s", note:"Rest-pause on every set."}
      ]},
      { label: "Phase 2 (Wks 9-16) — Shoulders/Traps: Failure Density", exercises: [
        {name:"Push Press", sets:6, reps:"5-6 + rest-pause", rest:"2-3min", note:"Rest-pause on every set."},
        {name:"Arnold Press", sets:4, reps:"failure + drop", rest:"90s", note:"Drop set on every set."},
        {name:"Cable Lateral Raise + Egyptian Lateral Raise", sets:3, reps:"15 / 15", rest:"0s between, 60s after", note:"Giant set. 3 rounds."},
        {name:"Barbell Shrug", sets:5, reps:"10-12 + rest-pause", rest:"45s", note:"Rest-pause on every set."},
        {name:"Reverse Pec Deck", sets:4, reps:"15-20 + drop", rest:"45s", note:"Drop set on every set."}
      ]},
      { label: "Phase 2 (Wks 9-16) — Legs (Ham/Glute) + Arms: Failure Density", exercises: [
        {name:"Stiff-Leg Deadlift", sets:5, reps:"6-8", rest:"2-3min", note:"Kept as heavy top sets — not the place for extra intensity techniques on a hip-hinge pattern this late in the week."},
        {name:"Hip Thrust", sets:5, reps:"failure + drop + drop", rest:"90s", note:"Double drop set on every set."},
        {name:"Lying Leg Curl", sets:4, reps:"failure + drop", rest:"60s", note:"Drop set on every set."},
        {name:"Preacher Curl + Cable Curl", sets:3, reps:"10 / 12", rest:"0s between, 60s after", note:"Giant set. 3 rounds."},
        {name:"EZ-Bar Skull Crusher", sets:4, reps:"failure + rest-pause", rest:"60s", note:"Rest-pause on every set."}
      ]},
    ]
  },
  {
    id: "ironclad_shred_protocol",
    icon: "🪒",
    name: "Ironclad Shred Protocol",
    desc: "Extreme fat-loss split for 6-12 months of aggressive cutting toward lean, chiseled, well-defined muscle. Full-body superset circuits every session, a HIIT finisher every time, and rest periods that get shorter as each phase progresses. 90-minute sessions, 5 days a week.",
    days: "5 days / week",
    accent: "#4A4F54",
    goal: ["cut", "recomp"],
    routines: [
      { label: "Phase 1 (Wks 1-8) — Full Body A: Upper (90s rest)", exercises: [
        {name:"Barbell Bench Press + Bent-Over Row", sets:4, reps:"8-10", rest:"90s", note:"Superset — no rest between the two exercises, rest 90s after completing both."},
        {name:"Push Press + Pull-Up", sets:3, reps:"8-10", rest:"90s", note:"Superset."},
        {name:"Dumbbell Shoulder Press + Face Pull", sets:3, reps:"12-15", rest:"90s", note:"Superset."},
        {name:"Cable Tricep Pushdown + Barbell Curl", sets:3, reps:"12-15", rest:"90s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"15 min", rest:"—"}
      ]},
      { label: "Phase 1 (Wks 1-8) — Full Body B: Lower (90s rest)", exercises: [
        {name:"Barbell Back Squat + Romanian Deadlift", sets:4, reps:"8-10", rest:"90s", note:"Superset."},
        {name:"Walking Lunge + Leg Curl", sets:3, reps:"12 each / 12-15", rest:"90s", note:"Superset."},
        {name:"Leg Press + Standing Calf Raise", sets:3, reps:"15-20", rest:"90s", note:"Superset."},
        {name:"Hanging Leg Raise + Cable Woodchopper", sets:3, reps:"15", rest:"90s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"15 min", rest:"—"}
      ]},
      { label: "Phase 1 (Wks 1-8) — Full Body C: Push + Metcon (90s rest)", exercises: [
        {name:"Incline Dumbbell Press + Chest-Supported Row", sets:4, reps:"10-12", rest:"90s", note:"Superset."},
        {name:"Arnold Press + Lat Pulldown", sets:3, reps:"10-12", rest:"90s", note:"Superset."},
        {name:"Dip + Inverted Row", sets:3, reps:"12-15", rest:"90s", note:"Superset."},
        {name:"Kettlebell Swing + Battle Ropes", sets:3, reps:"20", rest:"90s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"20 min", rest:"—"}
      ]},
      { label: "Phase 1 (Wks 1-8) — Full Body D: Pull + Metcon (90s rest)", exercises: [
        {name:"Deadlift + Push-Up", sets:4, reps:"8-10", rest:"90s", note:"Superset."},
        {name:"Single-Arm Dumbbell Row + Goblet Squat", sets:3, reps:"12 each / 12-15", rest:"90s", note:"Superset."},
        {name:"Cable Row + Reverse Lunge", sets:3, reps:"12-15", rest:"90s", note:"Superset."},
        {name:"Plank-to-Row + Mountain Climbers", sets:3, reps:"15 / 30s", rest:"90s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"20 min", rest:"—"}
      ]},
      { label: "Phase 1 (Wks 1-8) — Metabolic Burnout (90s rest)", exercises: [
        {name:"Barbell Complex (Deadlift-Row-Clean-Press)", sets:5, reps:"round", rest:"90s"},
        {name:"Sled Push / Prowler", sets:6, reps:"round", rest:"90s"},
        {name:"Battle Ropes + Box Jump", sets:4, reps:"20 / 10", rest:"90s", note:"Superset."},
        {name:"Farmer's Carry", sets:4, reps:"40 yards", rest:"90s"},
        {name:"HIIT Finisher", sets:1, reps:"20-25 min", rest:"—"}
      ]},
      { label: "Phase 2 (Wks 9-16) — Full Body A: Upper (45-60s rest)", exercises: [
        {name:"Flat Dumbbell Press + Chin-Up", sets:4, reps:"10-12", rest:"45-60s", note:"Superset, drop set on the last set."},
        {name:"Landmine Press + Renegade Row", sets:3, reps:"10-12", rest:"45-60s", note:"Superset."},
        {name:"Lateral Raise + Rear Delt Fly", sets:3, reps:"15", rest:"45-60s", note:"Superset."},
        {name:"Rope Pushdown + EZ-Bar Curl", sets:3, reps:"15", rest:"45-60s", note:"Superset, rest-pause on the last set."},
        {name:"HIIT Finisher", sets:1, reps:"15-20 min", rest:"—"}
      ]},
      { label: "Phase 2 (Wks 9-16) — Full Body B: Lower (45-60s rest)", exercises: [
        {name:"Front Squat + Stiff-Leg Deadlift", sets:4, reps:"10-12", rest:"45-60s", note:"Superset."},
        {name:"Bulgarian Split Squat + Lying Leg Curl", sets:3, reps:"12 each / 15", rest:"45-60s", note:"Superset."},
        {name:"Hack Squat + Seated Calf Raise", sets:3, reps:"15-20", rest:"45-60s", note:"Superset, drop set on the last set."},
        {name:"Weighted Sit-Up + Cable Crunch", sets:3, reps:"15-20", rest:"45-60s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"15-20 min", rest:"—"}
      ]},
      { label: "Phase 2 (Wks 9-16) — Full Body C: Push + Metcon (45-60s rest)", exercises: [
        {name:"Dumbbell Bench Press + Seal Row", sets:4, reps:"12-15", rest:"45-60s", note:"Superset."},
        {name:"Seated Dumbbell Press + Cable Row", sets:3, reps:"12-15", rest:"45-60s", note:"Superset."},
        {name:"Bench Dip + TRX Row", sets:3, reps:"15-20", rest:"45-60s", note:"Superset."},
        {name:"Kettlebell Swing + Burpee", sets:3, reps:"20", rest:"45-60s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"20-25 min", rest:"—"}
      ]},
      { label: "Phase 2 (Wks 9-16) — Full Body D: Pull + Metcon (45-60s rest)", exercises: [
        {name:"Trap Bar Deadlift + Clap Push-Up", sets:4, reps:"10-12", rest:"45-60s", note:"Superset."},
        {name:"Chest-Supported Row + Jump Squat", sets:3, reps:"12-15", rest:"45-60s", note:"Superset."},
        {name:"Seated Cable Row + Walking Lunge", sets:3, reps:"15", rest:"45-60s", note:"Superset."},
        {name:"Renegade Row + Mountain Climbers", sets:3, reps:"15 / 30s", rest:"45-60s", note:"Superset."},
        {name:"HIIT Finisher", sets:1, reps:"20-25 min", rest:"—"}
      ]},
      { label: "Phase 2 (Wks 9-16) — Metabolic Burnout (45-60s rest)", exercises: [
        {name:"Barbell Complex (Deadlift-Row-Clean-Press)", sets:6, reps:"round", rest:"45-60s"},
        {name:"Sled Push / Prowler", sets:8, reps:"round", rest:"45-60s"},
        {name:"Battle Ropes + Box Jump", sets:5, reps:"20 / 10", rest:"45-60s", note:"Superset."},
        {name:"Farmer's Carry", sets:5, reps:"40 yards", rest:"45-60s"},
        {name:"HIIT Finisher", sets:1, reps:"25-30 min", rest:"—"}
      ]},
    ]
  },
  {
    icon: "🏋️",
    name: "Kettlebell Foundations",
    desc: "Kettlebell fundamentals — swings, presses, and single-arm work to build a base with the bell.",
    days: "2 sessions",
    accent: "#7C3AED",
    goal: ["general"],
    routines: [
      { label: "Session 1 — Fundamentals", exercises: [
        {name:"Kettlebell Goblet Squat"},
        {name:"Kettlebell Swing"},
        {name:"Kettlebell Single Arm Press"},
        {name:"Kettlebell Romanian Deadlift"},
        {name:"Kettlebell Bent Over Row"}
      ]},
      { label: "Session 2 — Building Load", exercises: [
        {name:"Kettlebell Reverse Lunge"},
        {name:"Kettlebell Clean"},
        {name:"Kettlebell Halo"},
        {name:"Kettlebell Single Leg Deadlift"},
        {name:"Kettlebell Racked Carry"}
      ]},
    ]
  },
  {
    id: "kb_complex",
    icon: "🔥",
    name: "Kettlebell Complex Conditioning",
    desc: "Kettlebell complexes for conditioning — chained movements, minimal rest.",
    days: "2 sessions",
    accent: "#7C3AED",
    goal: ["general"],
    routines: [
      { label: "Complex A", exercises: [
        {name:"Kettlebell Clean and Press"},
        {name:"Kettlebell Snatch"},
        {name:"Kettlebell Single Arm Swing"},
        {name:"Kettlebell Turkish Get Up"},
        {name:"Kettlebell Overhead Carry"}
      ]},
      { label: "Complex B", exercises: [
        {name:"Kettlebell Bulgarian Split Squat"},
        {name:"Kettlebell Gorilla Row"},
        {name:"Kettlebell Figure 8"},
        {name:"Kettlebell Arm Bar"}
      ]},
    ]
  },
  {
    id: "trx_full_body",
    icon: "🪢",
    name: "TRX / Suspension Full Body",
    desc: "Suspension trainer push/pull split using bodyweight and TRX straps.",
    days: "2 sessions",
    accent: "#0891B2",
    goal: ["general"],
    routines: [
      { label: "Day A — Push & Core", exercises: [
        {name:"Suspension Chest Press"},
        {name:"Suspension Pike"},
        {name:"Suspension Tricep Extension"},
        {name:"Suspension Plank"},
        {name:"Suspension Mountain Climber"}
      ]},
      { label: "Day B — Pull & Legs", exercises: [
        {name:"Suspension Row"},
        {name:"Suspension Low Row"},
        {name:"Suspension Hamstring Curl"},
        {name:"Suspension Split Squat"},
        {name:"Suspension Reverse Lunge"},
        {name:"Suspension Bicep Curl"}
      ]},
    ]
  },
  {
    id: "landmine_strength",
    icon: "🔩",
    name: "Landmine Strength Circuit",
    desc: "Landmine-based pressing, squatting, and rotational strength work.",
    days: "2 sessions",
    accent: "#B45309",
    goal: ["general"],
    routines: [
      { label: "Day 1 — Press & Squat", exercises: [
        {name:"Landmine Single Arm Press"},
        {name:"Landmine Squat"},
        {name:"Landmine Front Squat"},
        {name:"Landmine Rotation"}
      ]},
      { label: "Day 2 — Hinge & Row", exercises: [
        {name:"Landmine Deadlift"},
        {name:"Landmine RDL"},
        {name:"Landmine Row"},
        {name:"Landmine Split Squat"},
        {name:"Landmine Good Morning"}
      ]},
    ]
  },
  {
    id: "sandbag_conditioning",
    icon: "🏖️",
    name: "Sandbag Conditioning",
    desc: "Full-body sandbag conditioning session.",
    days: "1 session",
    accent: "#B45309",
    goal: ["general"],
    routines: [
      { label: "Full Body Sandbag Session", exercises: [
        {name:"Sandbag Deadlift"},
        {name:"Sandbag Clean"},
        {name:"Sandbag Front Squat"},
        {name:"Sandbag Overhead Press"},
        {name:"Sandbag Bent Over Row"},
        {name:"Sandbag Carry"}
      ]},
    ]
  },
  {
    id: "medball_power",
    icon: "💥",
    name: "Medicine Ball Power",
    desc: "Medicine ball power finisher — slams, throws, and rotational power.",
    days: "1 session",
    accent: "#DC2626",
    goal: ["general"],
    routines: [
      { label: "Power Finisher", exercises: [
        {name:"Medicine Ball Slam"},
        {name:"Medicine Ball Rotational Throw"},
        {name:"Medicine Ball Overhead Slam"},
        {name:"Medicine Ball Chest Pass"},
        {name:"Medicine Ball Squat to Press"}
      ]},
    ]
  },
  {
    id: "superband_total",
    icon: "🏹",
    name: "SuperBand Total Body",
    desc: "Band-only total body session — travel or home friendly.",
    days: "1 session",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Home / Travel Session", exercises: [
        {name:"SuperBand Deadlift"},
        {name:"SuperBand Row"},
        {name:"SuperBand Chest Fly"},
        {name:"SuperBand Squat"},
        {name:"SuperBand Pallof Press"},
        {name:"SuperBand Face Pull"}
      ]},
    ]
  },
  {
    id: "stability_ball_core",
    icon: "⚪",
    name: "Stability Ball Core",
    desc: "Stability ball core circuit.",
    days: "1 session",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Core Circuit", exercises: [
        {name:"Stability Ball Pike"},
        {name:"Stability Ball Rollout"},
        {name:"Stability Ball Dead Bug"},
        {name:"Stability Ball Plank"},
        {name:"Stability Ball Hamstring Curl"}
      ]},
    ]
  },
  {
    id: "pilates_mat",
    icon: "🧘",
    name: "Pilates Mat Fundamentals",
    desc: "Mat Pilates — beginner and intermediate flows.",
    days: "2 flows",
    accent: "#DB2777",
    goal: ["general"],
    routines: [
      { label: "Beginner Mat Flow", exercises: [
        {name:"Pilates The Hundred"},
        {name:"Pilates Roll-Up"},
        {name:"Pilates Single Leg Circle"},
        {name:"Pilates Double Leg Stretch"},
        {name:"Pilates Spine Stretch Forward"}
      ]},
      { label: "Intermediate Mat Flow", exercises: [
        {name:"Pilates Teaser"},
        {name:"Pilates Side Kick Series"},
        {name:"Pilates Swan"},
        {name:"Pilates Saw"},
        {name:"Pilates Shoulder Bridge"}
      ]},
    ]
  },
  {
    id: "yoga_mobility",
    icon: "🧘‍♀️",
    name: "Yoga Mobility Flow",
    desc: "Yoga-based mobility flow — morning and recovery sequences.",
    days: "2 flows",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Morning Flow", exercises: [
        {name:"Yoga Sun Salutation A"},
        {name:"Yoga Downward-Facing Dog"},
        {name:"Yoga Warrior I"},
        {name:"Yoga Warrior II"},
        {name:"Yoga Chair Pose"},
        {name:"Yoga Tree Pose"}
      ]},
      { label: "Recovery Flow", exercises: [
        {name:"Yoga Cat-Cow Stretch"},
        {name:"Yoga Pigeon Pose"},
        {name:"Yoga Cobra Pose"},
        {name:"Yoga Child's Pose"},
        {name:"Yoga Triangle Pose"},
        {name:"Yoga Bridge Pose"}
      ]},
    ]
  },
  {
    id: "foam_roller_recovery",
    icon: "🧊",
    name: "Foam Roller / Lacrosse Ball Recovery",
    desc: "Foam roller and lacrosse ball recovery session.",
    days: "1 session",
    accent: "#059669",
    goal: ["general"],
    routines: [
      { label: "Full Body Recovery", exercises: [
        {name:"Foam Roller Quad Smash"},
        {name:"Foam Roller Hamstring"},
        {name:"Foam Roller Lat"},
        {name:"Foam Roller Glute"},
        {name:"Foam Roller Calf"},
        {name:"Foam Roller Upper Back"},
        {name:"Lacrosse Ball Glute Release"},
        {name:"Lacrosse Ball Hip Flexor Release"}
      ]},
    ]
  },
  {
    id: "ironclad_tabata_blitz",
    icon: "⏱️",
    name: "Ironclad Tabata Blitz",
    desc: "True Tabata protocol — 20 seconds of genuine max-effort work, 10 seconds rest, 8 rounds per exercise, exactly 4 brutal minutes per block. Not a general HIIT circuit wearing the Tabata name — this is the actual research protocol, at the intensity it demands.",
    days: "20-30 min · 3-4 days / week",
    accent: "#EA580C",
    goal: ["cut", "general"],
    routines: [
      { label: "Lower Body Tabata", exercises: [
        {name:"Squat Jumps", sets:8, reps:"20s work", rest:"10s", note:"True Tabata block: 8 rounds of 20s max effort / 10s rest = 4 minutes exactly. Rest 60s before the next block."},
        {name:"Kettlebell Swings", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Walking Lunge (bodyweight, fast)", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Box Jumps", sets:8, reps:"20s work", rest:"10s", note:"Final 4-minute Tabata block. Step down between reps, never jump down — that's where Tabata sessions actually get people hurt."}
      ]},
      { label: "Upper Body Tabata", exercises: [
        {name:"Push-Ups", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Battle Ropes", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Dumbbell Thrusters", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Go lighter than you think — form has to hold for all 8 rounds. Rest 60s before the next."},
        {name:"Renegade Rows", sets:8, reps:"20s work", rest:"10s", note:"Final 4-minute Tabata block."}
      ]},
      { label: "Full Body Tabata", exercises: [
        {name:"Burpees", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block — the original Tabata exercise from Dr. Izumi Tabata's actual research. Rest 60s before the next."},
        {name:"Kettlebell Swings", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Jump Squats", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Mountain Climbers", sets:8, reps:"20s work", rest:"10s", note:"Final 4-minute Tabata block."}
      ]},
      { label: "Core Tabata", exercises: [
        {name:"Plank Shoulder Taps", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Russian Twists", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Bicycle Crunches", sets:8, reps:"20s work", rest:"10s", note:"4-minute Tabata block. Rest 60s before the next."},
        {name:"Flutter Kicks", sets:8, reps:"20s work", rest:"10s", note:"Final 4-minute Tabata block."}
      ]},
    ]
  }
];

// Node/CommonJS export guard (no-op in the browser) so this file can also be
// validated with `node --check` and imported by build/test scripts if needed.
if (typeof module !== 'undefined' && module.exports) { module.exports = { BUNDLES }; }
