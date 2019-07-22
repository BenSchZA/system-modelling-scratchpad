#!/bin/sh -ex
nix-shell python.nix --command "\
  source bin/activate &\
  PYTHONPATH=lib/python3.7/site-packages pip3.7 install -r requirements.txt --no-deps &\
  PYTHONPATH=lib/python3.7/site-packages pip3.7 install -r cadcad-requirements.txt"
