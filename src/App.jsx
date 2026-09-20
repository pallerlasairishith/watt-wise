import { useMemo,useState } from "react";
import {Activity,AlertTriangle,BarChart3,BatteryCharging,Bell,ChevronRight,CircleDollarSign,CloudSun,Gauge,Lightbulb,Menu,Power,Refrigerator,Settings2,Sparkles,ThermometerSun,Tv,Waves,X,Zap} from "lucide-react";

const INITIAL=[
{id:"ac",name:"Air Conditioner",powerW:1500,hoursPerDay:6,on:true,icon:ThermometerSun},
{id:"fridge",name:"Refrigerator",powerW:180,hoursPerDay:12,on:true,icon:Refrigerator},
{id:"tv",name:"Television",powerW:120,hoursPerDay:4,on:true,icon:Tv},
{id:"washer",name:"Washing Machine",powerW:500,hoursPerDay:1.2,on:false,icon:Waves},
{id:"heater",name:"Water Heater",powerW:2000,hoursPerDay:1,on:false,icon:BatteryCharging}
];
const CHART=[18,25,21,31,28,38,34,42,37,49,44,53,46,58,51,62,55,67,59,64,56,48,42,36];
const money=v=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(v);

export default function App(){
 const [appliances,setAppliances]=useState(INITIAL),[sidebar,setSidebar]=useState(false),[toast,setToast]=useState(""),[updated,setUpdated]=useState("just now");
 const metrics=useMemo(()=>{
  const daily=appliances.reduce((s,x)=>s+(x.on?x.powerW*x.hoursPerDay/1000:0),0), monthly=daily*30;
  const consumers=[...appliances].map(x=>({...x,monthlyKwh:x.powerW*x.hoursPerDay*30/1000})).sort((a,b)=>b.monthlyKwh-a.monthlyKwh);
  const savings=appliances.filter(x=>x.on&&x.powerW>=1000).reduce((s,x)=>s+x.powerW*x.hoursPerDay*30/1000*8.2,0);
  return {daily,monthly,bill:monthly*8.2,active:appliances.filter(x=>x.on).length,consumers,savings};
 },[appliances]);
 const notify=m=>{setToast(m);setTimeout(()=>setToast(""),2600)};
 const toggle=id=>{setAppliances(a=>a.map(x=>x.id===id?{...x,on:!x.on}:x));setUpdated("just now")};
 const optimize=()=>{
  const high=appliances.filter(x=>x.on&&x.powerW>=1000);
  if(!high.length){notify("Your high-load devices are already optimized.");return}
  setAppliances(a=>a.map(x=>x.on&&x.powerW>=1000?{...x,on:false}:x));
  setUpdated("just now");notify("Optimization complete — "+high.length+" high-load device"+(high.length>1?"s":"")+" switched off.");
 };
 return <div className="app-shell">
  {sidebar&&<button className="mobile-backdrop" onClick={()=>setSidebar(false)} aria-label="Close menu"/>}
  <aside className={"sidebar "+(sidebar?"open":"")}>
   <div className="brand"><div className="brand-mark"><Zap size={20} fill="currentColor"/></div><div><strong>WattWise</strong><span>AI Energy Intelligence</span></div><button className="icon-button sidebar-close" onClick={()=>setSidebar(false)}><X size={19}/></button></div>
   <nav><a className="active" href="#overview"><Gauge size={18}/> Overview</a><a href="#appliances"><Power size={18}/> Appliances</a><a href="#insights"><Sparkles size={18}/> AI Insights</a><a href="#analytics"><BarChart3 size={18}/> Analytics</a></nav>
   <div className="sidebar-bottom"><div className="status-card"><span className="status-dot"/><div><strong>System online</strong><small>Simulated sensors active</small></div></div><button className="settings"><Settings2 size={17}/> Settings</button></div>
  </aside>
  <main className="main">
   <header className="topbar"><button className="icon-button menu-button" onClick={()=>setSidebar(true)}><Menu size={22}/></button><div className="topbar-title"><span className="eyebrow">SMART HOME / LIVE MONITORING</span><h1>Energy Overview</h1></div><div className="topbar-actions"><div className="live-pill"><span className="pulse"/> Live</div><button className="icon-button"><Bell size={19}/></button><div className="avatar">S</div></div></header>
   <section className="hero" id="overview"><div><div className="hero-kicker"><Sparkles size={15}/> AI-powered home intelligence</div><h2>Save energy without<br/><span>changing your life.</span></h2><p>WattWise watches your home, spots waste, and turns energy data into simple actions.</p><button className="primary-button" onClick={optimize}><Sparkles size={18}/> Optimize my home <ChevronRight size={18}/></button></div><div className="hero-orb"><div className="orb-ring ring-one"/><div className="orb-ring ring-two"/><div className="orb-core"><Zap size={34} fill="currentColor"/></div><span className="orb-label">Efficiency<br/><strong>{Math.max(62,100-Math.round(metrics.active*6))}%</strong></span></div></section>
   <section className="metrics-grid"><Metric icon={Zap} label="Today's usage" value={metrics.daily.toFixed(1)+" kWh"} note="Based on active devices"/><Metric icon={CircleDollarSign} label="Monthly bill" value={money(metrics.bill)} note="At ₹8.2 / kWh demo tariff"/><Metric icon={Lightbulb} label="AI savings potential" value={money(metrics.savings)} note="If high-load waste is reduced" accent/><Metric icon={Activity} label="Active devices" value={metrics.active+" / "+appliances.length} note="Live simulated state"/></section>
   <section className="content-grid"><div className="panel chart-panel" id="analytics"><PanelHeader title="Energy consumption" subtitle="Last 24 hours" action="View analytics"/><div className="chart-meta"><div><strong>{metrics.daily.toFixed(1)} <small>kWh</small></strong><span className="positive">+4.2% vs yesterday</span></div><span className="chart-legend"><i/> Consumption</span></div><div className="chart">{CHART.map((h,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:h+"%"}}/><span>{i%4===0?String(i).padStart(2,"0")+":00":""}</span></div>)}</div></div>
   <div className="panel insight-panel" id="insights"><PanelHeader title="AI insight" subtitle="What WattWise sees"/><div className="ai-badge"><Sparkles size={17}/> AI analysis</div><h3>{metrics.consumers[0]?.name} is your biggest energy consumer.</h3><p>It accounts for <strong>{metrics.consumers[0]?Math.round(metrics.consumers[0].monthlyKwh/Math.max(metrics.monthly,0.1)*100):0}%</strong> of estimated active-device consumption. Reducing its runtime during peak hours could lower your bill.</p><div className="insight-foot"><span><CloudSun size={16}/> Peak-aware recommendation</span><ChevronRight size={17}/></div></div></section>
   <section className="section-head" id="appliances"><div><span className="eyebrow">DEVICE INTELLIGENCE</span><h2>Your appliances</h2></div><span className="updated"><span className="status-dot"/> Updated {updated}</span></section>
   <section className="appliance-grid">{appliances.map(x=>{const Icon=x.icon,monthly=x.powerW*x.hoursPerDay*30/1000;return <article className={"appliance-card "+(x.on?"on":"")} key={x.id}><div className="appliance-top"><div className="appliance-icon"><Icon size={21}/></div><button className={"toggle "+(x.on?"checked":"")} onClick={()=>toggle(x.id)} aria-label={"Toggle "+x.name}><span/></button></div><h3>{x.name}</h3><div className="power-row"><strong>{x.powerW}W</strong><span>{x.on?"Running":"Off"}</span></div><div className="usage-row"><span>{x.hoursPerDay} h/day</span><span>≈ {monthly.toFixed(1)} kWh/mo</span></div></article>})}</section>
   <section className="recommendation"><div className="recommendation-icon"><Lightbulb size={23}/></div><div><span className="eyebrow">SMART RECOMMENDATION</span><h3>Shift high-load usage to cooler hours</h3><p>WattWise detected high consumption from the AC and heater. Scheduling them outside peak periods can reduce avoidable usage.</p></div><button className="secondary-button" onClick={()=>notify("Recommendation saved for your next optimization.")}>Apply suggestion <ChevronRight size={17}/></button></section>
   <footer>WattWise AI · Smart Living hackathon prototype · Sensor readings are simulated for this demo.</footer>
  </main>{toast&&<div className="toast"><span className="toast-check">✓</span>{toast}</div>}</div>
}
function Metric({icon:Icon,label,value,note,accent}){return <article className={"metric-card "+(accent?"accent":"")}><div className="metric-icon"><Icon size={19}/></div><span>{label}</span><strong>{value}</strong><small>{note}</small></article>}
function PanelHeader({title,subtitle,action}){return <div className="panel-header"><div><h3>{title}</h3><span>{subtitle}</span></div>{action&&<button className="text-button">{action} <ChevronRight size={15}/></button>}</div>}