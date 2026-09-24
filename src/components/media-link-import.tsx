"use client";
import {useState} from 'react';

export function MediaLinkImport({onImport}:{onImport:(item:{title:string;href:string;cover:string;meta:string})=>void}) {
  const [href,setHref]=useState('');
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  return <div className="wide"><label>Coller un lien Spotify, SoundCloud, YouTube ou autre plateforme<input type="url" value={href} onChange={e=>setHref(e.target.value)} placeholder="https://…" /></label><button type="button" disabled={busy || !href.trim()} onClick={async()=>{
    setBusy(true);setMessage('');
    try {const response=await fetch('/api/artist/media',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({href})});const data=await response.json();if(!response.ok)throw new Error(data.error);onImport(data);setHref('');setMessage(data.cover?'Titre et miniature importés. Sauvegarde pour publier.':'Lien ajouté. Miniature non fournie par la plateforme : tu peux ajouter une image. Sauvegarde pour publier.');}catch(error){setMessage(error instanceof Error?error.message:'Import impossible.');}finally{setBusy(false);}
  }}>{busy?'Import…':'Importer le lien et sa miniature'}</button><p role="status">{message}</p></div>;
}
