/**
 * @author Vinh VO (voldedore@gmail.com)
 */

// Declaration of some utilities of the popup
/**
 * Set the text area content to generated random data
 * @param fakerFunction function Function of Faker lib to be called.
 */
var outputFeed = function(fakerFunction) {
  var outputTextArea = getEl('output'),
    outputText = '';
  if (typeof(fakerFunction) === 'function') {
    outputText = fakerFunction.apply(null, []);
  }
  outputTextArea.value = outputText;
};

/**
 * Copy text area content to the system clipboard (API provided by Google)
 */
var copyToClipboard = function() {
  getEl('output').select();
  var copied = document.execCommand('copy');

  if (copied) {

  }
};

/**
 * Trigger an event
 * @param el Element source for the event
 * @param eventName Name of event
 * @param options Options for the event
 */
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

// Main process to be done when DOM Loaded
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
    locale = value.locale;

    //Set lang
    faker.locale = value.locale;

    var keys;
    if (persistence) {
      for (keys in catSelect.children) {
        if (catName === catSelect.children[keys].value) {
          catSelect.children[keys].selected = true;
        }
      }
    }

    triggerEvent(catSelect, 'change');

    for (keys in subCatSelect.children) {
      if (subCatName === subCatSelect.children[keys].value) {
        subCatSelect.children[keys].selected = true;
      }
    }

    // Trigger click for the Generate button to avoid empty textarea on popup start
    triggerEvent(genBtn, 'click');

  }

  function randomize() {
    subCatName = subCatSelect.options[subCatSelect.selectedIndex].value;
    outputFeed(faker[catName][subCatName]);

    //Save settings if user want to
    if (persistence) {
      setSettings({
        catName: catName,
        subCatName: subCatName
      });
    }
  }

  var genAndCopy = function() {
    randomize();
    copyToClipboard();
  };

  // Fill our 2 selects
  Object.keys(faker).forEach(function(e) {
    // Remove locale, localeFallback, locales
    var outOfScope = ['locale', 'localeFallback', 'locales', 'fake', 'definitions', 'helpers', 'random'];
    //TODO: use definitions instead of current way
    if (outOfScope.indexOf(e) === -1) {
      var option = document.createElement("option");
      option.text = e;
      option.value = e;
      catSelect.appendChild(option);
    }
  });

  // On change of category select
  catSelect.addEventListener('change', function() {
    var option;

    catName = this.options[this.selectedIndex].value;

    // Clear select
    subCatSelect.innerHTML = '';

    Object.keys(faker[catName]).forEach(function(e) {
      option = document.createElement("option");
      option.text = e;
      option.value = e;
      subCatSelect.appendChild(option);
    });
  });



  // On click of main button
  genBtn.addEventListener('click', randomize);
  genAndCopyBtn.addEventListener('click', genAndCopy);

  //Get saved settings
  getSettings(assignSettings);
});
