var getEl = function (id) {
  return document.getElementById(id);
};

function outputFeed(w) {
  var outputTxtArea = getEl('output')
  if (typeof(w) === 'function') {
    var x = w.apply(null, []);
  }
  outputTxtArea.value = x;
}

var copy = function () {
  getEl('output').select();
  var copied = document.execCommand('copy');

  if (copied) {

  }
};

function triggerEvent(el, eventName, options) {
  var event;
  if (window.CustomEvent) {
    event = new CustomEvent(eventName, options);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, options);
  }
  el.dispatchEvent(event);
}

document.addEventListener('DOMContentLoaded', function() {
  var catName = '',
      subCatName = '';

  var genBtn = getEl('generate'),
      genAndCopyBtn = getEl('gen-and-copy'),
      catSelect = getEl('cat'),
      subCatSelect = getEl('subcat');

  function assignSettings(value) {
    catName = value.catName;
    subCatName = value.subCatName;
    persistence = value.persistence;

    if (persistence) {
      for (var keys in catSelect.children) {
        if (catName === catSelect.children[keys].value) {
          catSelect.children[keys].selected = true;
        }
      }

      triggerEvent(catSelect, 'change');

      for (var keys in subCatSelect.children) {
        if (subCatName === subCatSelect.children[keys].value) {
          subCatSelect.children[keys].selected = true;
        }
      }
    }

  }

  function randomize() {
    subCatName = subCatSelect.options[subCatSelect.selectedIndex].value;
    outputFeed(faker[catName][subCatName]);

    //Save settings if user want to
    if (persistence) {
      setSettings({catName: catName, subCatName: subCatName});
    }
  }

  var genAndCopy = function () {
    randomize();
    copy();
  }

  // Fill our 2 selects
  Object.keys(faker).forEach(function(e) {
    // Remove locale, localeFallback, locales
    var outOfScope = ['locale', 'localeFallback', 'locales', 'fake', 'definitions', 'helpers'];
    //TODO: use definitions instead of current way
    if (outOfScope.indexOf(e) === -1) {
        var option = document.createElement("option");
        option.text = e;
        option.value = e;
        catSelect.appendChild(option);
    }
  });

  //Save settings if user want to
  getSettings(assignSettings);

  // On change of category select
  catSelect.addEventListener('change', function () {
    catName = this.options[this.selectedIndex].value;

    // Clear select
    subCatSelect.innerHTML = '';

      Object.keys(faker[catName]).forEach(function(e) {
            var option = document.createElement("option");
            option.text = e;
            option.value = e;
            subCatSelect.appendChild(option);
      });
  });

  // Trigger change for the first init
  triggerEvent(catSelect, 'change');

  // On click of main button
  genBtn.addEventListener('click', randomize);
  genAndCopyBtn.addEventListener('click', genAndCopy);
});
