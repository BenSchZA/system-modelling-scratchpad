# Molecule System Modelling

Modelling of the Molecule system architecture using cadCAD, Jupyter notebooks, and other simulation tools.

![Molecule system architecture](https://gitlab.com/linumlabs/molecule-system-modelling/raw/7a64b01b44ba21d5bc52590dde81d1f089fb366b/media/catalyst-architecture.png)

## What is cadCAD?

See https://github.com/BlockScience/cadCAD
> cadCAD: a differential games based simulation software package for research, validation, and Computer Aided Design of economic systems

## Objectives

From cadCAD:
> ...cadCAD allows us to use code to help solidify our conceptualized ideas and run them to see if the outcome meets our expectations. We can then iteratively refine our work until we have constructed a model that closely reflects reality at the start of the model, and see how it evolves. We can then use these results to inform business decisions.

Our objective is to:

1. Identify modules of the Molecule system that can benefit from being modelled, simulated, and designed.
2. Extract these modules and create the basic logical building blocks needed.
3. Optimize the system using an agile feedback loop.
4. Use these insights to implement a more informed, better designed, system.

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

## Plan of Development

### Blackbox Components

The components defined in the system diagram that could be simulated and optimized using cadCAD, and broken down further if necessary.

1. Approval registry
2. Public market
3. Bounty system
4. Funding pool
5. Governance

### State Variables

These are some of the variables that would be in the system state, that we have some form of control over.

1. Creator escrow
2. Vesting period
3. Max token supply & max collateral pool
4. Curve type
5. Curve taxation
6. Funding rounds

### Potential Applications

Based on specific Molecule use cases and seeing what’s possible from previous cadCAD examples, here are a few applications:

1. Bonding curve risk thresholds & analysis
2. Application of robust control to bonding curve design
3. Resilience to bot trading & black swan events
4. Approval registry incentive optimization

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
