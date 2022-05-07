#!/bin/sh

#Update dependencies
sudo npm update

#Change permissions of directory and files
sudo chmod -R 777 /usr/local/bin/baconbot

#Reload configuration
sudo systemctl daemon-reload

#Restart baconbot
sudo systemctl restart baconbot
