#!/bin/bash
source /home/ec2-user/.bash_profile

APP_NAME="woowahan-side-project"
MODULE_NAME="server"

PID_PATH_NAME=/woowahan-side-project/woowahan-side-project-pid

echo "Starting $APP_NAME-$MODULE_NAME ..."

if [ ! -f $PID_PATH_NAME ]; then
    cd /home/ec2-user/woowahan-side-project/packages/server
    su ec2-user -c "nohup npm run start:prod >> /woowahan-side-project/app_stdout.log 2>&1 & echo \$! > $PID_PATH_NAME"

    echo "$APP_NAME-$MODULE_NAME started ..."
else
    echo "$APP_NAME-$MODULE_NAME is already running ..."
fi