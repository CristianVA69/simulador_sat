from datetime import datetime
from django.contrib import messages
import requests
from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

from apps.SAT.models import constancia



# Create your views here.
class SAT(TemplateView):
    template_name = 'SAT/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context = {
            'model': constancia.objects.all(),
            'contador': constancia.objects.count()
        }
        return context
    
    def mandar_datos_CAE(self,url,resultado):
        respuesta = requests.post(url,resultado)
        if respuesta.status_code == 200:
            messages.success(self.request,'El registro se realizó con éxito.')
        else :
            messages.success(self.request,'error al mandar a CAE.')
    
    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            numero_constancia = request.POST.get('numero')
            respuesta = request.POST.get('respuesta')
            if respuesta == 'SI':
                #se manda post a CAE
                instancia = constancia.objects.get(numero_constancia = numero_constancia)
                instancia.pago = True
                instancia.save()
                self.mandar_datos_CAE('/',True)
            else:
                #se manda False a CAE
                print('no se pago jiji :D')
                self.mandar_datos_CAE('/',False)
        return redirect('SAT:index')

#Integracion con CAE
@csrf_exempt
def Archivo_CAE(request):
    if request.method == 'POST' and 'archivo' in request.FILES:
        archivo = request.FILES['archivo']
        if archivo.name.endswith('.txt'):
            contenido = archivo.read().decode('utf-8').split('|')
            #Agregar datos al catalogo cuentas aduaneras
            datos = {
                'numero_constancia' : contenido[2],
                'fecha': datetime.strptime(contenido[5], "%d-%m-%Y"),
                'estado': contenido[8]
            }
            print(datos)
            instancia = constancia(**datos)
            instancia.save()
            return JsonResponse({'mensaje': 'Archivo recibido', 'contenido': contenido})
        else:
            return HttpResponseBadRequest('El archivo debe ser un .txt')
    return HttpResponseBadRequest('Método no permitido o archivo no proporcionado')