# functions

def filter_or_create(Obj_model, kwargs):
    created = False
    obj = None
    obj = Obj_model.objects.filter(**kwargs)
    if not obj:
        obj = Obj_model.objects.create(**kwargs)
        created = True
    return obj, created
