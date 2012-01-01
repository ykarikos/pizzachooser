from django.shortcuts import render_to_response
from chooser.models import Pizza, Pizzeria, Topping

def home(request):
    return render_to_response('chooser/index.html', {
            'pizzerias': Pizzeria.objects.all(),
            })
