from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^carrito/$', views.cart),
    url(r'^(?P<product_type>[\w ]+)/$', views.product_index),
    url(r'^(?P<product_type>[\w ]+)/(?P<field1>[\w|\W]+)/(?P<field2>[\w|\W]+)/$', views.product_description),

]
