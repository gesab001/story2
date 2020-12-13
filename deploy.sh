#!/usr/bin/env sh

sudo git pull
sudo git add .

echo commit message

read varname

sudo git commit -m "$varname"

sudo git push --all

ng deploy --base-href=/story2/

