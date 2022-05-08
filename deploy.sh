#!/bin/sh

#Update dependencies
sudo npm install

#Change permissions of directory and files
sudo chmod -R 777 *

readlink -f index.js

# Copy service file, incase if there are any changes
sudo cp baconbot.service /etc/systemd/system/baconbot.service

sudo chmod -R 777 *

# reload configurations incase if service file has changed
sudo systemctl daemon-reload
