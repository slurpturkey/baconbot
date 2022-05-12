#!/bin/sh

# Copy service file, incase if there are any changes
sudo cp baconbot.service /etc/systemd/system/baconbot.service

# reload configurations incase if service file has changed
sudo systemctl daemon-reload
