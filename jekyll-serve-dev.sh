#!/bin/bash

export DISABLE_WHITELIST=true
VERBOSE=""
while getopts "bv" opt; do
    case $opt in
        b)
            export BUILD_LANGUAGE_TOTALS=1
            ;;
        v)
            VERBOSE="--verbose"
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            ;;
    esac
done

bundle exec jekyll serve -w -H 0.0.0.0 --config _config.yml,_config_dev.yml --incremental $VERBOSE
