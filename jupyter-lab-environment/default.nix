#generate-directory @jupyter-widgets/jupyterlab-manager plotlywidget @jupyterlab/plotly-extension jupyterlab-chart-editor

let
  jupyter = import (builtins.fetchGit {
    url = https://github.com/tweag/jupyterWith;
    rev = "";
  }) {};

  iPython = jupyter.kernels.iPythonWith {
    name = "python";
    packages = p: with p; [ 
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
