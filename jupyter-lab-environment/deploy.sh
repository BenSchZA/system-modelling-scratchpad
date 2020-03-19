#!/usr/bin/env nix-shell
#!nix-shell -i bash -p python36 awscli docker-compose
set -ex
nix-store -qR --include-outputs $(nix-instantiate shell.nix) | cachix push linum-jupyter-lab
docker-compose build
$(aws ecr get-login --no-include-email --region $REGION)
docker-compose push
# kubectl apply -f kubernetes
