#!/bin/bash

cd build/visual-regression
export HOST_IP=`ipconfig getifaddr en0`
docker-compose up --build
docker-compose up