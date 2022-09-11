#!/bin/bash
source /home/ec2-user/.bash_profile

APP_NAME="woowahan-side-project"
MODULE_NAME="server"

PID_PATH_NAME=/woowahan-side-project/woowahan-side-project-pid

echo "Stopping $APP_NAME-$MODULE_NAME ..."

if [[ -f $PID_PATH_NAME ]]; then
    sudo rm $PID_PATH_NAME

    cd /home/ec2-user/woowahan-side-project/packages/server
    if pgrep node; then npm run stop; fi

    sleep 3
else
    echo "$APP_NAME-$MODULE_NAME is not running ..."
fi