from django.shortcuts import render_to_response
from chooser.models import Pizza, Pizzeria, Topping

def home(request):
    return render_to_response('chooser/index.html', {
            'pizzerias': Pizzeria.objects.all(),
            'toppings': sorted(Topping.objects.all(), lambda a,b: cmp(a.name, b.name))
            })

def data(request):
    return render_to_response('chooser/data.js', {
            'pizzas': Pizza.objects.all(),
            'toppings': Topping.objects.all(),
            }, mimetype="application/x-javascript")

