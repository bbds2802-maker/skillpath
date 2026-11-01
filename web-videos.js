(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SkillPathVideos=api;})(typeof globalThis==='object'?globalThis:this,function(){
 const bv=/^BV[A-Za-z0-9]{10}$/;
 function parse(value){
  let u;try{u=new URL(String(value||'').trim());}catch(_){return null;}
  if(!['http:','https:'].includes(u.protocol)||u.username||u.password||u.port)return null;
  if(['bilibili.com','www.bilibili.com','m.bilibili.com'].includes(u.hostname)){
   const m=/^\/video\/(BV[A-Za-z0-9]{10})\/?$/.exec(u.pathname),page=u.searchParams.get('p')||'1';
   if(!m||!bv.test(m[1])||!/^[1-9]\d{0,3}$/.test(page))return null;
   return {platform:'B站',videoId:m[1],bvid:m[1],page:Number(page),url:'https://www.bilibili.com/video/'+m[1]+'/?p='+page};
  }
  if(!['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com','youtu.be'].includes(u.hostname))return null;
  const id=u.hostname==='youtu.be'?u.pathname.slice(1):u.searchParams.get('v')||/\/(?:embed|shorts|live)\/([^/]+)/.exec(u.pathname)?.[1];
  return /^[A-Za-z0-9_-]{11}$/.test(id||'')?{platform:'YouTube',videoId:id,url:'https://www.youtube.com/watch?v='+id}:null;
 }
 function valid(v){return !!v&&(v.platform==='B站'||v.bvid?bv.test(v.bvid||v.videoId||'')&&Number.isInteger(v.page||1)&&(v.page||1)>0&&(v.page||1)<10000:/^[A-Za-z0-9_-]{11}$/.test(v.videoId||''));}
 function isBili(v){return v?.platform==='B站'||!!v?.bvid;}
 function identity(v){return valid(v)?(isBili(v)?'bili:'+ (v.bvid||v.videoId)+':'+(v.page||1):'yt:'+v.videoId):'';}
 function url(v){return valid(v)?(isBili(v)?'https://www.bilibili.com/video/'+(v.bvid||v.videoId)+'/?p='+(v.page||1):'https://www.youtube.com/watch?v='+v.videoId):'';}
 function embed(v){return valid(v)&&isBili(v)?'https://player.bilibili.com/player.html?bvid='+(v.bvid||v.videoId)+'&p='+(v.page||1)+'&autoplay=0&danmaku=0&poster=1':'';}
 function thumbnail(v){if(!valid(v))return '';if(!isBili(v))return 'https://i.ytimg.com/vi/'+v.videoId+'/hqdefault.jpg';try{const u=new URL(v.thumb||'');return u.protocol==='https:'&&/(^|\.)hdslb\.com$/.test(u.hostname)&&!u.username&&!u.password&&!u.port?u.href:'';}catch(_){return '';}}
 return {parse,valid,isBili,identity,url,embed,thumbnail};
});
