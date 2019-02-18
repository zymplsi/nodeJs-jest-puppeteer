function querySendEventListener() {
  document
    .getElementById('query-send')
    .addEventListener('click', function(event) {
      queryDisplayClear();
      querySendWait();

      socket.emit('query-send', document.getElementById('query-input').value);
      event.preventDefault();
    });
}
function querySendWait() {
  queryDisable(true);
  document.getElementById('query-wait').innerHTML = '...Please Wait';
}

function querySendDone() {
  queryDisable(false);
  document.getElementById('query-wait').innerHTML = '';
}

function queryDisable(state) {
  el1 = document.getElementById('query-input');
  el2 = document.getElementById('query-send');

  if (state) {
    el1.setAttribute('disabled', true);
    el2.setAttribute('disabled', true);
  } else {
    el1.removeAttribute('disabled');
    el2.removeAttribute('disabled');
  }
}

function queryDisplayResult(result) {
  document.getElementById('query-result').innerHTML = JSON.stringify(
    result
  );
}

function queryDisplayError(result) {
  document.getElementById('query-error').innerHTML = 'Error: ' + JSON.stringify(
    result
  );
}

function queryDisplayClear() {
  document.getElementById('query-result').innerHTML = '';
  document.getElementById('query-error').innerHTML = '';
}
