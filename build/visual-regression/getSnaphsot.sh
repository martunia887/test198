#!/bin/bash

HOST_IP=`ipconfig getifaddr en0`
docker-compose up --build
docker-compose up

# cd ../..
# echo `pwd`
# #docker run --rm --add-host=testing.local.com:$IPADDR -v `pwd`:`pwd` -w `pwd` -i -t visual-regression_dev node node_modules/puppeteer/install.js && bash
# docker run --rm --add-host=testing.local.com:$IPADDR -v `pwd`:`pwd` -w `pwd` -i -t visual-regression_dev bash