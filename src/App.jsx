import React from "react";
import axios from "axios";

const img = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`; // random placeholders
const EMAIL = "juanmanuel@lumenkai.net";
const FLAGS = {
  en: "data:image/png;base64,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",
  es: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAwCAYAAACG5f33AAAAu0lEQVR42u3bsQ3CMBQEUDtKhCLBANBAmf0rZklFAxMgIUSUsIOvivRuhKfvb1/hOh+nZ5Hm9PW9XTAEgEspG4ZkAkupGNrTIQAIECBAAQgQIEBpaCJ6SAqoCWeA3WgEI8Db/UwhARyuPYVoB34tQbewdyBAgAIQIECAAhDg3pqIJhcCHnS5CPD3WCgEqfM4OcTJBK4fftkOtALdwt6BAAEKQIAAAQpAgHtrIpuvXhng4KtXBrie6gtDe/5fBRhzXpFiXQAAAABJRU5ErkJggg==",
};
const LANGS = { en: "English", es: "Español" };

const T = {
  en: {
    nav: ["Services", "Method", "Pricing", "Get in touch"],
    hero: ["AI automation that solves real business problems.", "We help small businesses automate customer communication and repetitive tasks using AI voice agents and connected workflows. Built around the way your business already works.", "Discuss an automation opportunity", "See our services"],
    services: ["Never miss an enquiry just because you're busy", "Start with one process. See the results. Scale when it makes sense.", "Coming next", [
      ["AI Receptionist", "An AI voice agent answers your calls, understands the enquiry, collects the customer's details and sends you a clear summary.", ["Answers common questions", "Captures name, contact and enquiry", "Sends call summaries to the owner", "Passes complex calls to a human"]],
      ["Lead Capture & Follow-up", "Every website enquiry is organised, saved in your CRM and followed up quickly, so no lead is forgotten.", ["Validates and structures each lead", "Saves it in your CRM", "Notifies you instantly", "Triggers an approved follow-up"]],
      ["Appointment Assistant", "An assistant that handles booking requests and reminders, connected to your real calendar so appointments actually exist.", ["Answers common questions", "Checks availability in your calendar", "Sends confirmations and reminders", "Routes cancellations to a human"]],
    ]],
    method: ["The Lumenkai method", "From problem to solution", "Step", [
      ["Find the bottleneck", "We learn how your business handles enquiries today and spot the calls and tasks that cost you time."],
      ["Design the workflow", "We define the triggers, steps and exceptions, and agree the scope with you before building."],
      ["Connect your tools", "We integrate the voice agent with your email, calendar or CRM. No need to change your software."],
      ["Launch and monitor", "We test real scenarios, go live and track the results, so you can see what works."],
    ]],
    how: ["How it works", "An AI voice agent handles the conversation. Connected workflows move the information into the tools you already use.", [
      ["A customer calls", "Nobody is free to pick up, or you're busy with someone else."],
      ["The AI voice agent answers", "It understands the request and collects the relevant information."],
      ["Your workflow takes over", "The call details are validated and sent to your tools."],
      ["You get the result", "A lead in your CRM, a summary in your inbox, a follow-up on its way."],
    ]],
    offer: ["Lumenkai AI Receptionist", "One clear package to get started, with no need to replace your current tools.", ["One configured AI voice agent", "One agreed call-handling workflow", "One integration with email or your CRM", "Call summaries and lead notifications", "Testing, deployment and initial monitoring", "Basic documentation and handover"], "Request a pilot"],
    pricing: ["Simple pricing", "A one-time setup, plus an optional monthly plan for monitoring and improvements.", "Setup", "from €400", ["Voice agent configuration", "One workflow and one integration", "Testing and deployment", "Handover and documentation"], "Monthly plan", "from €100", "/ month", ["Monitoring and maintenance", "Workflow failure alerts", "Small improvements", "Support by email"], "Third-party usage costs (voice minutes, telephony) are accounted for separately. Additional integrations are quoted separately."],
    cta: ["Let's talk about your business", "Tell us how customers reach you today. We'll suggest a first automation worth measuring.", "Send us a message"],
    form: ["← Back to Lumenkai", "First name", "Your first name", "Last name", "Your last name", "Phone", "+34 600 000 000", "Email", "hello@yourcompany.com", "How can we help?", "Tell us briefly about your business and what you'd like to automate...", "Send message", "Sending...", "Thanks! We've received your message and will reply soon.", "Something went wrong. Please try again or email"],
  },
  es: {
    nav: ["Servicios", "Metodología", "Precios", "Contactar"],
    hero: ["Automatización con IA que resuelve problemas reales.", "Ayudamos a pequeñas empresas a automatizar la comunicación con sus clientes y las tareas repetitivas con agentes de voz con IA y flujos de trabajo conectados. Todo adaptado a cómo ya funciona tu negocio.", "Hablemos de tu automatización", "Ver servicios"],
    services: ["Que no se te escape ninguna consulta por estar ocupado", "Empieza con un proceso. Mide los resultados. Crece cuando tenga sentido.", "Próximamente", [
      ["Recepcionista con IA", "Un agente de voz con IA atiende tus llamadas, entiende la consulta, recoge los datos del cliente y te envía un resumen claro.", ["Responde preguntas frecuentes", "Recoge nombre, contacto y consulta", "Envía resúmenes de llamada al propietario", "Pasa las llamadas complejas a una persona"]],
      ["Captación y seguimiento de leads", "Cada consulta de tu web se organiza, se guarda en tu CRM y se atiende rápido, para que no se pierda ningún lead.", ["Valida y estructura cada lead", "Lo guarda en tu CRM", "Te avisa al instante", "Lanza un seguimiento aprobado"]],
      ["Asistente de citas", "Un asistente que gestiona solicitudes de cita y recordatorios, conectado a tu calendario real para que las citas existan de verdad.", ["Responde preguntas frecuentes", "Comprueba la disponibilidad en tu calendario", "Envía confirmaciones y recordatorios", "Deriva las cancelaciones a una persona"]],
    ]],
    method: ["Metodología Lumenkai", "Del problema a la solución", "Paso", [
      ["Detectamos el atasco", "Analizamos cómo gestionas hoy las consultas e identificamos las llamadas y tareas que te hacen perder tiempo."],
      ["Diseñamos el flujo", "Definimos activadores, pasos y excepciones, y acordamos el alcance contigo antes de construir."],
      ["Conectamos tus herramientas", "Integramos el agente de voz con tu correo, calendario o CRM. Sin cambiar de software."],
      ["Puesta en marcha", "Probamos escenarios reales, lanzamos y medimos los resultados para que veas qué funciona."],
    ]],
    how: ["Cómo funciona", "Un agente de voz con IA gestiona la conversación. Los flujos conectados llevan la información a las herramientas que ya usas.", [
      ["Un cliente llama", "Nadie puede contestar, o estás atendiendo a otra persona."],
      ["El agente de voz con IA responde", "Entiende la petición y recoge la información relevante."],
      ["Tu flujo de trabajo entra en acción", "Los datos de la llamada se validan y se envían a tus herramientas."],
      ["Tú recibes el resultado", "Un lead en tu CRM, un resumen en tu correo, un seguimiento en camino."],
    ]],
    offer: ["Recepcionista con IA de Lumenkai", "Un paquete claro para empezar, sin tener que sustituir tus herramientas actuales.", ["Un agente de voz con IA configurado", "Un flujo de gestión de llamadas acordado", "Una integración con correo o CRM", "Resúmenes de llamada y avisos de leads", "Pruebas, despliegue y seguimiento inicial", "Documentación básica y entrega"], "Solicitar un piloto"],
    pricing: ["Precios sencillos", "Un pago único de puesta en marcha, más un plan mensual opcional de monitorización y mejoras.", "Puesta en marcha", "desde 400 €", ["Configuración del agente de voz", "Un flujo y una integración", "Pruebas y despliegue", "Entrega y documentación"], "Plan mensual", "desde 100 €", "/ mes", ["Monitorización y mantenimiento", "Alertas de fallos en los flujos", "Pequeñas mejoras", "Soporte por correo"], "Los costes de terceros (minutos de voz, telefonía) se contabilizan aparte. Las integraciones adicionales se presupuestan por separado."],
    cta: ["Hablemos de tu negocio", "Cuéntanos cómo te contactan hoy tus clientes. Te propondremos una primera automatización que merezca la pena medir.", "Envíanos un mensaje"],
    form: ["← Volver a Lumenkai", "Nombre", "Tu nombre", "Apellidos", "Tus apellidos", "Teléfono", "+34 600 000 000", "Email", "hola@tuempresa.com", "¿En qué podemos ayudarte?", "Cuéntanos brevemente tu consulta...", "Enviar mensaje", "Enviando...", "¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.", "Algo ha fallado. Inténtalo de nuevo o escribe a"],
  },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');
:root{--ink:#142B3B;--muted:#4f6272;--bg:#F7F8F4;--accent:#FFD447;--accent-dark:#f2c22e;--line:#e3e7e0;--soft:rgba(20,43,59,.05)}
/* Reset: overrides default Vite/CRA styles (index.css / App.css) */
html{color-scheme:light!important;background:#F7F8F4!important;color:#142B3B!important}
body{display:block!important;place-items:initial!important;min-width:0!important;margin:0!important;background:transparent!important;color:#142B3B!important}
#root{max-width:none!important;width:100%!important;margin:0!important;padding:0!important;text-align:left!important}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);line-height:1.6}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
.nav{position:sticky;top:0;z-index:10;background:rgba(247,248,244,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{font-weight:800;font-size:20px;letter-spacing:-.02em}
.logo span{background:linear-gradient(transparent 62%,var(--accent) 62%)}
.links{display:flex;gap:24px;align-items:center;font-size:15px;color:var(--muted)}
.links a:hover{color:var(--ink)}
.btn{display:inline-block;background:var(--accent);color:var(--ink);padding:12px 22px;border-radius:8px;font-weight:700;font-size:15px;border:0;cursor:pointer}
.btn:hover{background:var(--accent-dark)}
.btn.ghost{background:transparent;border:1px solid rgba(20,43,59,.25)}
.btn.ghost:hover{background:var(--soft)}
.lang{position:relative}
.lang-btn,.lang-menu button{display:flex;align-items:center;gap:8px;font:inherit;font-size:14px;color:var(--ink);cursor:pointer}
.lang-btn{background:#fff;border:1px solid var(--line);border-radius:8px;padding:8px 12px}
.lang-btn svg{width:12px;height:12px}
.lang img{width:26px;height:16px;object-fit:cover;border-radius:3px;box-shadow:0 0 0 1px rgba(20,43,59,.15)}
.lang-menu{position:absolute;right:0;top:calc(100% + 6px);background:#fff;border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 30px rgba(20,43,59,.15);min-width:150px;padding:6px;z-index:20}
.lang-menu button{width:100%;padding:8px 10px;border:0;background:none;border-radius:6px}
.lang-menu button:hover,.lang-menu button.on{background:var(--bg)}
.hero{padding:80px 0 64px}
.hero .wrap{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
.hero h1{font-size:clamp(34px,5vw,54px);line-height:1.1;letter-spacing:-.03em;margin-bottom:20px}
.hero p{font-size:18px;color:var(--muted);max-width:520px;margin-bottom:28px}
.hero .actions{display:flex;gap:12px;flex-wrap:wrap}
.hero img,.split img{border-radius:16px;aspect-ratio:4/3;object-fit:cover;width:100%}
section{padding:72px 0}
.alt{background:var(--soft)}
.dark{background:var(--ink);color:#fff}
.dark .lead,.dark p{color:#b8c4cd}
h2{font-size:clamp(26px,3.5vw,36px);letter-spacing:-.02em;line-height:1.2;margin-bottom:12px}
.lead{color:var(--muted);max-width:620px;margin-bottom:40px}
.eyebrow{font-family:"Playfair Display",Georgia,serif;font-style:italic;font-size:20px;color:#7a869a;margin-bottom:8px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
.card img{aspect-ratio:16/10;object-fit:cover;width:100%}
.card .body{padding:22px;display:flex;flex-direction:column;gap:10px;flex:1}
.card h3{font-size:19px}
.card p{color:var(--muted);font-size:15px}
ul{list-style:none}
.card ul,.price ul{display:grid;gap:8px;font-size:14px}
.card ul{margin-top:6px}
.price ul{color:var(--muted)}
.split ul{display:grid;gap:10px;margin:20px 0}
li::before{content:"✓";display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--accent);color:var(--ink);font-size:11px;font-weight:800;margin-right:10px}
.tag{align-self:flex-start;font-size:12px;font-weight:700;background:rgba(255,212,71,.35);padding:3px 10px;border-radius:99px}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;counter-reset:s}
.step{background:#fff;border-radius:14px;padding:22px;border:1px solid var(--line)}
.step::before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--accent);color:var(--ink);font-weight:800;margin-bottom:14px}
.step h3{font-size:17px;margin-bottom:6px}
.step p{font-size:14px;color:var(--muted)}
.center{text-align:center}
.method h2{font-size:clamp(32px,5vw,54px);font-weight:800;letter-spacing:-.03em;margin-bottom:56px}
.method-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:48px;text-align:left}
.m-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:28px;padding:32px;box-shadow:0 4px 18px rgba(20,43,59,.05)}
.m-card:not(:last-child)::after{content:"";position:absolute;top:50%;right:-48px;width:48px;height:1px;background:rgba(20,43,59,.2)}
.m-label{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8aa0b4;margin-bottom:20px}
.m-card h3{font-size:19px;margin-bottom:10px}
.m-card p{font-size:14px;color:var(--muted)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.pricing{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:760px}
.price{background:#fff;border:1px solid var(--line);border-radius:14px;padding:28px}
.price.main{border:2px solid var(--accent)}
.price .amount{font-size:34px;font-weight:800;letter-spacing:-.02em;margin:10px 0}
.price .amount small{font-size:15px;font-weight:500;color:var(--muted)}
.note{font-size:13px;color:var(--muted);margin-top:18px}
.cta{text-align:center}
.cta p{max-width:520px;margin:0 auto 28px}
footer{padding:28px 0;font-size:14px;color:var(--muted)}
footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}
.contact-page{min-height:100vh;display:grid;place-items:center;padding:40px 16px;background:var(--ink)}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.back{font-size:14px;font-weight:600;color:#fff}
.form-card{background:#fff;border-radius:36px;padding:48px;width:100%;max-width:680px;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.form-card label{display:block;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8aa0b4;margin-bottom:8px}
.form-card input,.form-card textarea{width:100%;padding:16px 20px;border-radius:16px;border:1px solid #edf0f4;background:#f7f8fa;font:inherit;font-size:15px;color:var(--ink)}
.form-card input:focus,.form-card textarea:focus{outline:2px solid var(--accent);background:#fff}
.form-card textarea{min-height:150px;resize:vertical}
.f-submit{width:100%;margin-top:24px;background:var(--accent);color:var(--ink);padding:18px;border-radius:16px;border:0;font-weight:800;font-size:16px;cursor:pointer}
.f-submit:hover{background:var(--accent-dark)}
.f-submit:disabled{opacity:.6;cursor:default}
.f-status{margin-top:16px;font-size:14px;text-align:center}
.f-status.ok{color:#1f7a4d}
.f-status.err{color:#c0392b}
.hp{position:absolute;left:-9999px}
@media(max-width:860px){
  .hero .wrap,.split{grid-template-columns:1fr}
  .grid3,.pricing,.f-row{grid-template-columns:1fr}
  .steps,.method-steps{grid-template-columns:1fr 1fr;gap:20px}
  .m-card::after{display:none}
  .links a:not(.btn){display:none}
  .form-card{padding:28px}
}
@media(max-width:480px){.steps,.method-steps{grid-template-columns:1fr}.links{gap:10px}}
`;

