(function(root,factory){
 const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SkillPathWebAPI=api;
})(typeof globalThis==='object'?globalThis:this,function(){
 function createClient({base,fetchImpl=fetch,verify,storage,now=Date.now,sleep=ms=>new Promise(r=>setTimeout(r,ms)),newId=()=>Array.from(crypto.getRandomValues(new Uint8Array(16)),x=>x.toString(16).padStart(2,'0')).join('')}={}){
  const url=new URL(base);if(url.protocol!=='https:'||url.pathname!=='/'||url.search||url.hash||url.username||url.password)throw new Error('网页服务地址无效');
  const key='sp_web_session_v1';let session=null,configuration=null;
  try{const saved=JSON.parse(storage?.getItem(key)||'null');if(saved&&typeof saved.token==='string'&&saved.token.length<4096&&saved.expiresAt>now())session=saved;}catch(_){}
  const connected=()=>!!(session&&session.expiresAt>now());
  function disconnect(){session=null;try{storage?.removeItem(key);}catch(_){} }
  async function request(path,body,authenticated=false){
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),18000);let response;
   let result;
   try{
    response=await fetchImpl(url.origin+path,{method:body===undefined?'GET':'POST',headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...(authenticated&&session?{Authorization:'Bearer '+session.token}:{})},body:body===undefined?undefined:JSON.stringify(body),credentials:'omit',referrerPolicy:'strict-origin-when-cross-origin',signal:controller.signal});
    try{result=await response.json();}catch(_){throw Object.assign(new Error('网页服务暂时没有返回有效结果'),{transport:response.status>=500});}
   }catch(e){if(e.transport!==undefined)throw e;throw Object.assign(new Error('网络连接中断，请稍后重试；已保存的计划仍在本机'),{transport:true});}finally{clearTimeout(timer);}

   if(response.status===401&&authenticated)disconnect();
   if(!response.ok||!result.ok)throw Object.assign(new Error(result.error||'网页服务暂不可用'),{status:response.status,transport:[502,503,504].includes(response.status),...(/^VERIFY_[A-Z_]{1,40}$/.test(result.code||'')?{code:result.code}:{})});
   return result;
  }
  return {
   get connected(){return connected();},get services(){return configuration?.services||{};},get available(){return !!configuration?.available;},
   async status(){configuration=await request('/web/status');return configuration;},
   async connect(){const config=await this.status();if(!config.available||!config.sitekey)throw new Error('网页联网服务尚未开放，请先使用本地课程');if(typeof verify!=='function')throw new Error('无法打开访问验证');const token=await verify(config.sitekey);const result=await request('/web/session',{token});if(typeof result.token!=='string'||!Number.isFinite(result.expiresAt))throw new Error('访问验证没有返回有效凭证');session={token:result.token,expiresAt:result.expiresAt};try{storage?.setItem(key,JSON.stringify(session));}catch(_){}return result;},
   disconnect,
   async run(action,payload={}){
    if(!connected())throw new Error('请先在设置中连接联网服务');
    const requestId=newId(),started=now(),body={action,payload,requestId};let result;
    try{result=await request('/web/jobs',body,true);}catch(e){if(!e.transport)throw e;await sleep(500);result=await request('/web/jobs',body,true);}
    let failures=0,delay=1000;
    while(result.pending){
     if(result.requestId!==requestId)throw new Error('任务编号不一致，请重新发起');
     if(now()-started>120000)throw new Error('联网任务等待超时，计划已保留，可稍后重试');
     await sleep(delay);delay=Math.min(3000,delay+500);
     try{result=await request('/web/jobs/'+requestId,undefined,true);failures=0;}catch(e){if(!e.transport||++failures>2)throw e;}
    }
    return result;
   },
  };
 }
 return {createClient};
});
