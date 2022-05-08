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

sudo systemctl stop baconbot.service
sudo systemctl start baconbot.service
sudo systemctl status baconbot.service
systemctl list-units --type=service
systemctl list-unit-files
journalctl --unit=baconbot.service -n 100 --no-pager
ls -a
#test
