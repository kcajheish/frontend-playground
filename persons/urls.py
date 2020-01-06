from django.urls import path
from persons import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('persons/', views.person_list),
    path('persons/<int:pk>/', views.person_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)