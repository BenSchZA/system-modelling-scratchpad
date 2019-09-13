#!/usr/bin/env nix-shell
#!nix-shell -i bash --pure --keep CADCAD_KEY -p gfortran python37Packages.numpy python37 python37Packages.pip python37Packages.setuptools python37Packages.virtualenvwrapper

set -o errexit -o nounset -o pipefail

virtualenv -p python3.7 .

set +o nounset
source bin/activate
set -o nounset

#cat <<EOF > requirements.txt
#--index-url https://${CADCAD_KEY}@repo.fury.io/blockscience
#cadCAD
#EOF
#bin/pip3.7 install --no-deps -r requirements.txt

cat <<EOF > requirements.txt
pynverse
seaborn
cadCAD
EOF
bin/pip3.7 install --no-deps -r requirements.txt

cat <<EOF > requirements.txt
funcy
pathos
tabulate
EOF
bin/pip3.7 install -r requirements.txt