function LangMenu({ lang, setLang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <div className="lang" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open}>
        <img src={FLAGS[lang]} alt="" />
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4l4 4 4-4" /></svg>
      </button>
      {open && (
        <div className="lang-menu" role="listbox">
          {Object.keys(LANGS).map((l) => (
            <button key={l} className={l === lang ? "on" : ""} onClick={() => { setLang(l); setOpen(false); }}>
              <img src={FLAGS[l]} alt="" /> {LANGS[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Home({ t, lang, setLang }) {
  const [hero, services, method, how, offer, pricing, cta] = [t.hero, t.services, t.method, t.how, t.offer, t.pricing, t.cta];
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a href="#top" className="logo">Lumen<span>kai</span></a>
          <nav className="links">
            <a href="#services">{t.nav[0]}</a>
            <a href="#method">{t.nav[1]}</a>
            <a href="#pricing">{t.nav[2]}</a>
            <LangMenu lang={lang} setLang={setLang} />
            <a className="btn" href="#/contact">{t.nav[3]}</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className="hero">
          <div className="wrap">
            <div>
              <h1>{hero[0]}</h1>
              <p>{hero[1]}</p>
              <div className="actions">
                <a className="btn" href="#/contact">{hero[2]}</a>
                <a className="btn ghost" href="#services">{hero[3]}</a>
              </div>
            </div>
            <img src={img("lumenkai-hero", 900, 700)} alt="" />
          </div>
        </div>


        <section id="services">
          <div className="wrap">
            <h2>{services[0]}</h2>
            <p className="lead">{services[1]}</p>
            <div className="grid3">
              {services[3].map(([title, text, points], i) => (
                <article className="card" key={title}>
                  <img src={img(["lumenkai-reception", "lumenkai-leads", "lumenkai-booking"][i])} alt="" />
                  <div className="body">
                    {i === 2 && <span className="tag">{services[2]}</span>}
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="method center alt">
          <div className="wrap">
            <p className="eyebrow">{method[0]}</p>
            <h2>{method[1]}</h2>
            <div className="method-steps">
              {method[3].map(([title, text], i) => (
                <div className="m-card" key={title}>
                  <div className="m-label">{method[2]} 0{i + 1}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <h2>{how[0]}</h2>
            <p className="lead">{how[1]}</p>
            <div className="steps">
              {how[2].map(([title, text]) => (
                <div className="step" key={title}><h3>{title}</h3><p>{text}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap split">
            <img src={img("lumenkai-offer")} alt="" />
            <div>
              <h2>{offer[0]}</h2>
              <p className="lead" style={{ marginBottom: 0 }}>{offer[1]}</p>
              <ul>{offer[2].map((p) => <li key={p}>{p}</li>)}</ul>
              <a className="btn" href="#/contact">{offer[3]}</a>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="wrap">
            <h2>{pricing[0]}</h2>
            <p className="lead">{pricing[1]}</p>
            <div className="pricing">
              {/* ASSUMPTION: prices are hypotheses to test with customers, adjust before publishing */}
              <div className="price main">
                <h3>{pricing[2]}</h3>
                <div className="amount">{pricing[3]}</div>
                <ul>{pricing[4].map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <div className="price">
                <h3>{pricing[5]}</h3>
                <div className="amount">{pricing[6]} <small>{pricing[7]}</small></div>
                <ul>{pricing[8].map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
            <p className="note">{pricing[9]}</p>
          </div>
        </section>

        <section className="cta dark">
          <div className="wrap">
            <h2 style={{ color: "#fff" }}>{cta[0]}</h2>
            <p>{cta[1]}</p>
            <a className="btn" href="#/contact">{cta[2]}</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} Lumenkai</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </footer>
    </>
  );
}

function ContactPage({ t, lang, setLang }) {
  const f = t.form;
  const empty = { name: "", surname: "", phone: "", email: "", message: "" };
  const [data, setData] = React.useState(empty);
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (e.target.elements._honey.value) return; // spam trap
    setStatus("sending");
    try {
      // Using axios for the form submission
      const res = await axios.post(`https://formsubmit.co/ajax/${EMAIL}`, {
        ...data,
        language: lang,
        _subject: "New enquiry from the Lumenkai website",
        _template: "table",
        _captcha: "false",
      }, {
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      setStatus("sent");
      setData(empty);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">
      <div style={{ width: "100%", maxWidth: 680 }}>
        <div className="top">
          <a className="back" href="#top">{f[0]}</a>
          <LangMenu lang={lang} setLang={setLang} />
        </div>
        <form className="form-card" onSubmit={submit}>
          <div className="f-row">
            <div><label htmlFor="name">{f[1]}</label><input id="name" required placeholder={f[2]} value={data.name} onChange={set("name")} /></div>
            <div><label htmlFor="surname">{f[3]}</label><input id="surname" required placeholder={f[4]} value={data.surname} onChange={set("surname")} /></div>
          </div>
          <div className="f-row">
            <div><label htmlFor="phone">{f[5]}</label><input id="phone" type="tel" placeholder={f[6]} value={data.phone} onChange={set("phone")} /></div>
            <div><label htmlFor="email">{f[7]}</label><input id="email" type="email" required placeholder={f[8]} value={data.email} onChange={set("email")} /></div>
          </div>
          <label htmlFor="message">{f[9]}</label>
          <textarea id="message" required placeholder={f[10]} value={data.message} onChange={set("message")} />
          <input className="hp" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="f-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? f[12] : f[11]}</button>
          {status === "sent" && <p className="f-status ok">{f[13]}</p>}
          {status === "error" && <p className="f-status err">{f[14]} {EMAIL}.</p>}
        </form>
      </div>
    </div>
  );
}

export default function App() {
  // Routing is plain React state, so it works in any environment. No router library needed.
  const [page, setPage] = React.useState(window.location.hash === "#/contact" ? "contact" : "home");
  const [lang, setLangState] = React.useState(() => {
    try { return localStorage.getItem("lang") || "en"; } catch (e) { return "en"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch (e) { /* ignore */ }
  };

  React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  React.useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      const href = a.getAttribute("href");
      const next = href === "#/contact" ? "contact" : "home";
      setPage(next);
      try { window.history.pushState(null, "", href); } catch (err) { /* sandboxed, ignore */ }
      setTimeout(() => {
        const el = next === "home" && href.length > 1 ? document.getElementById(href.slice(1)) : null;
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo(0, 0);
      }, 0);
    };
    const onPop = () => setPage(window.location.hash === "#/contact" ? "contact" : "home");
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  const props = { t: T[lang], lang, setLang };
  return (
    <>
      <style>{css}</style>
      {page === "contact" ? <ContactPage {...props} /> : <Home {...props} />}
    </>
  );
}
