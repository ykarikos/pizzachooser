var notAllowedFillings = new Array();
var mustHaveFillings = new Array();
for (var p in pizzas) {
    notAllowedFillings[pizzas[p]] = new Array();
    mustHaveFillings[pizzas[p]] = new Array();
}


var SHOW = 1;
var SHOW_DEFAULT = 2;
var NO_SHOW = 0;

var defaultPizzaState = SHOW_DEFAULT;
var mustHaveCount = 0;
var pizzaStates = new Array();

resetStates();

function resetStates() {
    for (var p in pizzas) {
        pizzaStates[pizzas[p]] = defaultPizzaState;
    }
}

function disable(id) {
    document.getElementById(id).disabled = true;
    document.getElementById(id + "Label").style["color"] = "#888";
}

function enable(id) {
    document.getElementById(id).disabled = false;
    document.getElementById(id + "Label").style["color"] = "#000";
}

function mustHave(checkbox) {
    var f = checkbox.id.substring(0, checkbox.id.length-2);
    var fillingPizzas = filling[f];
    
    if (checkbox.checked) {
        disable(f + "Off");
        mustHaveCount++;
        for (var p in fillingPizzas) {
            mustHaveFillings[fillingPizzas[p]].push(f);
        }
    } else {
        mustHaveCount--;
        enable(f + "Off");
        for (var p in pizzas) {
            var newArray = new Array();
            oldFillings = mustHaveFillings[pizzas[p]]
            for (var f2 in oldFillings) {
                if (oldFillings[f2] != f) {
                    newArray.push(oldFillings[f2]);
                }
            }
            mustHaveFillings[pizzas[p]] = newArray;
        }
    }
    updateStates();
    updateView();
}


function notAllowed(checkbox) {
    var f = checkbox.id.substring(0, checkbox.id.length-3);
    var fillingPizzas = filling[f];
    
    if (checkbox.checked) {
        disable(f + "On");
        for (var p in fillingPizzas) {
            notAllowedFillings[fillingPizzas[p]].push(f);
        }
    } else {
        enable(f + "On");
        for (var p in pizzas) {
            var newArray = new Array();
            oldFillings = notAllowedFillings[pizzas[p]]
            for (var f2 in oldFillings) {
                if (oldFillings[f2] != f) {
                    newArray.push(oldFillings[f2]);
                }
            }
            notAllowedFillings[pizzas[p]] = newArray;
        }
    }
    updateStates();
    updateView();
}

function updateStates() {
    var mustHaveSet = 0;
    for (var p in pizzas) {
        if (mustHaveFillings[pizzas[p]].length > 0) {
            mustHaveSet = 1;
        }

        if (notAllowedFillings[pizzas[p]].length > 0) {
            pizzaStates[pizzas[p]] = NO_SHOW;
        } else if (mustHaveFillings[pizzas[p]].length == mustHaveCount) {
            pizzaStates[pizzas[p]] = SHOW;
        } else {
            pizzaStates[pizzas[p]] = SHOW_DEFAULT;
        }
    }

    if (mustHaveSet) {
        defaultPizzaState = NO_SHOW;
    } else {
        defaultPizzaState = SHOW;
    }
}

function updateView() {
    for (var p in pizzas) {
        if (pizzaStates[pizzas[p]] == NO_SHOW ||
            (pizzaStates[pizzas[p]] == SHOW_DEFAULT &&
             defaultPizzaState == NO_SHOW)) {
            var e = document.getElementById("pizza" + pizzas[p]);
            if (e) {
                e.style["display"] = "none";
            }
        } else {
            var e = document.getElementById("pizza" + pizzas[p]);
            if (e) {
                e.style["display"] = "list-item";
            }
        }
    }
}
