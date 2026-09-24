import { createServer } from 'node:http';
import { createHmac, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
const owner = {id:randomUUID(),slug:'test-artist',name:'Test Artist'};
const other = {id:randomUUID(),slug:'other',name:'Other'};
let events = [{id:randomUUID(),artist_id:other.id,title:'PRIVATE OTHER',category:'artist-personal',notes:'SECRET',starts_at:'2027-01-01T10:00:00Z'}];
let publicEvents=[];
const db=createServer(async(req,res)=>{
  let raw=''; for await (const chunk of req) raw+=chunk;
  const p=raw ? JSON.parse(raw):{};
  const route=req.url.split('?')[0];
  let data;
  if(route.endsWith('/admin_get_artist_workspace')) data={artists:[owner,other],events,notes:[{artist_id:owner.id,content:'MANAGER ONLY'}]};
  else if(route.endsWith('/admin_create_private_event')) { const item={id:randomUUID(),artist_id:p.p_artist_id,title:p.p_title,starts_at:p.p_starts_at,ends_at:p.p_ends_at,category:p.p_category,location:p.p_location,notes:p.p_notes}; events.push(item);data=item.id; }
  else if(route.endsWith('/admin_update_private_event')) { const e=events.find(e=>e.id===p.p_id);Object.assign(e,{title:p.p_title,starts_at:p.p_starts_at,ends_at:p.p_ends_at,category:p.p_category,location:p.p_location,notes:p.p_notes});data=null; }
  else if(route.endsWith('/admin_delete_private_event')) {events=events.filter(e=>e.id!==p.p_id);data=null;}
  else if(route.endsWith('/admin_create_backoffice_item')) { const e={id:randomUUID(),...p.p_payload,artist_name:owner.name};publicEvents.push(e);data=e.id; }
  else if(route.endsWith('/events')) data=publicEvents;
  else if(route.endsWith('/admin_get_backoffice')) data={artists:[owner],events:publicEvents,inquiries:[],bookings:[],campaigns:[],content_items:[],contacts:[],tasks:[],financial_transactions:[]};
  else {res.writeHead(404);res.end('{}');return;}
  res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));
});
await new Promise(resolve=>db.listen(4198,'127.0.0.1',resolve));
const app=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','4199'],{env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:'http://127.0.0.1:4198',NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'test-only',ADMIN_DB_SECRET:'test-only',ADMIN_SESSION_SECRET:'test-only'},stdio:'pipe'});
const base='http://localhost:4199';
const cookie=`SKORM_artist=${owner.slug}.${createHmac('sha256','test-only').update(`artist:${owner.slug}`).digest('hex')}`;
const call=(payload,auth=true)=>fetch(base+'/api/artist/agenda',{method:payload?'POST':'GET',headers:{...(auth?{Cookie:cookie}:{}),Origin:base,'Content-Type':'application/json'},...(payload?{body:JSON.stringify(payload)}:{})});
try {
  for(let i=0;i<50;i++){try{await fetch(base+'/connexion');break;}catch{await new Promise(r=>setTimeout(r,200));}}
  assert.equal((await call(null,false)).status,401);
  let initial=await (await call()).json();assert.deepEqual(initial.events,[]);assert.equal(initial.note,'');
  assert.equal((await call({action:'delete',id:events[0].id})).status,404);
  const privatePayload={action:'event',visibility:'private',title:'Private rehearsal',starts_at:'2027-01-12T10:00:00.000Z',ends_at:null,location:'Studio',notes:'PRIVATE OWNER'};
  assert.equal((await call(privatePayload)).status,200);
  let mine=(await (await call()).json()).events;assert.equal(mine.length,1);assert.equal(mine[0].notes,'PRIVATE OWNER');
  assert.equal((await call({...privatePayload,id:mine[0].id,title:'Updated rehearsal'})).status,200);
  assert.equal((await call({action:'note',content:'My notebook'})).status,200);
  assert.equal((await call({action:'note',content:'Updated notebook'})).status,200);
  assert.equal((await (await call()).json()).note,'Updated notebook');
  assert.equal(events.filter(e=>e.category==='artist-notebook').length,1);
  assert.equal((await call({...privatePayload,visibility:'public',title:'Public concert'})).status,200);
  assert.equal(publicEvents[0].artist_id,owner.id);assert.equal(publicEvents[0].is_published,true);assert.equal(publicEvents[0].notes,undefined);
  const page=await (await fetch(base+'/artistes/test-artist')).text();
  assert.ok(page.includes('Public concert'));assert.ok(!page.includes('PRIVATE OWNER'));assert.ok(!page.includes('My notebook'));assert.ok(!page.includes('PRIVATE OTHER'));
  assert.equal((await call({action:'delete',id:mine[0].id})).status,200);
  assert.equal((await (await call()).json()).events.filter(e=>e.visibility==='private').length,0);
  console.log('PASS: unauthenticated access, ownership isolation, private create/update/delete, notebook persistence, public date publication and no private content on public page.');
} finally { app.kill();db.close(); }
