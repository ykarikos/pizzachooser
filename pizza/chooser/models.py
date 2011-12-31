from django.db import models

class Filling(models.Model):
    name = models.CharField(max_length = 50)

class Pizzeria(models.Model):
    name = models.CharField(max_length = 50)

class Pizza(models.Model):
    name = models.CharField(max_length = 50)
    number = models.IntegerField()
    fillings = models.ManyToManyField(Filling)
    pizzeria = models.ForeignKey(Pizzeria)


