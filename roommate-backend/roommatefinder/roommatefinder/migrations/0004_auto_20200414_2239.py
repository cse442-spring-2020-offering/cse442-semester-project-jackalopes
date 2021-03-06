# Generated by Django 2.0.13 on 2020-04-14 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roommatefinder', '0003_remove_user_matches'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='animal_friendly',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('AN', 'Any'), ('FE', 'Female'), ('MA', 'Male'), ('OT', 'Other')], default='AN', max_length=2),
        ),
        migrations.AddField(
            model_name='user',
            name='max_age',
            field=models.IntegerField(default=30, verbose_name=(18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119)),
        ),
        migrations.AddField(
            model_name='user',
            name='max_distance',
            field=models.IntegerField(default=30, verbose_name=(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99)),
        ),
        migrations.AddField(
            model_name='user',
            name='show_profile',
            field=models.BooleanField(default=True),
        ),
    ]
