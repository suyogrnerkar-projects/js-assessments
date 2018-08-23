var _ = {
  textOne: document.getElementById("text1"),
  textTwo: document.getElementById("text2"),
  pause: document.getElementById("pause"),
  reverse: document.getElementById("reverse"),
  forward: document.getElementById("forward")
}, handler;

_.reverse
  .addEventListener('click', function () {
    if (_.textOne.value.length == 0) {
      alert('Cannot copy empty string');
      return;
    }
    var temp = _.textOne.value.split('');
    clearInterval(handler);
    handler = setInterval(function () {
      _.textTwo.value += temp.splice(0, 1);
      _.textOne.value = temp.join('');
      if (temp.length == 0) {
        clearInterval(handler);
      }
    }, 1000);
  });


_.pause
  .addEventListener('click', function () {
    clearInterval(handler);
  });


_.forward
  .addEventListener('click', function () {
    if (_.textTwo.value.length == 0) {
      alert('Cannot copy empty string');
      return;
    }
    var temp = _.textTwo.value.split('');
    clearInterval(handler);
    handler = setInterval(function () {
      _.textOne.value = temp.pop() + _.textOne.value;
      _.textTwo.value = temp.join('');
      if (temp.length == 0) {
        clearInterval(handler);
      }
    }, 1000);
  });