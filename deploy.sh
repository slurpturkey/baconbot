#!/bin/sh

#Update dependencies
sudo npm install

#Change permissions of directory and files
sudo chmod -R 777 *

#Reload configuration
sudo systemctl daemon-reload

#Restart baconbot
#sudo systemctl restart baconbot.service
sudo service baconbot.service restart
