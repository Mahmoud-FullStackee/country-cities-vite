import"./modulepreload-polyfill-B5Qt9EMX.js";const d={EG:{name:"Egypt",flag:"eg",cities:["Cairo","Giza","Alexandria"]},US:{name:"United States",flag:"us",cities:["New York","Los Angeles","Chicago"]},IN:{name:"India",flag:"in",cities:["Delhi","Mumbai","Bangalore"]},DE:{name:"Germany",flag:"de",cities:["Berlin","Munich","Frankfurt"]}},r=document.getElementById("country-select"),u=r.querySelector(".selected"),n=r.querySelector(".options"),l=document.getElementById("city");Object.entries(d).forEach(([i,{name:t,flag:c}])=>{const e=document.createElement("li");e.dataset.value=i,e.innerHTML=`<img src="flags/${c}.png" /> ${t}`,n.appendChild(e)});u.addEventListener("click",()=>{n.style.display=n.style.display==="block"?"none":"block"});n.addEventListener("click",i=>{var a;const t=i.target.closest("li");if(!t)return;const c=t.dataset.value;u.textContent=t.textContent,n.style.display="none";const e=((a=d[c])==null?void 0:a.cities)||[];l.disabled=e.length===0,l.innerHTML='<option value="" disabled selected>Select City</option>',e.forEach(s=>{const o=document.createElement("option");o.value=s,o.textContent=s,l.appendChild(o)})});
