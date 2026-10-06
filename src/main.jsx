import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bot, Brain, Bug, CheckCircle2, ChevronRight, Code2, Compass, Flame,
  Gauge, GitBranch, GraduationCap, Hammer, Home, Layers3, Lightbulb,
  ListChecks, Menu, MessageCircle, Play, RotateCcw, Search, Send,
  Settings2, ShieldCheck, Sparkles, Swords, Trophy, Users, WandSparkles,
  X, Zap, Eye, Database, Terminal, Target, Clock3
} from "lucide-react";
import "./styles.css";

const LANGS = ["Python","JavaScript","HTML","CSS","C++","Java","C","Rust","Go","TypeScript"];
const lessons = [
  {id:1, title:"Variables: Your Program's Memory", lang:"Python", level:"Beginner", xp:80, progress:100, icon:"🧠"},
  {id:2, title:"Conditions & Decisions", lang:"Python", level:"Beginner", xp:90, progress:72, icon:"🔀"},
  {id:3, title:"Loops: Repeat With Purpose", lang:"Python", level:"Beginner", xp:100, progress:48, icon:"🔁"},
  {id:4, title:"Functions & Scope", lang:"Python", level:"Beginner", xp:120, progress:20, icon:"🧩"},
  {id:5, title:"Arrays & Data Structures", lang:"JavaScript", level:"Intermediate", xp:160, progress:0, icon:"🗃️"},
  {id:6, title:"Algorithms: Search & Sort", lang:"JavaScript", level:"Intermediate", xp:200, progress:0, icon:"⚙️"},
];

const challenges = [
  {title:"Reverse a String", difficulty:"Easy", xp:100, lang:"Python", time:"10 min"},
  {title:"Find the Missing Number", difficulty:"Medium", xp:220, lang:"JavaScript", time:"20 min"},
  {title:"Build a Stack", difficulty:"Medium", xp:280, lang:"C++", time:"25 min"},
  {title:"Shortest Path", difficulty:"Hard", xp:500, lang:"Python", time:"45 min"}
];

const projects = [
  {name:"Neon Todo", tag:"Web", desc:"Build a polished task manager while learning DOM events, state and persistence.", progress:64, emoji:"✨"},
  {name:"Robot Rescue", tag:"Python", desc:"Program a robot through obstacles using loops, conditions and functions.", progress:32, emoji:"🤖"},
  {name:"Mini Chat App", tag:"Full Stack", desc:"Learn APIs, async code, authentication concepts and data flow.", progress:10, emoji:"💬"},
];

