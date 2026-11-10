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
 function searchQuery(skill,lesson){
  if(lesson?.bilibiliQuery?.trim())return lesson.bilibiliQuery.trim().slice(0,100);
  const aliases={python:'Python',javascript:'JavaScript',typescript:'TypeScript',guitar:'吉他',piano:'钢琴',photography:'摄影',drawing:'绘画',cooking:'烹饪',yoga:'瑜伽',coding:'编程',skateboarding:'滑板'};
  const name=Object.keys(aliases).find(k=>new RegExp('\\b'+k+'\\b','i').test(skill||''));
  const programmingTopics={'setting up a practice environment':'开发环境安装 入门','values and variables':'变量 数据类型','conditions and branching':'条件判断 分支','loops and repetition':'循环','functions and small reusable steps':'函数 入门','reading errors and debugging':'报错 调试','a small working project':'入门 项目实战','reviewing and improving your project':'项目 优化'};
  const title=String(lesson?.title||'');
  const topic=(/cod|python|program|javascript|typescript|编程/i.test(skill||'')&&programmingTopics[title.toLowerCase()]||title).replace(/fingerpicking/ig,'指弹').replace(/thumb/ig,'拇指').replace(/index/ig,'食指').replace(/\b(simple|basics?|pattern|introduction|beginner|coordination)\b/ig,' ').replace(/[():&]/g,' ').replace(/\s+/g,' ').trim();
  return ((name?aliases[name]:String(skill||'').replace(/\([^)]*\)/g,'').trim())+' '+topic+' 教程').trim().slice(0,100);
 }
 function noteURL(note){
  if(note?.kind!=='xiaohongshu'||!['live-search','provider-search'].includes(note.source)||!/^[a-f0-9]{24}$/.test(note.id||''))return '';
  try{const u=new URL(note.url);return u.protocol==='https:'&&['www.xiaohongshu.com','xiaohongshu.com'].includes(u.hostname)&&!u.username&&!u.password&&!u.port&&new RegExp('^/(?:explore|search_result|discovery/item)/'+note.id+'/?$').test(u.pathname)?u.href:'';}catch(_){return '';}
 }
 return {parse,valid,isBili,identity,url,embed,thumbnail,searchQuery,noteURL};
});
