#!/usr/bin/env nix-shell
#!nix-shell -i ./papermill-venv/bin/python3.7 -p python37 python37Packages.pip python37Packages.setuptools python37Packages.virtualenvwrapper

#virtualenv -p python3.7 papermill-venv

print("Hello world!")

import papermill as pm

pm.execute_notebook(
   'workspace/molecule-alpha.ipynb',
   'workspace/molecule-alpha-papermill.ipynb',
   parameters = dict(alpha=0.6, ratio=0.1)
)

