from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse


def main(request):
    return HttpResponseRedirect(reverse('client'))

