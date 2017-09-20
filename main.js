(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        content  = document.getElementById('main'),
        saveBtn  = document.getElementById('save'),
        langSel  = document.getElementById('lang'),
        persistenceChkBox = document.getElementById('save-last-chosen');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    menuLink.onclick = function (e) {
        toggleAll(e);
    };

    content.onclick = function(e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    };

    var savedLocale = 'en';
    var persistence = true;

    function assignSettings(value) {
      savedLocale = value.locale;
      persistence = value.persistence;

      for (var keys in langSel.children) {
        if (savedLocale === langSel.children[keys].value) {
          langSel.children[keys].selected = true;
        }
      }

      persistenceChkBox.checked = persistence;
    }

    getSettings(assignSettings);

    // Fill language select
    for(var keys in faker.locales) {
      var title = faker.locales[keys].title;

      var option = document.createElement("option");
      option.text = title;
      option.value = keys;
      langSel.appendChild(option);
    }

    // Save button event
    saveBtn.onclick = function (e) {
      var locale = langSel.value;
      var persistence = persistenceChkBox.checked;
      setSettings({
        locale: locale,
        persistence: persistence
      }, 'status');

    };

}(this, this.document));
