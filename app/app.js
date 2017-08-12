(function () {
  const items = shuffle([
    {
      id: 0,
      name: 'Joe Roesler',
      age: 25,
      number: 2,
      city: 'Leipzig',
      state: 'Sachsen',
      job: 'Busfahrer',
      images: ['images/joe.jpg'],
      phone: '+49.161.2345.2345',
      description: 'Swipe for me! You’ll find me very ap-peel-ing'
    },
    {
      id: 1,
      name: 'Lea Brunn',
      age: 28,
      number: 1,
      city: 'Dortmund',
      state: 'Nordrhein-Westfalen',
      job: 'Studentin',
      images: ['images/lea.jpg', 'images/lea_dib_gruendungsparteitag.jpg', 'images/lea_julia.png', 'images/buvo_berlin.jpg'],
      phone: "+49.163.2123.1232",
      description: 'Ich bin 28 und studiere "Philosophie und Politikwissenschaft" in Dortmund. Bei DiB werde ich für Gerechtigkeit zwischen Frauen* und Männern kämpfen, damit Politik bunter und vielfältiger wird.'
    },
    {
      id: 2,
      name: 'Sara Redolfi',
      age: 28,
      number: 1,
      city: 'Mitte',
      state: 'Berlin',
      job: 'Referenting im Auswärtigen Amt',
      images: ['images/Sara-Redolfi.png', 'images/Sara-2.jpg', 'images/Sara-3.jpg'],
      phone: "+49.163.2123.1232",
      description: 'Ich arbeite im Auswärtigen Amt und schreibe parallel an meiner politikwissenschaftlichen Masterarbeit. Ich bin bei DiB, weil Deutschland eine wertebasierte Politik im Interesse seiner Bürger benötigt und weil unsere Kinder unser Bestes verdienen.'
    },
    // {
    //   id: 2,
    //   name: 'Banan',
    //   age: 21,
    //   job: 'Finnland',
    //   images: ['images/testpic3.jpg', 'images/testpic2.jpg'],
    //   distance: 9,
    //   description: 'I like fruits!'
    // },
    // {
    //   id: 3,
    //   name: 'Actually an orange',
    //   age: 12,
    //   job: 'Scammer',
    //   images: ['images/testpic1.jpg', 'images/testpic2.jpg'],
    //   distance: 2455,
    //   description: 'Follow me on my totally banana-related Instagram 📸'
    // }
  ]);

  const dataProvider = (function* () {
    while (true) {
      yield *items;
    }
  })();

  function adjustSwipeItems() {
    const top = document.querySelector('.item--top');
    const next = document.querySelector('.item--next');
    next.classList.add('hidden');
    top.style.cssText = '';
    top.style.position = 'relative';
    const topR = top.getBoundingClientRect();
    top.style.position = '';
    next.classList.remove('hidden');
    top.style.top = next.style.top = `${topR.top}px`;
    top.style.width = next.style.width = `${topR.width}px`;
    top.style.height = next.style.height = `${topR.height}px`;
    top.onResize();
    next.onResize();
  }

  function updateCards(event) {
    const top = document.querySelector('.item--top');
    window.ga && ga('send', 'event', `item-${top.data.id}`, event.detail);
    const next = document.querySelector('.item--next');
    const details = document.querySelector('tinderforbananas-details');
    top.style.transform = '';
    top.selected = 0;
    top.data = next.data;
    next.data = dataProvider.next().value;
  }

  function hookupButtons() {
    const details = document.querySelector('.view--details');
    document.querySelectorAll('.control--like').forEach(btn => 
      btn.addEventListener('click', _ => {
        let p = Promise.resolve();
        if (!details.classList.contains('hidden')) {
          p = hideDetails();
        }
        p.then(_ => document.querySelector('.item--top').like());
      })
    );
    document.querySelectorAll('.control--nope').forEach(btn =>
      btn.addEventListener('click', _ => {
        let p = Promise.resolve();
        if (!details.classList.contains('hidden')) {
          p = hideDetails();
        }
        p.then(_ => document.querySelector('.item--top').nope());
      })
    );
    document.querySelectorAll('.control--superlike').forEach(btn => 
      btn.addEventListener('click', _ => {
        let p = Promise.resolve();
        if (!details.classList.contains('hidden')) {
          p = hideDetails();
        }
        p.then(_ => document.querySelector('.item--top').superlike());
      })
    );
  }

  function showDetails(event) {
    const swipelist = document.querySelector('.view--swipelist');
    const data = swipelist.querySelector('.item--top').data;
    window.ga && ga('send', 'event', `item-${data.id}`, 'details');
    const details = document.querySelector('.view--details');
    const detailsText1 = details.querySelector('.item__details');
    const detailsText2 = details.querySelector('.description');
    const detailsNav = details.querySelector('nav');
    const carousel = document.querySelector('tinderforbananas-carousel');
    const image = document.querySelector('.view--swipelist .item--top picture');
    details.querySelector('tinderforbananas-details').data = data;

    // Let’s do FLIP!
    const start = image.getBoundingClientRect();
    
    swipelist.classList.add('overlaid');
    details.classList.remove('hidden');

    const target = carousel.getBoundingClientRect();
    carousel.style.transformOrigin = 'top left';
    carousel.style.transform = `scaleX(${start.width/target.width}) scaleY(${start.height/target.height}) translate(${start.left - target.left}px, ${start.top - target.top}px)`;   
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        carousel.style.transition = 'transform 0.15s ease-in-out';
        carousel.style.transform = 'initial';
        detailsText1.style.transform = 'initial';
        detailsText2.style.transform = 'initial';
        detailsNav.style.transform = 'initial';
        return transitionEndPromise(carousel);
      })
      .then(_ => {
        carousel.style.transform = '';
        carousel.style.transition = '';
        carousel.style.transformOrigin = '';
      });

  }

  function hideDetails(event) {
    const swipelist = document.querySelector('.view--swipelist');
    const details = document.querySelector('.view--details');
    const detailsText1 = details.querySelector('.item__details');
    const detailsText2 = details.querySelector('.description');
    const detailsNav = details.querySelector('nav');
    const carousel = document.querySelector('tinderforbananas-carousel');
    const item = document.querySelector('.view--swipelist .item--top');
    const image = document.querySelector('.view--swipelist .item--top picture');

    item.selected = event && event.detail.selected || 0;

    const start = carousel.getBoundingClientRect();
    swipelist.classList.remove('overlaid');
    details.classList.add('hidden');
    const target = image.getBoundingClientRect();
    swipelist.classList.add('overlaid');
    details.classList.remove('hidden');

    item.style.overflow = 'visible';
    carousel.style.transformOrigin = 'top left';
    carousel.style.transition = 'transform 0.15s ease-in-out';
    return requestAnimationFramePromise()
      .then(_ => requestAnimationFramePromise())
      .then(_ => {
        carousel.style.transform = `scaleX(${target.width/start.width}) scaleY(${target.height/start.height}) translate(${target.left - start.left}px, ${target.top - start.top}px)`;   
        detailsText1.style.transform = '';
        detailsText2.style.transform = '';
        detailsNav.style.transform = '';
        return transitionEndPromise(carousel);
      })
      .then(_ => {
        carousel.style.transform = '';
        carousel.style.transition = '';
        carousel.style.transformOrigin = '';
        item.style.overflow = 'hidden';
        details.classList.add('hidden');
        swipelist.classList.remove('overlaid');
      });
  }

  function copyControls() {
    document.querySelectorAll('.view--details .control').forEach(btn => {
      const actionName = Array.from(btn.classList).find(name => /(like|nope)/.test(name));
      const svg = document.querySelector(`.view--swipelist .${actionName} svg`).cloneNode(true);
      btn.appendChild(svg);
    });
  }

  function installServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('sw.js');
  }

  function init() {
    const top = document.querySelector('.item--top');
    top.data = dataProvider.next().value;
    top.addEventListener('swipe', updateCards);
    top.addEventListener('details', showDetails);
    const next = document.querySelector('.item--next');
    next.data = dataProvider.next().value;
    const details = document.querySelector('tinderforbananas-details');
    details.addEventListener('dismiss', hideDetails);
    copyControls();
    adjustSwipeItems();
    window.addEventListener('resize', adjustSwipeItems);
    hookupButtons();
    installServiceWorker();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
