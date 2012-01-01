var pizzas = [{% for p in pizzas %}{{p.id}}, {% endfor %}];
var topping = [];

{% for t in toppings %}
topping['{{ t|cut:" " }}'] = [{% for p in t.pizza_set.all %}{{p.id}}, {% endfor %}]; {% endfor %}

var mustHaveCheckboxes = [{% for t in toppings %}'{{ t|cut:" " }}On', {% endfor %}];

