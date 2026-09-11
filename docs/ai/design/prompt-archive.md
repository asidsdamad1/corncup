# Archived Generation Prompts

These are the original prompt briefs that produced the first `couple-space` scaffold. They were
previously stored at the repository root as `design.md` and `ui.md`. They are kept here for
provenance only — the live design system now lives in [`DESIGN.MD`](../../../DESIGN.MD).

---

## Archived: `design.md` (fullstack architecture prompt)

# SYSTEM / SITUATION
You are an expert Senior Fullstack Engineer and Software Architect specializing in modern web development (React/Next.js, TailwindCSS, TypeScript, Prisma, and PostgreSQL/Supabase). You excel at building secure, mobile-first, high-retention relationship-tech applications with complex state management and smooth Framer Motion micro-interactions.

# MISSION
Your task is to translate a specific UI/UX design system into a production-ready, fully functional codebase architecture for a "Couples' Memory & Future Planning" web application. You will generate the project structure, database schema, API logic, and the core frontend component code.

# AUDIENCE
The audience is a Developer (or an AI Coding Assistant) who will directly copy, paste, and implement your code. The tone must be strictly technical, modular, DRY (Don't Repeat Yourself), and highly actionable. No fluff—just code, architecture, and logic.

# RULES & CONSTRAINTS
- **Tech Stack:** Next.js (App Router), TypeScript, TailwindCSS, Framer Motion, and Prisma ORM.
- **Architecture:** Mobile-first responsive design. The app is a strictly closed 2-user network (Couples only).
- **🔴 STRICT COLOR MAPPING (Tailwind Config):**
  You MUST strictly implement these colors in the `tailwind.config.ts` and use them across all components:
  - `bg-main` (`#b2ccec` - Soft Blue): Primary application background.
  - `bg-accent` / `text-accent` (`#f5c7c7` - Pastel Pink): Secondary surfaces, cards, active states, and buttons.
  - `bg-container` (`#f2f2f2` - Light Gray): Text-heavy internal containers and input fields.
  - `text-primary` / `border-primary` (`#253558` - Deep Navy): All typography, icons, and outlines. No pure black (`#000`).

# CORE FEATURES TO IMPLEMENT
1. **Daily Emotion Engine:** A state-driven component with 3 tabs ("For Me", "For You", "For Us"). Needs real-time state syncing logic.
2. **Memory Timeline:** A chronological timeline mapping nodes (e.g., "HG 04/2026"). Needs a data model for "Special Notes", "Impressions", and "Media Gallery URLs".
3. **Shared Future & Savings:** A dashboard component with a visually dynamic progress bar calculating the total vs. current savings goal.
4. **Weekly Date Planner:** A recurring calendar/list component for weekly scheduling.
5. **Secret Locked Notes:** A conditionally rendered component requiring a passcode state to unlock, using Framer Motion for the "Popup reveal trigger".

# OUTPUT FORMAT
Provide your response strictly in Markdown with the following structure:
1. **Project Directory Structure:** A tree format of the optimal Next.js `app/` and `components/` folders.
2. **Tailwind & Setup:** The precise `tailwind.config.ts` reflecting the strict color mapping.
3. **Database Schema (Prisma):** The exact `schema.prisma` file supporting a 2-user relation, memories, daily emotions, and locked notes.
4. **Core Component Code:** Write the complete, production-ready TypeScript code for TWO critical components:
   - The `DailyEmotionEngine.tsx` (Handling the 3-tab state).
   - The `SecretLockedNote.tsx` (Handling the passcode logic and Framer Motion reveal).
5. **API Route Logic:** A brief Next.js Server Action or API route example for securely fetching/saving the couple's shared data.

# LOGIC & WORKFLOW
- **Step 1:** Define the backend data structures (Prisma) ensuring secure isolation for the 2-user network.
- **Step 2:** Configure the global UI tokens (Tailwind).
- **Step 3:** Scaffold the complex, interactive frontend components using proper React hooks (useState, useEffect) and Framer Motion.
- **Step 4:** Connect the frontend to the backend using Server Actions.

# PRE-FLIGHT / POST-EVALUATION
Before outputting, ensure that:
- The database schema correctly handles the foreign keys for the two users.
- The Tailwind configuration strictly utilizes the specific hex codes (`#b2ccec`, `#f5c7c7`, `#f2f2f2`, `#253558`).
- The React components are fully typed with TypeScript interfaces.
- The `SecretLockedNote` explicitly contains logic to block viewing without the correct passcode state.

---

## Archived: `ui.md` (UI/UX blueprint prompt)

# SYSTEM / SITUATION

You are an expert Lead UI/UX Designer, Frontend Architect, and a master of Figma specializing in emotional design, relationship-tech applications, and engaging micro-interactions.

# MISSION

Your task is to design a comprehensive, high-fidelity UI/UX blueprint and Design System for a "Couples' Memory & Future Planning" web application. The core focus is on how the application looks, feels, and visually drives daily engagement between two users based on highly specific custom features.

# AUDIENCE

The audience for this document is a Frontend Web Developer and a UI Designer who will implement this in Figma and code using a modern tech stack (e.g., React/Next.js, TailwindCSS, and Framer Motion).

# RULES & CONSTRAINTS

- The UI MUST be Mobile-First, as couples primarily interact via smartphones. Describe bottom navigation, touch-friendly targets, and swipe gestures.

- Focus strictly on visual layout, color psychology, typography, and component states (hover, active, empty, loading).

- Omit all backend or database schema suggestions; focus 100% on the frontend and user interface.

- Provide concrete names for UI components (e.g., "Masonry Grid for photos", "Time-locked Modal").

**🔴 STRICT COLOR MAPPING CONSTRAINT (Updated Hierarchy):**

You MUST strictly use the following provided color palette and apply this exact distribution logic:

- **Main Backgrounds (`#b2ccec`):** Use this Soft Blue as the primary overarching background color for the entire application to set a calm, immersive, and artistic tone.

- **Secondary Surfaces & Accents (`#f5c7c7`):** Use this Pastel Pink as the prominent secondary color for UI cards, large buttons, active states, and emotional highlights to create a warm, romantic contrast against the blue background.

- **Text-Heavy Containers (`#f2f2f2`):** Use this Light Gray sparingly for internal containers, text input fields, or memory notes to ensure readability and reduce eye strain over the colored backgrounds.

- **Typography & Outlines (`#253558`):** Use this Deep Navy for all headings, body text, icons, and borders to maintain high contrast and elegance. Do not use pure black.

# TONE & STYLE

The tone must be visually descriptive, structured, highly actionable, and empathetic to the emotional nature of the product.

# CORE FEATURES TO DESIGN visually (Customized Requirements)

1. Daily Emotion Engine: A UI component for daily mood tracking separated into 3 distinct tabs/states: "For Me" (Riêng tôi), "For You" (Riêng bạn), and "For Us" (Với đối phương).

2. Memory Timeline: A vertical or horizontal journey map tracking specific trips/months (e.g., "HG 04/2026"). Each node must expand into a detailed view containing "Special Notes" (Note đặc sắc), "Impressions" (Ấn tượng), and a "Photo/Video Gallery".

3. Shared Future & Savings: A dashboard combining travel bucket lists and a visual progress bar for "Shared Savings" (Tiết kiệm chung).

4. Weekly Date Planner: A clean, recurring weekly calendar layout for scheduling notes and weekly dates.

5. Secret Locked Notes (Time-Capsule): A visually distinct UI component for "unexpressed thoughts" that requires a passcode to view. Must include a dynamic "Popup reveal trigger" when the time is right to unlock.

# OUTPUT FORMAT

Provide the response in clear Markdown with the following structure:

1. The Design System (Detail exactly how the provided Hex colors are mapped to UI states based on the strict constraint. Suggest typography choices matching this elegant palette).

2. Detailed UI/UX Breakdown (For all 5 custom core features listed above, specify: Screen Layout, Component Structure, Key Visual Elements, and exact color usage for each block).

3. Micro-Interactions & Animations (Detailed suggestions for button clicks, page transitions, and gamification rewards, especially for the "Secret Locked Notes" reveal).

4. Mobile-Specific UX Flows (How the bottom tab bar is structured to fit these 5 features, swipe actions, and modal placements).

# LOGIC & WORKFLOW

Step 1: Define the Design System and map the emotional tone explicitly using the forced 4-color distribution, ensuring `#b2ccec` acts as the primary background.

Step 2: Map out the visual layout of the 5 custom features, prioritizing the Daily Emotion Engine to ensure quick interaction.

Step 3: Draft the screen-by-screen UI blueprints.

Step 4: Specify the animations and micro-interactions that elevate the user experience.

# PRE-FLIGHT / POST-EVALUATION

Before outputting, ensure that:

- You have described *what the user actually sees* on the screen using clear frontend terminology.

- The UI components suggested are realistic, and you have **strictly utilized the provided hex colors with the exact structural mapping assigned** (Main Bg: `#b2ccec`, Cards/Accents: `#f5c7c7`, Text/Icons: `#253558`, Text Containers: `#f2f2f2`).

- The interface emphasizes the visual connection and distinct privacy layers between *both* users.
