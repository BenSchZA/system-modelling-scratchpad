#!/usr/bin/env nix-shell
#!nix-shell -i bash --pure --keep CADCAD_KEY -p freetype gfortran python37Packages.numpy python37 python37Packages.setuptools python37Packages.virtualenvwrapper

set -o errexit -o nounset -o pipefail

virtualenv -p python3.7 venv

set +o nounset
source venv/bin/activate
set -o nounset

# Fix for: "ValueError: ZIP does not support timestamps before 1980"
export SOURCE_DATE_EPOCH=315532800

#cat <<EOF > requirements.txt
#--index-url https://${CADCAD_KEY}@repo.fury.io/blockscience
#cadCAD
#EOF
#pip install --no-deps -r requirements.txt

cat <<EOF > requirements.txt
pynverse
seaborn
cadCAD
EOF
pip install --no-deps -r requirements.txt

cat <<EOF > requirements.txt
matplotlib
funcy
pathos
tabulate
falcon
EOF
pip install -r requirements.txt
