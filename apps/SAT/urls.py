from django.urls import path

from . import views

app_name = 'SAT'

urlpatterns = [
    path("", views.SAT.as_view(), name="index"),
    path("archivo_cae/", views.Archivo_CAE, name="CAE"),
]