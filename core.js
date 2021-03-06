/**
 * @author Vinh VO (voldedore@gmail.com)
 */

var persistence;
var locale;

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

var getEl = function (id) {
  return document.getElementById(id);
};

var getClassNames = function (element) {
  return element.className.split(' ');
};

var addClassName = function (element, className) {
  var classNames = getClassNames(element);
  classNames.push(className);

  classNames = classNames.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });

  return classNames.join(' ');
};
