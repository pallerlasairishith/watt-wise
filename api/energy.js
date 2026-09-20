const TARIFF = 8.2;
export default function handler(req,res){
  if(req.method==="GET") return res.status(200).json({ok:true,tariff:TARIFF,currency:"INR",message:"WattWise energy service is online",generatedAt:new Date().toISOString()});
  if(req.method!=="POST"){res.setHeader("Allow",["GET","POST"]);return res.status(405).json({ok:false,error:"Method not allowed"});}
  const appliances=Array.isArray(req.body?.appliances)?req.body.appliances:[], days=Number(req.body?.days)||30;
  const usage=appliances.map(x=>{const dailyKwh=(Number(x.powerW)||0)*(Number(x.hoursPerDay)||0)/1000;return{id:x.id,name:x.name,dailyKwh,monthlyKwh:dailyKwh*days};});
  const dailyKwh=usage.reduce((s,x)=>s+x.dailyKwh,0), monthlyKwh=dailyKwh*days;
  return res.status(200).json({ok:true,tariff:TARIFF,currency:"INR",days,dailyKwh,monthlyKwh,estimatedBill:monthlyKwh*TARIFF,topConsumers:[...usage].sort((a,b)=>b.monthlyKwh-a.monthlyKwh).slice(0,3)});
}