function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState("Python");
  const [code, setCode] = useState(`x = 10
y = 20
z = x + y
print(z)`);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [aiMessages, setAiMessages] = useState([
    {role:"ai", text:"Hi! I'm your CodeVerse teacher. Don't just run the code—predict what happens first. What do you think z will contain?"}
  ]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");
  const [xp, setXp] = useState(() => Number(localStorage.getItem("cv_xp") || 1240));

  useEffect(() => localStorage.setItem("cv_xp", String(xp)), [xp]);

  const execution = useMemo(() => [
    {line:1, text:"Create x", vars:{x:"10", y:"—", z:"—"}, output:""},
    {line:2, text:"Create y", vars:{x:"10", y:"20", z:"—"}, output:""},
    {line:3, text:"Calculate z = x + y", vars:{x:"10", y:"20", z:"30"}, output:""},
    {line:4, text:"Print z", vars:{x:"10", y:"20", z:"30"}, output:"30"}
  ], []);

  const current = execution[Math.min(step, execution.length - 1)];

  function notify(msg) {
    setToast(msg); setTimeout(() => setToast(""), 2200);
  }

  function runCode() {
    setRunning(true);
    setStep(0);
    let s = 0;
    const id = setInterval(() => {
      s++;
      setStep(Math.min(s, execution.length - 1));
      if (s >= execution.length - 1) { clearInterval(id); setRunning(false); setXp(v => v + 10); }
    }, 700 / speed);
  }

  async function askAI() {
    if (!input.trim()) return;
    const user = input.trim();
    setAiMessages(m => [...m, {role:"user", text:user}]);
    setInput("");
    const fallback = user.toLowerCase().includes("variable")
      ? "Think of a variable as a named box. The name lets your program find a value again. In our visualizer, x and y are boxes; z is created from their values."
      : "Let's reason it out instead of jumping to the answer. Look at the highlighted line, identify the values entering it, then predict the new state. Try telling me what you expect next.";
    setTimeout(() => setAiMessages(m => [...m, {role:"ai", text:fallback}]), 350);
  }

  const nav = [
    ["home","Home",Home], ["learn","Learn",GraduationCap], ["playground","Playground",Code2],
    ["visual","Visual Lab",Eye], ["projects","Projects",Hammer], ["challenges","Challenges",Swords],
    ["debug","Debug Detective",Bug], ["career","Career",Target]
  ];

  return <div className="app">
    <aside className={"sidebar " + (mobileOpen ? "open":"")}>
      <div className="brand">
        <div className="brand-mark"><Sparkles size={18}/></div>
        <div><b>CodeVerse</b><span>See your code think.</span></div>
        <button className="icon-btn close-mobile" onClick={()=>setMobileOpen(false)}><X size={18}/></button>
      </div>
      <div className="nav-label">LEARNING</div>
      {nav.map(([id,label,Icon]) => <button key={id} className={"nav-item "+(page===id?"active":"")} onClick={()=>{setPage(id);setMobileOpen(false)}}><Icon size={18}/><span>{label}</span></button>)}
      <div className="nav-label">TOOLS</div>
      <button className="nav-item" onClick={()=>notify("GitHub integration is ready for your backend.")}><GitBranch size={18}/><span>Git & GitHub</span></button>
      <button className="nav-item" onClick={()=>notify("Collaboration room created.")}><Users size={18}/><span>Collaborate</span></button>
      <div className="sidebar-bottom">
        <div className="mini-profile"><div className="avatar">C</div><div><b>Coder</b><span>Level 12 · 1,240 XP</span></div></div>
        <button className="nav-item"><Settings2 size={18}/><span>Settings</span></button>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="icon-btn mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={21}/></button>
        <div className="crumb"><span>CodeVerse</span><ChevronRight size={14}/><b>{nav.find(n=>n[0]===page)?.[1] || "Home"}</b></div>
        <div className="top-actions">
          <div className="streak"><Flame size={17}/><b>12</b><span>day streak</span></div>
          <div className="xp-pill"><Zap size={15}/> {xp.toLocaleString()} XP</div>
          <button className="avatar top-avatar">C</button>
        </div>
      </header>

      {page==="home" && <HomePage setPage={setPage} notify={notify} xp={xp}/>}
      {page==="learn" && <LearnPage setPage={setPage}/>}
      {page==="playground" && <Playground lang={lang} setLang={setLang} code={code} setCode={setCode} runCode={runCode} running={running} current={current} step={step} setStep={setStep} speed={speed} setSpeed={setSpeed} aiMessages={aiMessages} input={input} setInput={setInput} askAI={askAI}/>}
      {page==="visual" && <VisualLab current={current} step={step} setStep={setStep} runCode={runCode} running={running}/>}
      {page==="projects" && <Projects notify={notify}/>}
      {page==="challenges" && <Challenges notify={notify}/>}
      {page==="debug" && <DebugPage notify={notify}/>}
      {page==="career" && <Career/>}

      {toast && <div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
    </main>
  </div>
}

function HomePage({setPage, notify, xp}) {
  return <div className="content">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={14}/> AI-powered visual learning</div>
        <h1>Don't just learn code.<br/><span>See it happen.</span></h1>
        <p>Learn programming through real execution, animated memory, experiments, debugging and an AI teacher that adapts to you.</p>
        <div className="hero-actions">
          <button className="primary" onClick={()=>setPage("playground")}><Play size={17}/> Continue learning</button>
          <button className="secondary" onClick={()=>setPage("visual")}><Eye size={17}/> Open Visual Lab</button>
        </div>
      </div>
      <div className="hero-orbit">
        <div className="orbit-card main-orbit"><div className="code-line"><span>z</span><b>=</b><span>x</span><b>+</b><span>y</span></div><div className="arrow">↓</div><div className="result">30</div><small>LIVE EXECUTION</small></div>
        <div className="float-card one">🧠 <b>Memory</b><span>x → 10</span></div>
        <div className="float-card two">🐛 <b>Debug</b><span>Found line 14</span></div>
        <div className="float-card three">⚡ <b>+10 XP</b><span>Challenge complete</span></div>
      </div>
    </section>

    <div className="stats-grid">
      <Stat icon={<Flame/>} value="12" label="Day streak" meta="Keep it going"/>
      <Stat icon={<Trophy/>} value="18" label="Achievements" meta="+2 this week"/>
      <Stat icon={<Code2/>} value="42" label="Challenges" meta="8 completed"/>
      <Stat icon={<Brain/>} value="71%" label="Skill mastery" meta="+9% this month"/>
    </div>

    <div className="section-head"><div><span className="eyebrow">YOUR PATH</span><h2>Continue your journey</h2></div><button className="text-btn" onClick={()=>setPage("learn")}>View all <ChevronRight size={16}/></button></div>
    <div className="lesson-grid">{lessons.slice(0,4).map(l=><LessonCard key={l.id} l={l} onClick={()=>setPage("playground")}/>)}</div>

    <div className="two-col">
      <section className="panel">
        <div className="panel-head"><div><span className="eyebrow">AI TEACHER</span><h3>Your next best step</h3></div><Bot className="accent-icon"/></div>
        <div className="teacher-tip"><div className="teacher-avatar"><Bot size={22}/></div><div><b>Try prediction mode</b><p>Before running your loop, predict its output. I’ll explain the difference between your prediction and reality.</p><button className="small-btn" onClick={()=>setPage("playground")}>Try it <ChevronRight size={14}/></button></div></div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><span className="eyebrow">TODAY</span><h3>Daily mission</h3></div><Target className="accent-icon"/></div>
        <div className="mission"><div className="mission-icon">🎯</div><div><b>Repair the Robot</b><p>Fix 3 bugs using conditions and loops.</p><div className="progress"><i style={{width:"66%"}}/></div></div><strong>+120 XP</strong></div>
      </section>
    </div>
  </div>
}

function Stat({icon,value,label,meta}) { return <div className="stat"><div className="stat-icon">{icon}</div><div><b>{value}</b><span>{label}</span><small>{meta}</small></div></div> }

function LessonCard({l,onClick}) {
  return <button className="lesson-card" onClick={onClick}>
    <div className="lesson-top"><span className="lesson-emoji">{l.icon}</span><span className="tag">{l.level}</span></div>
    <h3>{l.title}</h3><small>{l.lang} · {l.xp} XP</small>
    <div className="progress"><i style={{width:l.progress+"%"}}/></div><div className="lesson-foot"><span>{l.progress}% complete</span><ChevronRight size={16}/></div>
  </button>
}

function LearnPage({setPage}) {
  return <div className="content">
    <PageTitle eyebrow="CURRICULUM" title="Learn programming, visually" sub="A skill graph that adapts to what you actually understand."/>
    <div className="skill-map">
      <div className="skill-center">PROGRAMMING<br/><small>Level 12</small></div>
      {["Variables","Conditions","Loops","Functions","Data Structures","Algorithms","OOP","Architecture"].map((x,i)=><div className={"skill-node n"+i} key={x}><span>{i<4?"✓":"+"}</span>{x}<small>{i<4?"Mastered":"Locked"}</small></div>)}
    </div>
    <div className="section-head"><div><span className="eyebrow">ALL LESSONS</span><h2>Build your foundation</h2></div><div className="filter"><Search size={15}/><span>Search lessons</span></div></div>
    <div className="lesson-grid">{lessons.map(l=><LessonCard key={l.id} l={l} onClick={()=>setPage("playground")}/>)}</div>
  </div>
}

function Playground({lang,setLang,code,setCode,runCode,running,current,step,setStep,speed,setSpeed,aiMessages,input,setInput,askAI}) {
  return <div className="content">
    <PageTitle eyebrow="PLAYGROUND" title="Loops & variables" sub="Predict → run → visualize → understand."/>
    <div className="workspace">
      <section className="editor-panel">
        <div className="workspace-bar"><div className="lang-tabs">{LANGS.slice(0,6).map(x=><button className={lang===x?"selected":""} key={x} onClick={()=>setLang(x)}>{x}</button>)}</div><div className="editor-actions"><button className="ghost"><RotateCcw size={15}/></button><button className="run" onClick={runCode} disabled={running}><Play size={15}/>{running?"Running":"Run"}</button></div></div>
        <div className="code-editor"><div className="line-numbers">{code.split("\n").map((_,i)=><span className={current.line===i+1?"active-line":""} key={i}>{i+1}</span>)}</div><textarea spellCheck="false" value={code} onChange={e=>setCode(e.target.value)} /></div>
        <div className="output"><div className="output-head"><Terminal size={14}/> OUTPUT <span>Python sandbox preview</span></div><pre>{current.output || "Run the code to see output."}</pre></div>
      </section>

      <section className="visual-panel">
        <div className="visual-head"><div><span className="eyebrow">LIVE VISUALIZER</span><h3>Execution state</h3></div><div className="speed"><Gauge size={14}/><select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option></select></div></div>
        <div className="execution-stage">
          <div className="memory-title"><Database size={15}/> MEMORY</div>
          <div className="memory-grid">{Object.entries(current.vars).map(([k,v])=><div className="memory-box" key={k}><span>{k}</span><b>{v}</b></div>)}</div>
          <div className="execution-line"><span>STEP {step+1}/4</span><b>{current.text}</b></div>
          <div className="timeline">{[0,1,2,3].map(i=><button key={i} className={i<=step?"on":""} onClick={()=>setStep(i)}>{i+1}</button>)}</div>
          <div className="visual-output">{current.output ? <><span>OUTPUT</span><b>{current.output}</b></> : <span>Waiting for execution…</span>}</div>
        </div>
        <div className="visual-controls"><button onClick={()=>setStep(Math.max(0,step-1))}>⏮</button><button className="play-round" onClick={runCode}><Play size={17}/></button><button onClick={()=>setStep(Math.min(3,step+1))}>⏭</button></div>
      </section>

      <section className="ai-panel">
        <div className="ai-head"><div className="ai-avatar"><Bot size={18}/></div><div><b>CodeVerse Teacher</b><span>Guided · Socratic mode</span></div><span className="online">●</span></div>
        <div className="ai-chat">{aiMessages.map((m,i)=><div className={"bubble "+m.role} key={i}>{m.text}</div>)}</div>
        <div className="ai-suggestions"><button onClick={()=>setInput("Why is z equal to 30?")}>Why?</button><button onClick={()=>setInput("Give me a hint")}>Hint</button><button onClick={()=>setInput("Show me visually")}>Show visually</button></div>
        <div className="ai-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} placeholder="Ask your teacher…"/><button onClick={askAI}><Send size={16}/></button></div>
      </section>
    </div>
  </div>
}

function VisualLab({current,step,setStep,runCode,running}) {
  const items=["Array","Linked List","Stack","Queue","Binary Tree","Graph","Hash Table"];
  return <div className="content">
    <PageTitle eyebrow="VISUAL LAB" title="Make invisible concepts visible" sub="Explore memory, data structures and algorithms as living diagrams."/>
    <div className="lab-tabs">{items.map((x,i)=><button className={i===0?"active":""} key={x}>{x}</button>)}</div>
    <div className="visual-lab-grid">
      <div className="big-lab panel"><div className="panel-head"><div><span className="eyebrow">DATA STRUCTURE</span><h3>Dynamic Array</h3></div><button className="small-btn">What if?</button></div><div className="array-visual">{[10,20,30,40].map((x,i)=><div key={i} className="array-cell"><small>{i}</small><b>{x}</b></div>)}<button className="add-cell">+50</button></div><div className="lab-explain"><Lightbulb size={17}/><span><b>Try it:</b> Press +50 and watch the array expand. Then ask the AI why dynamic arrays sometimes need to copy their data.</span></div></div>
      <div className="panel algorithm-card"><div className="panel-head"><div><span className="eyebrow">ALGORITHM</span><h3>Binary Search</h3></div><span className="complexity">O(log n)</span></div><div className="bars">{[20,32,45,57,69,81,94].map((h,i)=><div key={i} className={i===3?"bar selected": "bar"} style={{height:h+"%"}}><span>{i*10+10}</span></div>)}</div><div className="algorithm-foot"><span>Step {step+1}/7</span><div><button onClick={()=>setStep(Math.max(0,step-1))}>←</button><button onClick={()=>setStep(Math.min(6,step+1))}>→</button></div></div></div>
    </div>
  </div>
}

function Projects({notify}) {
  return <div className="content"><PageTitle eyebrow="PROJECT STUDIO" title="Build real things" sub="Projects become guided learning paths instead of copy-paste generators."/>
    <div className="project-hero"><div><span className="eyebrow">AI PROJECT BUILDER</span><h2>What do you want to build?</h2><p>Describe an idea and CodeVerse breaks it into architecture, lessons, milestones and code tasks.</p><div className="prompt-box"><Sparkles size={18}/><input placeholder="e.g. Build a multiplayer quiz app…"/><button onClick={()=>notify("Project blueprint generated.")}><WandSparkles size={17}/> Generate</button></div></div><div className="blueprint"><span>PROJECT BLUEPRINT</span><div>Idea</div><b>Architecture</b><div>Lessons</div><div>Milestones</div><div>Testing</div><div>Deploy</div></div></div>
    <div className="section-head"><div><span className="eyebrow">YOUR PROJECTS</span><h2>Keep building</h2></div><button className="text-btn">View all <ChevronRight size={16}/></button></div>
    <div className="project-grid">{projects.map(p=><div className="project-card" key={p.name}><div className="project-thumb">{p.emoji}</div><div className="project-body"><div className="tag">{p.tag}</div><h3>{p.name}</h3><p>{p.desc}</p><div className="progress"><i style={{width:p.progress+"%"}}/></div><div className="project-foot"><span>{p.progress}%</span><button className="small-btn" onClick={()=>notify("Opening project workspace…")}>Open</button></div></div></div>)}</div>
  </div>
}

function Challenges({notify}) {
  return <div className="content"><PageTitle eyebrow="CODING ARENA" title="Practice under pressure" sub="Timed challenges, hidden tests and AI feedback."/>
    <div className="challenge-banner"><div><span className="eyebrow">DAILY CHALLENGE</span><h2>Repair the broken calculator</h2><p>Find three logical bugs without changing the public API.</p><button className="primary" onClick={()=>notify("Challenge started.")}><Swords size={16}/> Start challenge</button></div><div className="timer"><Clock3 size={22}/><b>08:42</b><span>remaining</span></div></div>
    <div className="challenge-list">{challenges.map(c=><div className="challenge-row" key={c.title}><div className="challenge-icon">⌘</div><div className="challenge-info"><b>{c.title}</b><span>{c.lang} · {c.time}</span></div><span className={"difficulty "+c.difficulty.toLowerCase()}>{c.difficulty}</span><strong>+{c.xp} XP</strong><button className="small-btn" onClick={()=>notify("Challenge opened.")}>Solve</button></div>)}</div>
  </div>
}

function DebugPage({notify}) {
  return <div className="content"><PageTitle eyebrow="DEBUG DETECTIVE" title="Don't fear bugs. Investigate them." sub="Learn to diagnose problems instead of memorizing fixes."/>
    <div className="debug-grid"><div className="panel bug-editor"><div className="panel-head"><div><span className="eyebrow">CASE #014</span><h3>Why doesn't this print?</h3></div><span className="bug-badge">BUG FOUND</span></div><pre><code>{`name = "Alex"

if name == "alex":
    print("Hello")`}</code></pre><div className="evidence"><span>🔎 Evidence</span><p>The comparison checks two different strings. Can you spot the mismatch before opening the hint?</p></div><button className="primary" onClick={()=>notify("Hint revealed: compare the two string values.")}>Reveal hint</button></div>
      <div className="panel detective"><div className="detective-step done">✓ <b>Observe the symptom</b><span>Nothing is printed.</span></div><div className="detective-step current">2 <b>Form a hypothesis</b><span>What condition must be true?</span></div><div className="detective-step">3 <b>Test it</b><span>Change one thing and run.</span></div><div className="detective-step">4 <b>Fix & explain</b><span>Write the reason in your own words.</span></div><div className="debug-score"><Bug size={18}/><b>Debug skill</b><span>+18 XP after solving</span></div></div></div>
  </div>
}

function Career() {
  const paths=["Full Stack Developer","Android Developer","AI / ML Engineer","Game Developer","Cybersecurity","Systems Programmer"];
  return <div className="content"><PageTitle eyebrow="CAREER MODE" title="Turn skills into a path" sub="Choose a destination and let the AI map the missing skills."/>
    <div className="career-grid">{paths.map((p,i)=><div className="career-card" key={p}><div className="career-icon">{["🌐","📱","🤖","🎮","🔐","⚙️"][i]}</div><h3>{p}</h3><p>{[12,18,24,16,20,26][i]} skills · {["4","6","8","5","7","9"][i]} projects</p><div className="progress"><i style={{width:[72,42,25,38,18,12][i]+"%"}}/></div><button className="text-btn">View roadmap <ChevronRight size={15}/></button></div>)}</div>
    <div className="interview panel"><div><span className="eyebrow">AI INTERVIEWER</span><h2>Practice like it's real.</h2><p>Voice or text answers, live coding, hidden tests and a final score across correctness, clarity and reasoning.</p></div><button className="primary"><MessageCircle size={16}/> Start interview</button></div>
  </div>
}

function PageTitle({eyebrow,title,sub}) {
  return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{sub}</p></div>
}

createRoot(document.getElementById("root")).render(<App />);