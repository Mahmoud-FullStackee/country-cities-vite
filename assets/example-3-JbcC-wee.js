import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as l,$ as e}from"./select2.min-BGbhjLGJ.js";l(e);const c={EG:{name:"Egypt",flag:"eg",cities:["Cairo","Giza","Alexandria"]},US:{name:"United States",flag:"us",cities:["New York","Los Angeles","Chicago"]},IN:{name:"India",flag:"in",cities:["Delhi","Mumbai","Bangalore"]},DE:{name:"Germany",flag:"de",cities:["Berlin","Munich","Frankfurt"]}};e(document).ready(()=>{const s=Object.entries(c).map(([t,{name:a,flag:n}])=>({id:t,text:`<img class="flag-icon" src="flags/${n}.png" style="width: 20px; height: 15px; margin-right: 5px;" /> ${a}`}));e("#country").select2({data:s,escapeMarkup:t=>t,placeholder:"Select Country"}),e("#city").select2({placeholder:"Select City",disabled:!0}),e("#country").on("change",function(){const t=e(this).val(),a=c[t];if(a){const n=a.cities.map(i=>({id:i,text:i}));e("#city").empty(),n.forEach(i=>{const r=new Option(i.text,i.id,!1,!1);e("#city").append(r)}),e("#city").prop("disabled",!1).trigger("change")}else e("#city").empty().prop("disabled",!0).trigger("change")})});
