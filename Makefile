.PHONY: vscode nix-update

export NIX_CONFIG=experimental-features = nix-command flakes

vscode:
	nix develop -c code .

nix-update:
	nix flake update
