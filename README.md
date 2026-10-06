# CodeVerse — Visual AI Coding Academy

A GitHub-ready React/Vite starter for an AI-powered programming school built around one idea:

> Don't just read code. See it happen.

## Included

- AI Teacher chat panel with guided/Socratic teaching UI
- Visual execution simulator with step controls and speed control
- Variables/memory visualization
- Live output console
- Python / JavaScript / HTML / CSS / C++ language selector
- Learn dashboard and skill map
- Project Studio
- Coding Challenges
- Debug Detective
- Algorithm/Data Structure visual lab
- Career paths and interview simulator
- XP, streak, achievements and progress UI
- What-if experiments
- Code prediction mode
- Responsive dark interface
- Local browser persistence for progress/settings

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## AI integration

The UI intentionally keeps the AI provider behind `/api/ai`. Add a server/edge function that accepts the lesson context, code, learner state and message, then returns a safe JSON response.

Do NOT put private API keys in `VITE_*` variables. For production, keep provider credentials server-side.

## Production roadmap

The front-end is a functional product shell and interactive prototype. To turn it into a complete learning platform, connect:

1. Sandboxed multi-language code execution service
2. Streaming LLM endpoint
3. Authentication/database
4. Persistent lesson/project storage
5. WebSocket collaboration
6. GitHub OAuth/API
7. Test runner and profiler
8. Secure project/container isolation
9. Curriculum/content CMS
10. Payments/subscriptions if needed

## Safety

Never execute arbitrary user code directly in the web server process. Use isolated containers/microVMs with resource limits, network policy, timeouts and filesystem isolation.