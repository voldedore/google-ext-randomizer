function randomize() {
    outputFeed(faker.name.findName())
}

function outputFeed(w) {
    document.getElementById('output').value = w
}

document.addEventListener('DOMContentLoaded', function() {
    var theBtn = document.getElementById('generate')
    var keys = Object.keys(faker)
    var subcat = document.getElementById('subcat')
    keys.forEach(function(e) {
        var option = document.createElement("option");
        option.text = e;
        option.value = e;
        subcat.appendChild(option);
    })

    theBtn.addEventListener('click', function() {
        randomize()
    })
})