(function(){function a(){const k=document.querySelector('.item--top'),l=document.querySelector('.item--next');l.classList.add('hidden'),k.style.cssText='',k.style.position='relative';const m=k.getBoundingClientRect();k.style.position='',l.classList.remove('hidden'),k.style.top=l.style.top=`${m.top}px`,k.style.width=l.style.width=`${m.width}px`,k.style.height=l.style.height=`${m.height}px`,k.onResize(),l.onResize()}function b(k){const l=document.querySelector('.item--top');window.ga&&ga('send','event',`item-${l.data.id}`,k.detail);const m=document.querySelector('.item--next'),n=document.querySelector('tinderforbananas-details');l.style.transform='',l.selected=0,l.data=m.data,m.data=j.next().value}function c(){const k=document.querySelector('.view--details');document.querySelectorAll('.control--like').forEach(l=>l.addEventListener('click',()=>{let n=Promise.resolve();k.classList.contains('hidden')||(n=e()),n.then(()=>document.querySelector('.item--top').like())})),document.querySelectorAll('.control--nope').forEach(l=>l.addEventListener('click',()=>{let n=Promise.resolve();k.classList.contains('hidden')||(n=e()),n.then(()=>document.querySelector('.item--top').nope())})),document.querySelectorAll('.control--superlike').forEach(l=>l.addEventListener('click',()=>{let n=Promise.resolve();k.classList.contains('hidden')||(n=e()),n.then(()=>document.querySelector('.item--top').superlike())}))}function d(){const l=document.querySelector('.view--swipelist'),m=l.querySelector('.item--top').data;window.ga&&ga('send','event',`item-${m.id}`,'details');const n=document.querySelector('.view--details'),o=n.querySelector('.item__details'),q=n.querySelector('.description'),r=n.querySelector('nav'),s=document.querySelector('tinderforbananas-carousel'),t=document.querySelector('.view--swipelist .item--top picture');n.querySelector('tinderforbananas-details').data=m;// Let’s do FLIP!
const u=t.getBoundingClientRect();l.classList.add('overlaid'),n.classList.remove('hidden');const v=s.getBoundingClientRect();return s.style.transformOrigin='top left',s.style.transform=`scaleX(${u.width/v.width}) scaleY(${u.height/v.height}) translate(${u.left-v.left}px, ${u.top-v.top}px)`,requestAnimationFramePromise().then(()=>requestAnimationFramePromise()).then(()=>{return s.style.transition='transform 0.15s ease-in-out',s.style.transform='initial',o.style.transform='initial',q.style.transform='initial',r.style.transform='initial',transitionEndPromise(s)}).then(()=>{s.style.transform='',s.style.transition='',s.style.transformOrigin=''})}function e(k){const l=document.querySelector('.view--swipelist'),m=document.querySelector('.view--details'),n=m.querySelector('.item__details'),o=m.querySelector('.description'),q=m.querySelector('nav'),r=document.querySelector('tinderforbananas-carousel'),s=document.querySelector('.view--swipelist .item--top'),t=document.querySelector('.view--swipelist .item--top picture');s.selected=k&&k.detail.selected||0;const u=r.getBoundingClientRect();l.classList.remove('overlaid'),m.classList.add('hidden');const v=t.getBoundingClientRect();return l.classList.add('overlaid'),m.classList.remove('hidden'),s.style.overflow='visible',r.style.transformOrigin='top left',r.style.transition='transform 0.15s ease-in-out',requestAnimationFramePromise().then(()=>requestAnimationFramePromise()).then(()=>{return r.style.transform=`scaleX(${v.width/u.width}) scaleY(${v.height/u.height}) translate(${v.left-u.left}px, ${v.top-u.top}px)`,n.style.transform='',o.style.transform='',q.style.transform='',transitionEndPromise(r)}).then(()=>{r.style.transform='',r.style.transition='',r.style.transformOrigin='',s.style.overflow='hidden',m.classList.add('hidden'),l.classList.remove('overlaid')})}function f(){document.querySelectorAll('.view--details .control').forEach(k=>{const l=Array.from(k.classList).find(n=>/(like|nope)/.test(n)),m=document.querySelector(`.view--swipelist .${l} svg`).cloneNode(!0);k.appendChild(m)})}function g(){'serviceWorker'in navigator&&navigator.serviceWorker.register('sw.js')}const i=[{id:0,name:'Saba',age:25,job:'Phillippines',images:['images/testpic4.jpg','images/testpic2.jpg','images/testpic1.jpg'],distance:25,description:'Swipe for me! You\u2019ll find me very ap-peel-ing'},{id:1,name:'Plantain',age:28,job:'Nicaragua',images:['images/testpic2.jpg','images/testpic4.jpg'],distance:4,description:'Lorem ipsum dolor sit amet, quo ad cibo viris legimus, simul delicata constituto per cu. Pro an commodo liberavisse, cu mutat sensibus tractatos est, animal similique ei nec. Et est molestie phaedrum, ut eam quot meliore. Usu hendrerit complectitur at, at iriure habemus facilisis sit. An eos probo graece.Propriae contentiones eu ius, pro eu ignota liberavisse disputationi, duo ea docendi consectetuer. Cum posse semper ea, ius invidunt qualisque scriptorem cu, ullum reprehendunt pro eu. Illud erant reformidans usu in. Ad vim quem choro iracundia. Ius in case mnesarchum.Duis signiferumque sed cu. Ut duo error congue intellegebat, fugit nostrud urbanitas ei has. Copiosae dissentias te eam, dicta efficiendi mea ad. Numquam persequeris te sea, ad populo graeci per, et mea aperiam noluisse interesset.Malorum abhorreant pri eu, no vidit quaeque mei, usu in dico meliore philosophia. Causae verterem pri in, te case suavitate nam. In ius ignota sanctus. Propriae repudiandae ad sit, gubergren ullamcorper usu ei. Ne vis fierent mediocritatem. Id nominati maluisset ius, soluta graece lobortis ut his, vocibus copiosae placerat est ad.Duo alia ferri impetus ei, deleniti scriptorem comprehensam ius an. Mea ne labore oblique adolescens. Ne velit albucius salutatus quo, cum iudico eripuit bonorum ad. Stet suscipit sea ad. Nec prompta suscipit mandamus at.'},{id:2,name:'Banan',age:21,job:'Finnland',images:['images/testpic3.jpg','images/testpic2.jpg'],distance:9,description:'I like fruits!'},{id:3,name:'Actually an orange',age:12,job:'Scammer',images:['images/testpic1.jpg','images/testpic2.jpg'],distance:2455,description:'Follow me on my totally banana-related Instagram \uD83D\uDCF8'}],j=function*(){for(;;)yield*i}();document.addEventListener('DOMContentLoaded',function(){const k=document.querySelector('.item--top');k.data=j.next().value,k.addEventListener('swipe',b),k.addEventListener('details',d);const l=document.querySelector('.item--next');l.data=j.next().value;const m=document.querySelector('tinderforbananas-details');m.addEventListener('dismiss',e),f(),a(),window.addEventListener('resize',a),c(),g()})})();