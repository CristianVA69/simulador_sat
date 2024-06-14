from django.db import models

# Create your models here.
class constancia(models.Model):
    numero_constancia = models.CharField(max_length=255)
    fecha = models.DateTimeField()
    estado = models.CharField(max_length=255)
    pago = models.BooleanField(default=False)
    