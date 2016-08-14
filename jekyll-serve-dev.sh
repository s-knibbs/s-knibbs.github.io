#!/bin/bash

export DISABLE_WHITELIST=true
bundle exec jekyll serve -w -H 0.0.0.0 --config _config.yml,_config_dev.yml
