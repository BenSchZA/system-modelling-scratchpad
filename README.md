# System Modelling Scratchpad

Modelling of system architecture using cadCAD, Jupyter notebooks, and other simulation tools.

## What is cadCAD?

See https://github.com/BlockScience/cadCAD
> cadCAD: a differential games based simulation software package for research, validation, and Computer Aided Design of economic systems

> ...cadCAD allows us to use code to help solidify our conceptualized ideas and run them to see if the outcome meets our expectations. We can then iteratively refine our work until we have constructed a model that closely reflects reality at the start of the model, and see how it evolves. We can then use these results to inform business decisions.

## Methodology

When using system modelling for problem solving, the following methodology should be used, as an agile feedback loop:

1. Problem formulation
2. Modelling
3. Simulation
4. System design
5. System implementation
6. Experimentation
7. Interpretation
8. Verification
9. Rinse & repeat

## Context

For the first time we have the opportunity to create small markets where we retain some form of control of variables - either via vesting periods, trading frequency, trade transaction sizes, escrow & associated burning, curve parameters via CW adjustments, etc. In comparison to traditional markets which are pretty stochastic, static, and not open to manipulation (in a good way hopefully), we now have some powerful tools to apply control engineering to these systems. Some of the same discussions brought up below can now be reevaluated!

* https://economics.stackexchange.com/questions/12709/does-control-system-engineering-have-a-place-in-economics
* https://quant.stackexchange.com/questions/17825/application-of-control-theory-in-quantitative-finance

## Deploying Jupyter Lab with cadCAD (Docker or Nix)

**FIRST** export the following environment variables:
1. Only if you plan on using a remote Docker registry: `export JUPYTER_LAB_IMAGE=_YOUR_IMAGE_NAME_HERE_`
2. `export CADCAD_KEY=_YOUR_KEY_HERE_`

**THEN**

1. `cd jupyter-lab-environment`
2. `docker-compose up --build`

**OR** if you're in a Unix environment

1. `cd jupyter-lab-environment`
2. Install Nix: `curl https://nixos.org/nix/install | sh`
3. Install Cachix: `nix-env -iA cachix -f https://cachix.org/api/v1/install`
4. `cachix use linum-jupyter-lab && cachix use jupyterwith`
5. `./install-venv.sh`
5. `./start.sh`

**NB** for both of the above methods, make sure to include the following two lines in your notebook to import the Python dependancies:

```
import sys
sys.path.append("../lib/python3.7/site-packages")
```

## Relevant Resources

* cadCAD tutorial GitHub: https://github.com/BlockScience/SimCAD-Tutorials.git
* Jupyterhub: https://jupyterhub.giveth.io
