#!/usr/bin/env nix-shell
#!nix-shell -i bash --pure --option sandbox false

set -o errexit -o nounset -o pipefail

# generate-directory @jupyter-widgets/jupyterlab-manager@0.38 plotlywidget @jupyterlab/plotly-extension jupyterlab-chart-editor
jupyter lab --allow-root --no-browser --ip=0.0.0.0 --port=8888 --LabApp.token=''
