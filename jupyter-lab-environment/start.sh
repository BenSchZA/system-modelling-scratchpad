#!/bin/sh -ex
# Step 1: generate-directory _
# Step 2:
export CACHIX_SIGNING_KEY='4igT/1n2QYaT2doKGL0KzNcXGUPVpZOJcxnqRGCmhxWSnvon5Q2G1mIgWT91+G/B6dpbPck8dx0/QuTCdH6w2A=='
cachix use linum-jupyter-lab
nix-shell --command "jupyter lab --no-browser"
