FROM nixos/nix

RUN nix-channel --add \
  https://nixos.org/channels/nixpkgs-18.09-darwin nixpkgs
RUN nix-channel --update

RUN nix-env -ibA nixpkgs.git
# RUN nix-env -ibA nixpkgs.python
# RUN nix-env -ibA nixpkgs.pythonPackages.pip
RUN nix-env -ibA cachix -f https://cachix.org/api/v1/install

RUN mkdir -p /home/jupyter/workspace
WORKDIR /home/jupyter

COPY . ./

# RUN . ./bin/activate
# RUN pip install -r requirements.txt

EXPOSE 8888
ENTRYPOINT ["/home/jupyter/start.sh"]

