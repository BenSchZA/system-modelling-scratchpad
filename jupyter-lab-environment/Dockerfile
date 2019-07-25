FROM nixos/nix

RUN nix-channel --add https://nixos.org/channels/nixpkgs-18.09-darwin nixpkgs
RUN nix-channel --update

RUN nix-env -ibA nixpkgs.git
RUN nix-env -ibA cachix -f https://cachix.org/api/v1/install

RUN mkdir -p /home/jupyter/workspace
RUN mkdir -p /home/jupyter/jupyterlab
WORKDIR /home/jupyter

COPY . ./

ARG CADCAD_KEY
RUN ./install-venv.sh

RUN cachix use jupyterwith
RUN cachix use linum-jupyter-lab

EXPOSE 8888
ENTRYPOINT ["/home/jupyter/start.sh"]
