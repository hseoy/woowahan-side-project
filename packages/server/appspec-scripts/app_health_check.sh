#!/usr/bin/env bash

source /home/ec2-user/.bash_profile

HEALTH_CHECK_PATH=/health

if [ -z "$HEALTH_CHECK_PATH" ]; then
    echo "Empty healthCheckPath.. Skip Validation"
    echo "Skip"
    exit 0;
fi

for i in `seq 1 10` ;
do
  HTTP_RESPONSE_CODE=`curl --write-out '%{http_code}' -o /dev/null -m 10 -q -s http://localhost:3001${HEALTH_CHECK_PATH}`
  if [ "$HTTP_RESPONSE_CODE" == "200" ]; then
    echo "Healthy"
    exit 0;
  fi
  echo "Endpoint returned HTTP Code $HTTP_RESPONSE_CODE. retrying."
  sleep 10
done

echo "Unhealthy"
cat /woowahan-side-project/app_stdout.log

exit 1
