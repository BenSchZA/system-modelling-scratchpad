#generate-directory @jupyter-widgets/jupyterlab-manager plotlywidget @jupyterlab/plotly-extension jupyterlab-chart-editor

let channels = rec {
  requirements = import ./cadcad-nix/requirements.nix {};
};
in with channels;

let
  jupyter = import (builtins.fetchGit {
    url = https://github.com/tweag/jupyterWith;
    rev = "";
  }) {};

  deps = builtins.attrValues requirements.packages;

  iPython = jupyter.kernels.iPythonWith {
    name = "python";
    packages = p: with p; [
      deps
      pygraphviz
      fn
      funcy
      numpy
      scipy
      pandas 
      scikitlearn
      sympy
      plotly
      matplotlib
      #line_profiler
      #memory_profiler
      psutil
      ipywidgets
      jupyterlab
      networkx
      #pytorchWithCuda
      mpmath
    ];
  };

  #iHaskell = jupyter.kernels.iHaskellWith {
  #  name = "haskell";
  #  packages = p: with p; [ hvega formatting ];
  #};

  jupyterEnvironment =
    jupyter.jupyterlabWith {
      kernels = [ iPython ];
      directory = ./jupyterlab;
    };
in
  jupyterEnvironment.env
