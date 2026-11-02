(function(root,factory){
  const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SkillPathSession=api;
})(typeof globalThis==='object'?globalThis:this,function(){
  const KEY='sp_current_plan_v1';
  const fields=['planId','skill','goal','serviceWarnings','level','duration','freq','selectedDates','len','style','platforms','includeXiaohongshu','focus'];
  function encode(state){
    if(!state||!Array.isArray(state.lessons)||!state.lessons.length)return null;
    const plan={};for(const key of fields)plan[key]=state[key];
    plan.skill=String(plan.skill||'My Learning');plan.lessons=state.lessons;plan.done=Array.from(state.done||[]);
    return JSON.stringify({version:1,plan});
  }
  function decode(raw){
    if(!raw)return null;
    const data=JSON.parse(raw),p=data&&data.plan;
    if(data.version!==1||!p||typeof p.skill!=='string'||!p.skill.trim()||!Array.isArray(p.lessons)||!p.lessons.length||p.lessons.length>1000)throw new Error('保存的学习计划格式不完整');
    const ids=new Set();
    for(const l of p.lessons){
      if(!l||typeof l.id!=='string'||!/^[A-Za-z0-9_-]{1,100}$/.test(l.id)||ids.has(l.id)||typeof l.title!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(l.date)||!Array.isArray(l.videos||[]))throw new Error('保存的课时格式不完整');
      ids.add(l.id);
    }
    const restored={};for(const key of fields)if(p[key]!==undefined)restored[key]=p[key];
    restored.lessons=p.lessons;restored.done=new Set((Array.isArray(p.done)?p.done:[]).filter(id=>ids.has(id)));
    return restored;
  }
  return {KEY,encode,decode};
});
