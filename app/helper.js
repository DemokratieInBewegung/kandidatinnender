window.requestAnimationFramePromise = _ => new Promise(requestAnimationFrame);
window.transitionEndPromise = elem => new Promise(resolve => {
  elem.addEventListener('transitionend', resolve, {once: true});
});
window.shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
window.lerp = (minIn, maxIn, minOut, maxOut, opts = {}) => {
  const rangeIn = maxIn - minIn;
  const rangeOut = maxOut - minOut;
  
  return (v) => {
    v = opts.absolute ? Math.abs(v) : v;
    let p;
    if (opts.noClamp) p = (v - minIn) / rangeIn;
    else p = Math.max(Math.min((v - minIn) / rangeIn, 1), 0);
    return p * rangeOut + minOut;
  };
}