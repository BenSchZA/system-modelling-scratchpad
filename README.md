# Molecule System Modelling

Modelling of the Molecule system architecture using cadCAD, Jupyter notebooks, and other simulation tools.

![Molecule system architecture](https://gitlab.com/linumlabs/molecule-system-modelling/raw/35e07f3b303c9e92bf8dc7fdb62bae3ad4d225c6/media/system-architecture.png)

## What is cadCAD?

> ‘Complex Adaptive Dynamics Computer Aided design’ is a python based unified modeling framework for stochastic dynamical systems and differential games capable of modeling systems at all levels of abstraction from Agent Based Modeling (ABM) to System Dynamics (SD), and enables smooth integration of computational social science simulations and empirical data science workflows. Software is in private beta, building towards open source launch.

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

