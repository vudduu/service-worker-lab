const createElWithText = (id, type, text) => {
  const para = document.createElement(type);
  const t = document.createTextNode(text);
  para.appendChild(t);
  document.getElementById(id).appendChild(para);
};

const fetchJson = (url) => {
  return fetch(url).then((response) => response.json());
};

const onPageLoaded = () => {
  fetchJson('/api/user-data').then(function(json) {
    createElWithText('content2', 'h2', 'user: ' + json.user);
    createElWithText('content2', 'h3', 'name: ' + json.name);
  });

  fetchJson('/api/user-list').then(function(json) {
    console.log('/api/user-list', json);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
      console.log('Service Worker Registered');
    });
  }
};

window.addEventListener('load', onPageLoaded);
