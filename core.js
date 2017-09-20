var persistence;

function getSettings(callback) {
  chrome.storage.sync.get({
    locale: 'en',
    persistence: true,
    catName: 'name',
    subCatName: 'findName',
  }, function(obj) {
    callback(obj);
  });
}

function setSettings(obj, id) {
  chrome.storage.sync.set(obj, function() {
    // Update status to let user know options were saved.
    if (typeof(id) !== 'undefined' && id.length) {
      var status = document.getElementById(id);
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 2000);
    }

  });
}
