#!/bin/sh -ex
nix-store -qR --include-outputs $(nix-instantiate default.nix) | cachix push linum-jupyter-lab
docker-compose build
docker-compose push
# kubectl apply -f kubernetes
