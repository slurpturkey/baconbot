#!/bin/sh

#Update dependencies
sudo npm install

#Change permissions of directory and files
sudo chmod -R 777 *

#Reload configuration
sudo systemctl daemon-reload

#Restart baconbot
#sudo systemctl restart baconbot.service
#sudo systemctl restart baconbot 
sudo cp baconbot.service /etc/systemd/system/baconbot.service
sudo systemctl enable application.service
systemctl list-units --type=service
systemctl list-unit-files
#test
