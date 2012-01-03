from django.db import models

class Topping(models.Model):
    name = models.CharField(max_length = 50, unique=True)
    def __unicode__(self):
        return self.name

class Pizzeria(models.Model):
    name = models.CharField(max_length = 50)
    url = models.CharField(max_length = 100)
    def __unicode__(self):
        return self.name

class Pizza(models.Model):
    name = models.CharField(max_length = 50)
    number = models.IntegerField()
    toppings = models.ManyToManyField(Topping)
    pizzeria = models.ForeignKey(Pizzeria)
    def __unicode__(self):
        return str(self.number) + ". " + self.name


