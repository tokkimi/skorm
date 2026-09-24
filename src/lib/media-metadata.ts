import { mediaLink } from './media-links';

export async function resolveMediaMetadata(raw: string) {
  let link=mediaLink(raw);
  if(!link) throw new Error('Lien invalide : utilise une URL https.');
  // Follow sharing links only through explicitly trusted platform hosts, never arbitrary redirects.
  const allowed=new Set(['spotify.link','spotify.app.link','open.spotify.com','on.soundcloud.com','soundcloud.com','m.soundcloud.com','snd.sc','link.deezer.com','deezer.com','www.deezer.com']);
  let url=new URL(link.href);
  if(['spotify.link','spotify.app.link','on.soundcloud.com','snd.sc','link.deezer.com'].includes(url.hostname)) {
    for(let i=0;i<5;i++) {
      if(!allowed.has(url.hostname) || url.protocol!=='https:' || url.username || url.password) break;
      const response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(4000),next:{revalidate:86400}});
      const location=response.headers.get('location');
      if(!location) break;
      const target=new URL(location,url);
      if(!allowed.has(target.hostname) || target.protocol!=='https:') break;
      url=target;
      const resolved=mediaLink(url.href);
      if(resolved?.provider){link=resolved;break;}
    }
  }
  let title=link.provider || 'Écouter ce titre';
  let cover=link.thumbnail || '';
  let meta=link.provider || '';
  if(link.endpoint) {
    try {
      const response=await fetch(link.endpoint,{redirect:'error',signal:AbortSignal.timeout(5000),next:{revalidate:86400}});
      if(response.ok) {
        const data=await response.json();
        if(typeof data.title==='string') title=data.title.slice(0,300);
        if(typeof data.author_name==='string') meta=data.author_name.slice(0,300);
        if(typeof data.thumbnail_url==='string' && /^https:\/\//.test(data.thumbnail_url)) cover=data.thumbnail_url;
      }
    } catch { /* Keep the link visible even when the provider is unavailable. */ }
  }
  return {href:link.href,title,cover,meta};
}
