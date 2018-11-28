#!/bin/bash

docker-compose build
IPADDR=`ipconfig getifaddr en0`
echo $IPADDR
cd ../..
echo `pwd`
docker run --rm --add-host=testing.local.com:$IPADDR -v `pwd`:`pwd` -w `pwd` -i -t visual-regression_dev node node_modules/puppeteer/install.js && bolt run test:vr:record:snapshot
