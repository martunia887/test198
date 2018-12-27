#!/bin/bash

docker-compose build
IPADDR=`ipconfig getifaddr en0`
echo $IPADDR
cd ../..
echo `pwd`
#docker run --rm --add-host=testing.local.com:$IPADDR -v `pwd`:`pwd` -w `pwd` -i -t visual-regression_dev node node_modules/puppeteer/install.js && bash
docker run --rm --add-host=testing.local.com:$IPADDR -v `pwd`:`pwd` -w `pwd` -i -t visual-regression_dev bash