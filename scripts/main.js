document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".header-slider");if(e){let D=0;const w=document.querySelectorAll(".slide"),b=document.querySelectorAll(".dot"),S=document.querySelector(".slider-btn.prev"),E=document.querySelector(".slider-btn.next");function t(e){w.forEach(e=>e.classList.remove("active")),b.forEach(e=>e.classList.remove("active")),e>=w.length&&(D=0),e<0&&(D=w.length-1),w[D].classList.add("active"),b[D].classList.add("active")}function n(){D++,t(D)}let L=setInterval(n,5e3);E.addEventListener("click",()=>{clearInterval(L),n(),L=setInterval(n,5e3)}),S.addEventListener("click",()=>{clearInterval(L),D--,t(D),L=setInterval(n,5e3)}),b.forEach((e,a)=>{e.addEventListener("click",()=>{clearInterval(L),D=a,t(D),L=setInterval(n,5e3)})}),e.addEventListener("mouseenter",()=>clearInterval(L)),e.addEventListener("mouseleave",()=>{L=setInterval(n,5e3)})}document.querySelectorAll(".menu-toggle").forEach(e=>{e.addEventListener("click",function(){const e=this.closest(".main-nav")?this.closest(".main-nav").querySelectorAll(".nav-links"):null;e&&e[0].classList.toggle("active")})});let a=[],o={showPast:!1,category:"all",query:""},r=null;const s=["January","February","March","April","May","June","July","August","September","October","November","December"];function c(e){return new Date(e+"T00:00:00")}function l(e){const t=function(){const e=new Date;return new Date(e.getFullYear(),e.getMonth(),e.getDate())}();let n=e.filter(e=>o.showPast||c(e.date)>=t);if("all"!==o.category&&(n=n.filter(e=>e.category===o.category)),o.query){const e=o.query.toLowerCase();n=n.filter(t=>(t.title+" "+t.location+" "+t.description).toLowerCase().includes(e))}return n}function i(){const e=document.getElementById("events-list");if(!e)return;const t=l(a);e.innerHTML="",t.forEach(t=>e.insertAdjacentHTML("beforeend",function(e){const t=c(e.date),n=s[t.getMonth()],a=String(t.getDate()),o=String(t.getFullYear()).slice(-4);return'<article class="event-item" data-date="'+e.date+'" data-category="'+e.category+'"><div class="event-date"><span class="month">'+n+'</span><span class="day">'+a+'</span><span class="year">'+o+'</span></div><div class="event-details"><h3>'+e.title+'</h3><p class="event-time">'+e.time+'</p><p class="event-location">'+e.location+"</p><p>"+e.description+"</p></div></article>"}(t)));const n=document.getElementById("no-events-message");n&&(n.style.display=0===t.length?"block":"none")}const d=document.querySelectorAll(".category-btn");d.length&&d.forEach(e=>{e.addEventListener("click",function(){d.forEach(e=>e.classList.remove("active")),this.classList.add("active"),o.category=this.dataset.category,i()})});const u=document.getElementById("filter-toggle");u&&u.addEventListener("click",function(){o.showPast=!o.showPast,this.textContent=o.showPast?"Hide Past Events":"Show Past Events",i()});const y=document.getElementById("event-search");y&&y.addEventListener("input",function(){clearTimeout(r),o.query=this.value.trim(),r=setTimeout(i,150)}),document.getElementById("events-list")&&fetch("events/events.json").then(e=>e.json()).then(e=>{a=Array.isArray(e)?e:[],i()}).catch(()=>{a=[],i()}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();const t=document.querySelector(this.getAttribute("href"));t&&window.scrollTo({top:t.offsetTop-80,behavior:"smooth"})})});let m=document.createElement("button");m.textContent="↑",m.style.cssText="\n        position: fixed;\n        bottom: 30px;\n        right: 30px;\n        width: 50px;\n        height: 50px;\n        background-color: var(--primary-color);\n        color: white;\n        border: none;\n        border-radius: 50%;\n        font-size: 1.5rem;\n        cursor: pointer;\n        opacity: 0;\n        transition: all 0.3s ease;\n        z-index: 999;\n    ",m.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})}),document.body.appendChild(m),window.addEventListener("scroll",function(){window.scrollY>300?m.style.opacity="1":m.style.opacity="0"});const v=document.querySelector("form");v&&v.addEventListener("submit",function(e){e.preventDefault();const t=v.querySelector('input[type="email"]'),n=v.querySelector("textarea");t.value&&n.value?(alert("Thank you for your message! We will get back to you soon."),v.reset()):alert("Please fill in all required fields.")});const h=document.getElementById("events-card-title");if(h){const T=new Date,q=["January","February","March","April","May","June","July","August","September","October","November","December"][T.getMonth()],C=T.getDate(),M=T.getFullYear();h.textContent=`Events - ${q} ${C}, ${M}`}function addLiturgicalDays(date, days) {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
}
function firstSundayOfAdvent(year) {
    const nov30 = new Date(Date.UTC(year, 10, 30));
    const weekday = nov30.getUTCDay();
    return addLiturgicalDays(nov30, weekday <= 3 ? -weekday : 7 - weekday);
}
function easterSunday(year) {
    const golden = year % 19;
    const century = Math.floor(year / 100);
    const yearOfCentury = year % 100;
    const centuryLeap = Math.floor(century / 4);
    const centuryRemainder = century % 4;
    const solarCorrection = Math.floor((century + 8) / 25);
    const lunarCorrection = Math.floor((century - solarCorrection + 1) / 3);
    const paschalFullMoon = (19 * golden + century - centuryLeap - lunarCorrection + 15) % 30;
    const weekdayCorrection = (32 + 2 * centuryRemainder + 2 * Math.floor(yearOfCentury / 4) - paschalFullMoon - yearOfCentury % 4) % 7;
    const moonRange = Math.floor((golden + 11 * paschalFullMoon + 22 * weekdayCorrection) / 451);
    const month = Math.floor((paschalFullMoon + weekdayCorrection - 7 * moonRange + 114) / 31);
    const day = (paschalFullMoon + weekdayCorrection - 7 * moonRange + 114) % 31 + 1;
    return new Date(Date.UTC(year, month - 1, day));
}
function movableFeasts(year) {
    const easter = easterSunday(year);
    const offset = (days) => addLiturgicalDays(easter, days);
    return {
        epiphany: new Date(Date.UTC(year, 0, 6)),
        ashWednesday: offset(-46),
        palmSunday: offset(-7),
        goodFriday: offset(-2),
        easterSunday: easter,
        pentecost: offset(49),
        christmasDay: new Date(Date.UTC(year, 11, 25)),
        adventSunday: firstSundayOfAdvent(year)
    };
}
function liturgicalSeason(today, feasts) {
    const gaudeteStart = addLiturgicalDays(feasts.adventSunday, 14);
    const gaudeteEnd = addLiturgicalDays(feasts.adventSunday, 21);
    if (today >= feasts.adventSunday && today < feasts.christmasDay) {
        return today >= gaudeteStart && today < gaudeteEnd ? "advent-gaudete" : "advent-preparation";
    }
    if (today >= feasts.christmasDay || +today <= +feasts.epiphany) return "christmas-epiphany";
    if (today >= feasts.ashWednesday && today < feasts.palmSunday) return "lent-purple";
    if (today >= feasts.palmSunday && today < feasts.easterSunday) return "holy-week-red";
    if (+today === +feasts.pentecost) return "pentecost-red";
    if (today >= feasts.easterSunday && today < feasts.pentecost) return "easter-white-gold";
    return "ordinary-time-green";
}
function updateLiturgicalColors() {
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const season = liturgicalSeason(today, movableFeasts(now.getFullYear()));
    const palettes = {
        "advent-preparation": { background: "#1a3d6e", text: "#ffffff", accent: "#d4af37" },
        "advent-gaudete": { background: "#b0526a", text: "#ffffff", accent: "#ffffff" },
        "christmas-epiphany": { background: "#f4e7c3", text: "#1a1a2e", accent: "#6b4e00" },
        "lent-purple": { background: "#6b2c7e", text: "#ffffff", accent: "#d4af37" },
        "holy-week-red": { background: "#c41e3a", text: "#ffffff", accent: "#f4e7c3" },
        "pentecost-red": { background: "#c41e3a", text: "#ffffff", accent: "#f4e7c3" },
        "easter-white-gold": { background: "#f4e7c3", text: "#1a1a2e", accent: "#6b4e00" }
    };
    const palette = palettes[season];
    const body = document.body;
    if (!palette) {
        body.classList.remove("anglican-calendar-active", "liturgical-light", "liturgical-dark");
        return;
    }
    const light = palette.text === "#1a1a2e";
    const root = document.documentElement.style;
    root.setProperty("--liturgical-color", palette.background);
    root.setProperty("--liturgical-text", palette.text);
    root.setProperty("--liturgical-accent", palette.accent);
    root.setProperty("--liturgical-border", light ? "rgba(26,26,46,0.2)" : "rgba(255,255,255,0.3)");
    body.classList.add("anglican-calendar-active", light ? "liturgical-light" : "liturgical-dark");
    body.classList.remove(light ? "liturgical-dark" : "liturgical-light");
}
updateLiturgicalColors();
});
