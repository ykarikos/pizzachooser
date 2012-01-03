#!/bin/sh

export DJANGO_SETTINGS_MODULE=settings
python pizza/loadfixture.py $*