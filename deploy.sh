#!/bin/sh

#Update dependencies
cd /usr/local/bin/baconbot
sudo npm install

# Copy service file, incase if there are any changes
sudo cp baconbot.service /etc/systemd/system/baconbot.service

#Change permissions of directory and files
sudo chmod -R 777 /usr/local/bin/baconbot

# reload configurations incase if service file has changed
sudo systemctl daemon-reload
