import sys, re, chooser
from chooser.models import Pizza, Topping, Pizzeria

class ParseException(Exception):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.value)

def saveTopping(name):
    existing = Topping.objects.filter(name=name)
    if len(existing) == 1:
        return existing[0]
    elif len(existing) == 0:
        topping = Topping(name=name)
        topping.save()
        return topping
    else:
        raise ParseException("Invalid topping name: " + name)

def savePizza(line, pizzeria):
    m = matchPizza.match(line)
    if m != None:
        number = m.group(1)
        name = m.group(2)
        toppings = map(lambda x: saveTopping(x), map(lambda x: x.strip(), m.group(3).split(",")))
        pizza = Pizza(pizzeria=pizzeria, name=name, number=number)
        pizza.save()
        for t in toppings:
            pizza.toppings.add(t)
        print("Added pizza " + str(pizza))
    else:
        raise ParseException("Invalid input line: " + line)

def savePizzeria(path):
    filename = path.split("/")[-1]
    filenameParts = filename.split(".")
    if len(filenameParts) != 2:
        raise ParseException("Illegal fixture filename: " + filename)
    
    pizzerias = Pizzeria.objects.filter(name=filenameParts[0])
    if len(pizzerias) == 0:
        pizzeria = Pizzeria(name=filenameParts[0])
        pizzeria.save()
        print("Added pizzeria " + filenameParts[0])
        return pizzeria
    else:
        raise ParseException("Pizzeria already exists: " + filenameParts[0])


if len(sys.argv) < 2:
    print("Usage: loadfixture.py Fixturename.pizza")
    exit(0)

matchPizza = re.compile("^([0-9]+). ([^:]+): (.+)$");

f = open(sys.argv[1], "r")

try:
    pizzeria = savePizzeria(sys.argv[1])
    for line in f:
        savePizza(line.rstrip(), pizzeria)
except ParseException, e:
    print >> sys.stderr, e
    exit(1)
