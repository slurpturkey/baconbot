#!/bin/sh

#Update dependencies
sudo npm install

#Change permissions of directory and files
sudo chmod -R 777 *



#Restart baconbot
#sudo systemctl restart baconbot.service
# 
sudo cp baconbot.service /etc/systemd/system/baconbot.service
sudo systemctl enable baconbot.service

#Reload configuration
sudo systemctl daemon-reload

sudo systemctl restart baconbot.service
systemctl list-units --type=service
systemctl list-unit-files
#test
