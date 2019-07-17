FROM nixos/nix

RUN nix-channel --add \
  https://nixos.org/channels/nixpkgs-18.09-darwin nixpkgs
RUN nix-channel --update

RUN nix-env -iA nixpkgs.git
RUN nix-env -iA nixpkgs.python
RUN nix-env -iA nixpkgs.pythonPackages.pip
RUN nix-env -iA cachix -f https://cachix.org/api/v1/install

RUN mkdir -p /home/jupyter/workspace
WORKDIR /home/jupyter

COPY . ./

#RUN . ./bin/activate
#RUN pip install -r requirements.txt

EXPOSE 8888
ENTRYPOINT ["/home/jupyter/start.sh"]

