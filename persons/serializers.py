from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'username', 'age']
    '''
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=100)
    age = serializers.IntegerField(allow_null=True)

    def create(self, validated_data):
        return Person.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.age = validated_data.get('age', instance.age)
        instance.save()
        return instance
    '''
