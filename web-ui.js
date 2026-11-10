let webVerification=null,webWidget=null,webScriptPromise=null;
function webVerificationFailure(code){
 const number=/^\d{6}$/.test(String(code))?String(code):'';
 const messages={
  '110100':'访问验证标识无效，请联系维护者检查配置',
  '110110':'访问验证项不存在，请联系维护者检查配置',
  '110200':'当前域名尚未获得访问验证许可，请联系维护者',
  '110600':'访问验证超时，请重新连接；若反复出现，请检查设备时间',
  '110620':'等待验证操作超时，请重新连接并完成验证',
  '200100':'设备时间或验证缓存异常，请检查时间并刷新页面',
  '200500':'验证框未能加载，请检查验证服务的网络连接',
  '400020':'访问验证标识无效，请联系维护者检查配置',
  '400021':'访问验证区域与网页域名不匹配，请联系维护者',
  '400070':'此访问验证项已停用，请联系维护者',
 };
 const message=messages[number]||(/^[36]/.test(number)?'当前浏览器未通过访问验证，请在 Safari 或 Chrome 中亲自重试':'访问验证未完成，请重新连接后重试');
 const error=new Error(message+(number?'（验证错误 '+number+'）':''));error.code=number||'VERIFICATION_FAILED';return error;
}
function loadWebVerification(){
 if(window.turnstile)return Promise.resolve();
 if(webScriptPromise)return webScriptPromise;
 webScriptPromise=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;
  const fail=message=>{clearTimeout(timer);script.remove();webScriptPromise=null;reject(new Error(message));};
  const timer=setTimeout(()=>fail('访问验证加载超时，请检查网络后重试'),15000);
  script.onload=()=>{clearTimeout(timer);if(window.turnstile)resolve();else fail('访问验证暂时无法加载');};
  script.onerror=()=>fail('访问验证暂时无法加载');document.head.append(script);
 });
 return webScriptPromise;
}
async function openWebVerification(sitekey){
 if(webVerification)throw new Error('访问验证正在进行');
 const panel=document.getElementById('web-verification');panel.hidden=false;
 document.getElementById('web-verification-hint').textContent='请完成下方访问验证';
 const previousFocus=document.activeElement;
 const completion=new Promise((resolve,reject)=>{webVerification={resolve,reject};});
 const pending=webVerification;
 // Register rejection immediately so cancelling while the script loads never leaves an unhandled promise.
 completion.catch(()=>{});
 try{
  await Promise.race([loadWebVerification(),completion]);
  if(webVerification!==pending)throw new Error('已取消联网服务验证');
  if(webWidget!==null)turnstile.remove(webWidget);
  webWidget=turnstile.render('#web-verification-widget',{sitekey,action:'skillpath-web',retry:'never',callback:token=>finishWebVerification(null,token),'error-callback':code=>{finishWebVerification(webVerificationFailure(code));return true;},'timeout-callback':()=>finishWebVerification(new Error('等待访问验证操作超时，请重新连接并完成验证')),'expired-callback':()=>finishWebVerification(new Error('访问验证已过期，请重试'))});
  return await completion;
 }finally{
  if(webVerification===pending)webVerification=null;
  panel.hidden=true;
  if(webWidget!==null&&window.turnstile){turnstile.remove(webWidget);webWidget=null;}
  previousFocus?.focus();
 }
}
function finishWebVerification(error,token){
 const pending=webVerification;if(!pending)return;
 if(error)pending.reject(error);else pending.resolve(token);
}
function cancelWebVerification(){finishWebVerification(new Error('已取消联网服务验证'));}
const WebAPI=SkillPathWebAPI.createClient({base:'https://skillpath-entry.pages.dev',verify:openWebVerification,storage:sessionStorage,beforeConnect:()=>{
 if(location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname))throw new Error('当前是本地预览，请打开正式联网版使用教程服务，无需配置 API。');
}});
