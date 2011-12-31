from django.shortcuts import render_to_response
from chooser.models import Pizza, Pizzeria, Topping

def home(request):
    pizzerias = Pizzeria.objects.all()
    return render_to_response('chooser/index.html', {
            'pizzerias': pizzerias,
            })
