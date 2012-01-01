var notAllowedToppings = new Array();
var mustHaveToppings = new Array();
for (var p in pizzas) {
    notAllowedToppings[pizzas[p]] = new Array();
    mustHaveToppings[pizzas[p]] = new Array();
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
    var toppingPizzas = topping[f];
    
    if (checkbox.checked) {
        disable(f + "Off");
        mustHaveCount++;
        for (var p in toppingPizzas) {
            mustHaveToppings[toppingPizzas[p]].push(f);
        }
    } else {
        mustHaveCount--;
        enable(f + "Off");
        for (var p in pizzas) {
            var newArray = new Array();
            oldToppings = mustHaveToppings[pizzas[p]]
            for (var f2 in oldToppings) {
                if (oldToppings[f2] != f) {
                    newArray.push(oldToppings[f2]);
                }
            }
            mustHaveToppings[pizzas[p]] = newArray;
        }
    }
    updateStates();
    updateView();
}


function notAllowed(checkbox) {
    var f = checkbox.id.substring(0, checkbox.id.length-3);
    var toppingPizzas = topping[f];
    
    if (checkbox.checked) {
        disable(f + "On");
        for (var p in toppingPizzas) {
            notAllowedToppings[toppingPizzas[p]].push(f);
        }
    } else {
        enable(f + "On");
        for (var p in pizzas) {
            var newArray = new Array();
            oldToppings = notAllowedToppings[pizzas[p]]
            for (var f2 in oldToppings) {
                if (oldToppings[f2] != f) {
                    newArray.push(oldToppings[f2]);
                }
            }
            notAllowedToppings[pizzas[p]] = newArray;
        }
    }
    updateStates();
    updateView();
}

function updateStates() {
    var mustHaveSet = 0;
    for (var p in pizzas) {
        if (mustHaveToppings[pizzas[p]].length > 0) {
            mustHaveSet = 1;
        }

        if (notAllowedToppings[pizzas[p]].length > 0) {
            pizzaStates[pizzas[p]] = NO_SHOW;
        } else if (mustHaveToppings[pizzas[p]].length == mustHaveCount) {
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
