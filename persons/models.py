from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

class Person(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=100)
    age = models.IntegerField(blank=True, null=True)

    class Meta:
        ordering = ['created']
    