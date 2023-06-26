var __awaiter=this&&this.__awaiter||function(e,t,i,a){
  return new(i||(i=Promise))((function(r,n){
    function s(e){try{o(a.next(e))}
      catch(e){n(e)}}
    function l(e){try{o(a.throw(e))}
    catch(e){n(e)}}
    function o(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,l)}o((a=a.apply(e,t||[])).next())}))};
  const CUST_REV=4,
    CUST_REV_ADV=8;
    var CustPlatform;
    !function(e){e[e.Undefined=0]="Undefined",e[e.Erista=1]="Erista",e[e.Mariko=2]="Mariko",e[e.All=3]="All"}(CustPlatform||(CustPlatform={}));
  class CustEntry{
    constructor(e,t,i,a,r,n,s=[0,1e6],l=1,o=!0){this.id=e,this.name=t,this.platform=i,this.size=a,this.desc=r,this.defval=n,this.step=l,this.zeroable=o,this.min=s[0],this.max=s[1]}
    validate(){let e=new ErrorToolTip(this.id).clear();return Number.isNaN(this.value)||void 0===this.value?(e.setMsg("Invalid value: Not a number").show(),!1):!(!this.zeroable||0!=this.value)||(this.value<this.min||this.value>this.max?(e.setMsg(`Expected range: [${this.min}, ${this.max}], got ${this.value}.`).show(),!1):this.value%this.step==0||(e.setMsg(`${this.value} % ${this.step} ≠ 0`).show(),!1))}getInputElement(){return document.getElementById(this.id)}
    updateValueFromElement(){var e;this.value=Number(null===(e=this.getInputElement())||void 0===e?void 0:e.value)}
    isAvailableFor(e){return e===CustPlatform.Undefined||this.platform===e||this.platform===CustPlatform.All}
    createElement(){let e=this.getInputElement();if(!e){let t=document.createElement("div");t.classList.add("grid","cust-element"),e=document.createElement("input"),e.min=String(this.zeroable?0:this.min),e.max=String(this.max),e.id=this.id,e.type="number",e.step=String(this.step);let i=document.createElement("label");i.setAttribute("for",this.id),i.innerHTML=this.name,i.appendChild(e),t.appendChild(i);let a=document.createElement("blockquote");a.innerHTML="<ul>"+this.desc.map((e=>`<li>${e}</li>`)).join("")+"</ul>",a.setAttribute("for",this.id),t.appendChild(a),document.getElementById("config-list-basic").appendChild(t),new ErrorToolTip(this.id).addChangeListener()}e.value=String(this.value)}
    setElementValue(){this.getInputElement().value=String(this.value)}
    setElementDefaultValue(){this.getInputElement().value=String(this.defval)}
    removeElement(){let e=this.getInputElement();e&&e.parentElement.parentElement.remove()}
    showElement(){let e=this.getInputElement();e&&e.parentElement.parentElement.style.removeProperty("display")}
    hideElement(){let e=this.getInputElement();e&&e.parentElement.parentElement.style.setProperty("display","none")}
  }
  class AdvEntry extends CustEntry{createElement(){let e=this.getInputElement();if(!e){let t=document.createElement("div");t.classList.add("grid","cust-element"),e=document.createElement("input"),e.min=String(this.zeroable?0:this.min),e.max=String(this.max),e.id=this.id,e.type="number",e.step=String(this.step);let i=document.createElement("label");i.setAttribute("for",this.id),i.innerHTML=this.name,i.appendChild(e),t.appendChild(i);let a=document.createElement("blockquote");a.innerHTML="<ul>"+this.desc.map((e=>`<li>${e}</li>`)).join("")+"</ul>",a.setAttribute("for",this.id),t.appendChild(a),document.getElementById("config-list-advanced").appendChild(t),new ErrorToolTip(this.id).addChangeListener()}e.value=String(this.value)}}
    var CustTable=[new CustEntry("mtcConf",
      "DRAM Timing",
        CustPlatform.Mariko,4,["<b>0</b>: AUTO_ADJ_ALL: Auto adjust timings with LPDDR4 3733 Mbps specs, 8Gb density. Change timing with Advanced Config (Default)",
          "<b>1</b>: CUSTOM_ADJ_ALL: Adjust only non-zero preset timings in Advanced Config",
          "<b>2</b>: NO_ADJ_ALL: No timing adjustment (Timing becomes tighter if you raise dram clock)  Might achieve better performance but lower maximum frequency is expected."],0,[0,2],1),
    new CustEntry("commonCpuBoostClock",
      "Boost Clock in kHz",
        CustPlatform.All,4,["System default: 1785000","Boost clock will be applied when applications request higher CPU frequency for quicker loading.","This will be set regardless of whether sys-clk is enabled."],1785e3,[102e4,3e6],1,!1),
    new CustEntry("commonEmcMemVolt",
      "EMC Vddq (Erista Only) & RAM Vdd2 Voltage in uV",
        CustPlatform.All,4,["Acceptable range: 1100000 ≤ x ≤ 1250000, and it should be divided evenly by 12500.","Erista Default (HOS): 1125000 (bootloader: 1100000)","Mariko Default: 1100000 (It will not work without sys-clk-OC)","Micron Official lpddr4(x) range: 1060mV~1170mV","Not enabled by default"],0,[11e5,125e4],12500),
    new CustEntry("eristaCpuMaxVolt",
      "Erista CPU Max Voltage in mV",
        CustPlatform.Erista,4,["Acceptable range: 1100 ≤ x ≤ 1300","L4T Default: 1235"],1235,[1100,1300],1),
    new CustEntry("eristaEmcMaxClock",
      "Erista RAM Max Clock in kHz",
        CustPlatform.Erista,4,["Values should be ≥ 1600000, and divided evenly by 3200.",
          "Recommended Clocks: 1862400, 2131200 (JEDEC)",
          "<b>WARNING:</b> RAM overclock could be UNSTABLE if timing parameters are not suitable for your DRAM"],1862400,[16e5,2131200],3200),
    new CustEntry("marikoCpuMaxVolt",
      "Mariko CPU Max Voltage in mV",
        CustPlatform.Mariko,4,["System default: 1120","Acceptable range: 1100 ≤ x ≤ 1300"],1235,[1100,1300],5),
    new CustEntry("marikoEmcMaxClock",
      "Mariko RAM Max Clock in kHz",
        CustPlatform.Mariko,4,["Values should be ≥ 1600000, and divided evenly by 3200.",
          "Recommended Clocks: 1862400, 2131200, 2400000 (JEDEC)",
          "<b>WARNING:</b> RAM overclock could be UNSTABLE if timing parameters are not suitable for your DRAM."],1996800,[16e5,24e5],3200),
    new CustEntry("marikoEmcVddqVolt",
      "EMC Vddq (Mariko Only) Voltage in uV",
        CustPlatform.Mariko,4,["Acceptable range: 550000 ≤ x ≤ 650000","Value should be divided evenly by 5000","Default: 600000","Micron Official lpddr4(x) range: 570mV~650mV","Not enabled by default.","This will not work without sys-clk-OC."],0,[55e4,65e4],5e3)],AdvTable=[new AdvEntry("marikoCpuUV","Enable Mariko CPU Undervolt",
        CustPlatform.Mariko,4,["Reduce CPU power draw","Your CPU might not withstand undervolt and performance might drop",
          "<b>0</b> : Default Table",
          "<b>1</b> : Undervolt Level 1 (SLT)"],0,[0,1],1),
    new AdvEntry("marikoGpuUV",
      "Enable Mariko GPU Undervolt",
        CustPlatform.Mariko,4,["Reduce GPU power draw","Your GPU might not withstand undervolt and may not work properly","Can hang your console, or crash games",
          "<b>0</b> : Default Table",
          "<b>1</b> : Undervolt Level 1 (SLT: Aggressive)",
          "<b>2</b> : Undervolt Level 2 (HiOPT: Drastic)"],0,[0,2],1),
    new AdvEntry("ramTimingPresetOne",
      "[1] tRCD - tRP - tRAS (tRC = tRP + tRAS)",
        CustPlatform.Mariko,4,[
          "Primary RAM Timing Preset",
          "<b>0</b> : Do Not Adjust (2400Mhz: 12 - 12 - 28) (CUSTOM_ADJ only)",
          "<b>1</b> : 18 - 18 - 42 (Default timing)",
          "<b>2</b> : 17 - 17 - 39",
          "<b>3</b> : 16 - 16 - 36",
          "<b>4</b> : 15 - 15 - 34",
          "<b>5</b> : 14 - 14 - 32",
          "<b>6</b> : 13 - 13 - 30"],1,[0,6],1),
    new AdvEntry("ramTimingPresetTwo",
      "[2] tRRD - tFAW",
        CustPlatform.Mariko,4,[  
          "Secondary RAM Timing Preset",
          "tRRD : Row-To-Row Delay",
          "tFAW : Four Activate Window",
          "<b>0</b> : Do Not Adjust (2400Mhz: 6.6 - 26.6) (CUSTOM_ADJ only)",
          "<b>1</b> : 10 - 40 (Default timing) (3733 specs)",
          "<b>2</b> : 7.5 - 30 (4266 specs)",
          "<b>3</b> : 6 - 24",
          "<b>4</b> : 4 - 16",
          "<b>5</b> : 3 - 12"],1,[0,5],1),
    new AdvEntry("ramTimingPresetThree",
      "[3] tWR - tRTP",
        CustPlatform.Mariko,4,[
          "Secondary RAM Timing Preset",
          "<b>0</b> : Do Not Adjust (2400Mhz: ?? - 5) (CUSTOM_ADJ only)",
          "<b>1</b> : 18 - 7.5 (Default timing)",
          "<b>2</b> : 15 - 7.5",
          "<b>3</b> : 15 - 6",
          "<b>4</b> : 12 - 6",
          "<b>5</b> : 12 - 4",
          "<b>6</b> : 8 - 4"],1,[0,6],1),
    new AdvEntry("ramTimingPresetFour",
      "[4] tRFC",
        CustPlatform.Mariko,4,[  
          "Secondary RAM Timing Preset",
          "<b>0</b> : Do Not Adjust (2400Mhz: 93.3) (CUSTOM_ADJ only)",
          "<b>1</b> : 140 (Default timing)",
          "<b>2</b> : 120",
          "<b>3</b> : 100",
          "<b>4</b> : 80",
          "<b>5</b> : 60"],1,[0,5],1),
    new AdvEntry("ramTimingPresetFive",
      "[5] tWTR",
        CustPlatform.Mariko,4,[  
          "Secondary RAM Timing Preset",
          "<b>0</b> : Do Not Adjust (2400Mhz: ??) (CUSTOM_ADJ only)",
          "<b>1</b> : 10 (Default timing)",
          "<b>2</b> : 8",
          "<b>3</b> : 6",
          "<b>4</b> : 4",
          "<b>5</b> : 2",
          "<b>6</b> : 1"],1,[0,6],1),
    new AdvEntry("ramTimingPresetSix",
      "[6] tREFpb",
        CustPlatform.Mariko,4,[
          "Tertiary RAM Timing Preset",
          "<b>0</b> : Do Not Adjust (2400Mhz: 325) (CUSTOM_ADJ only)",
          "<b>1</b> : 488 (Default timing)",
          "<b>2</b> : 976",
          "<b>3</b> : 1952",
          "<b>4</b> : 3256",
          "<b>5</b> : MAX"],1,[0,5],1),
    new AdvEntry("ramTimingPresetSeven",
      "[7] WL - RL",
        CustPlatform.Mariko,4,[
          "Latency decrement",
          "WL (Write latency) = AL - CWL",
          "RL (Read Latency) = AL + CL",        
          "AL : Addictive Latency",
          "CWL = Column-Address-Strobe Write Latency",
          "CL : CAS latency",
          "<b>0</b> : Default Latency for AUTO_ADJ, Do Not Adjust for CUSTOM_ADJ",
          "<b>1</b> : -2 - -4",
          "<b>2</b> : -4 - -8",
          "<b>3</b> : -6 - -12",
          "<b>4</b> : -8 - -16",
          "<b>5</b> : -10 - -20",
          "<b>6</b> : -12 - -24"],1,[0,6],1)];
  class ErrorToolTip{constructor(e,t){this.id=e,this.msg=t,this.id=e,this.element=document.getElementById(e),t&&this.setMsg(t)}
    setMsg(e){return this.msg=e,this}
    show(){var e,t,i,a,r,n;return null===(e=this.element)||void 0===e||e.setAttribute("aria-invalid","true"),this.msg&&(null===(t=this.element)||void 0===t||t.setAttribute("title",this.msg),null===(a=null===(i=this.element)||void 0===i?void 0:i.parentElement)||void 0===a||a.setAttribute("data-tooltip",this.msg),null===(n=null===(r=this.element)||void 0===r?void 0:r.parentElement)||void 0===n||n.setAttribute("data-placement","top")),this}
    clear(){var e,t,i,a,r,n;return null===(e=this.element)||void 0===e||e.removeAttribute("aria-invalid"),null===(t=this.element)||void 0===t||t.removeAttribute("title"),null===(a=null===(i=this.element)||void 0===i?void 0:i.parentElement)||void 0===a||a.removeAttribute("data-tooltip"),null===(n=null===(r=this.element)||void 0===r?void 0:r.parentElement)||void 0===n||n.removeAttribute("data-placement"),this}
    addChangeListener(){var e;null===(e=this.element)||void 0===e||e.addEventListener("change",(e=>{let t=CustTable.filter((e=>e.id===this.id))[0];t.value=Number(this.element.value),t.validate()}))}}
  class CustStorage{constructor(){this.storage={},this.key="last_saved"}
    updateFromTable(){CustTable.forEach((e=>{var t;if(e.updateValueFromElement(),!e.validate())throw null===(t=e.getInputElement())||void 0===t||t.focus(),new Error(`Invalid ${e.name}`)})),AdvTable.forEach((e=>{var t;if(e.updateValueFromElement(),!e.validate())throw null===(t=e.getInputElement())||void 0===t||t.focus(),new Error(`Invalid ${e.name}`)})),this.storage={};let e=Object.fromEntries(CustTable.map((e=>[e.id,e.value])));Object.keys(e).forEach((t=>this.storage[t]=e[t])),e=Object.fromEntries(AdvTable.map((e=>[e.id,e.value]))),Object.keys(e).forEach((t=>this.storage[t]=e[t]))}
    setTable(){let e=Object.keys(this.storage);e.forEach((e=>CustTable.filter((t=>t.id==e))[0].value=this.storage[e])),e.forEach((e=>AdvTable.filter((t=>t.id==e))[0].value=this.storage[e])),CustTable.filter((t=>!e.includes(t.id))).forEach((e=>e.value=e.defval)),AdvTable.filter((t=>!e.includes(t.id))).forEach((e=>e.value=e.defval)),CustTable.forEach((e=>{var t;if(!e.validate())throw null===(t=e.getInputElement())||void 0===t||t.focus(),new Error(`Invalid ${e.name}`);e.setElementValue()})),AdvTable.forEach((e=>{var t;if(!e.validate())throw null===(t=e.getInputElement())||void 0===t||t.focus(),new Error(`Invalid ${e.name}`);e.setElementValue()}))}
    save(){localStorage.setItem(this.key,JSON.stringify(this.storage))}
    load(){let e=localStorage.getItem(this.key);if(!e)return null;let t=JSON.parse(e),i=CustTable.map((e=>e.id)),a=Object.keys(t).filter((e=>!i.includes(e)));return a.length&&console.log(`Ignored: ${a}`),Object.keys(t).filter((e=>i.includes(e))).forEach((e=>this.storage[e]=t[e])),i=AdvTable.map((e=>e.id)),a=Object.keys(t).filter((e=>!i.includes(e))),a.length&&console.log(`Ignored: ${a}`),Object.keys(t).filter((e=>i.includes(e))).forEach((e=>this.storage[e]=t[e])),this.storage}}
  class Cust{constructor(){this.storage=new CustStorage,this.magic=1414747459,this.magicLen=4,this.mapper={2:{get:e=>this.view.getUint16(e,!0),set:(e,t)=>this.view.setUint16(e,t,!0)},4:{get:e=>this.view.getUint32(e,!0),set:(e,t)=>this.view.setUint32(e,t,!0)}}}
    findMagicOffset(){this.view=new DataView(this.buffer);for(let e=0;e<this.view.byteLength;e+=this.magicLen)if(this.mapper[this.magicLen].get(e)==this.magic)return void(this.beginOffset=e);throw new Error("Invalid loader.kip file")}
    save(){this.storage.updateFromTable();let e=e=>{var t,i;if(!e.offset)throw null===(t=e.getInputElement())||void 0===t||t.focus(),new Error(`Failed to get offset for ${e.name}`);let a=this.mapper[e.size];if(!a)throw null===(i=e.getInputElement())||void 0===i||i.focus(),new Error(`Unknown size at ${e.name}`);a.set(e.offset,e.value)};CustTable.forEach(e),8==this.rev&&AdvTable.forEach(e),this.storage.save();let t=document.createElement("a");t.href=window.URL.createObjectURL(new Blob([this.buffer],{type:"application/octet-stream"})),t.download="loader.kip",t.click(),this.toggleLoadLastSavedBtn(!0)}
    removeHTMLForm(){CustTable.forEach((e=>e.removeElement()))}
    toggleLoadLastSavedBtn(e){let t=document.getElementById("load_saved");e?(t.addEventListener("click",(()=>{this.storage.load()&&this.storage.setTable()})),t.style.removeProperty("display"),t.removeAttribute("disabled")):t.style.setProperty("display","none")}
    createHTMLForm(){var e;CustTable.forEach((e=>e.createElement()));let t=document.createElement("p");t.innerHTML="Advanced configuration",null===(e=document.getElementById("config-list-advanced"))||void 0===e||e.appendChild(t),AdvTable.forEach((e=>e.createElement()));let i=document.getElementById("load_default");i.removeAttribute("disabled"),i.addEventListener("click",(()=>{CustTable.forEach((e=>e.setElementDefaultValue()))})),this.toggleLoadLastSavedBtn(null!==this.storage.load());let a=document.getElementById("save");a.removeAttribute("disabled"),a.addEventListener("click",(()=>{try{this.save()}catch(e){console.error(e),alert(e)}}))}
    initCustTabs(){const e=Array.from(document.querySelectorAll('nav[role="tablist"] > button'));e.forEach((t=>{t.removeAttribute("disabled");let i=Number(t.getAttribute("data-platform"));t.addEventListener("click",(a=>{const r=["outline"];t.classList.remove(...r),e.filter((e=>e!=t)).forEach((e=>e.classList.add(...r))),CustTable.forEach((e=>{e.isAvailableFor(i)?e.showElement():e.hideElement()}))}))}))}
    parse(){let e=this.beginOffset+this.magicLen;if(this.rev=this.mapper[4].get(e),4!=this.rev&&8!=this.rev)throw new Error(`Unsupported custRev, expected: 4 or 8, got ${this.rev}`);e+=4,document.getElementById("cust_rev").innerHTML=`Cust v${this.rev} is loaded.`;let t=t=>{var i;t.offset=e;let a=this.mapper[t.size];if(!a)throw null===(i=t.getInputElement())||void 0===i||i.focus(),new Error(`Unknown size at ${t}`);t.value=a.get(e),e+=t.size,t.validate()};CustTable.forEach(t),8==this.rev&&AdvTable.forEach(t)}
    load(e){try{this.buffer=e,this.findMagicOffset(),this.removeHTMLForm(),this.parse(),this.initCustTabs(),this.createHTMLForm()}catch(e){console.error(e),alert(e)}}}
  class ReleaseAsset{constructor(e){this.downloadUrl=e.browser_download_url,this.updatedAt=e.updated_at}}
  class ReleaseInfo{constructor(){this.ocLatestApi="https://api.github.com/repos/hanai3Bi/Switch-OC-Suite/releases/latest"}
    load(){return __awaiter(this,void 0,void 0,(function*(){try{this.parseOcResponse(yield this.responseFromApi(this.ocLatestApi).catch())}catch(e){console.error(e),alert(e)}}))}
    responseFromApi(e){return __awaiter(this,void 0,void 0,(function*(){const t=yield fetch(e,{method:"GET",headers:{Accept:"application/json"}});if(t.ok)return yield t.json();throw new Error(`Failed to connect to "${e}": ${t.status}`)}))}
    parseOcResponse(e){this.ocVer=e.tag_name,this.amsVer=this.ocVer.split(".").slice(0,3).join("."),this.loaderKipAsset=new ReleaseAsset(e.assets.filter((e=>e.name.endsWith("loader.kip")))[0]),this.sdOutZipAsset=new ReleaseAsset(e.assets.filter((e=>e.name.endsWith(".zip")))[0]),this.amsUrl=`https://github.com/Atmosphere-NX/Atmosphere/releases/tags/${this.amsVer}`}}
  class DownloadSection{constructor(){this.element=document.getElementById("download_btn_grid")}
    load(){return __awaiter(this,void 0,void 0,(function*(){for(;!this.isVisible();)yield new Promise((e=>setTimeout(e,1e3)));const e=new ReleaseInfo;yield e.load(),this.update("loader_kip_btn",`loader.kip <b>${e.ocVer}</b><br>${e.loaderKipAsset.updatedAt}`,e.loaderKipAsset.downloadUrl),this.update("sdout_zip_btn",`SdOut.zip <b>${e.ocVer}</b><br>${e.sdOutZipAsset.updatedAt}`,e.sdOutZipAsset.downloadUrl),this.update("ams_btn",`Atmosphere-NX <b>${e.amsVer}</b>`,e.amsUrl)}))}
    isVisible(){let e=this.element.getBoundingClientRect();return e.top>0&&e.left>0&&e.bottom-e.height<(window.innerHeight||document.documentElement.clientHeight)&&e.right-e.width<(window.innerWidth||document.documentElement.clientWidth)}
    update(e,t,i){let a=document.getElementById(e);a.innerHTML=t,a.removeAttribute("aria-busy"),a.setAttribute("href",i)}}const fileInput=document.getElementById("file");fileInput.addEventListener("change",(e=>{var t=new Cust;if(!e.target||!e.target.files)return;let i=new FileReader;i.readAsArrayBuffer(e.target.files[0]),i.onloadend=e=>{e.target.readyState==FileReader.DONE&&t.load(e.target.result)}})),addEventListener("DOMContentLoaded",(e=>__awaiter(this,void 0,void 0,(function*(){yield(new DownloadSection).load()}))));
