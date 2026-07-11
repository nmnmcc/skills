{ pkgs, ... }:

{
  stdenv = pkgs.stdenvNoCC;

  env.UV_DEFAULT_INDEX = "https://pypi.org/simple";

  packages = [ pkgs.actionlint ];

  languages.python = {
    enable = true;
    package = pkgs.python313;
    lsp.enable = false;
    venv.enable = true;
    uv = {
      enable = true;
      sync.enable = true;
    };
  };

  scripts.validate.exec = ''
    set -euo pipefail

    for skill in skills/*; do
      if [[ -f "$skill/SKILL.md" ]]; then
        skills-ref validate "$skill"
      fi
    done

    actionlint
  '';

  enterTest = ''
    validate
  '';
}
