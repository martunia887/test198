#!/usr/bin/env bash

curl -L --fail https://github.com/docker/compose/releases/download/1.23.2/run.sh -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose