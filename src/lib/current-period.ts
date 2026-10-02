// Reporting dates follow the agency timezone, regardless of the browser timezone.
export function currentPeriod(now=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bahia',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now)
 const part=(type:string)=>parts.find(p=>p.type===type)!.value
 const key=`${part('year')}-${part('month')}`
 return {key,since:`${key}-01`,until:`${key}-${part('day')}`}
}
