sudo chmod 555 /etc/sudoers && echo 'interx ALL=NOPASSWD: ALL' >> /etc/sudoers
sudo sh /home/interx/terminal-setting-sh/library/hosting-tools-set.sh
sudo sh /home/interx/terminal-setting-sh/library/brew-install.sh
sh /home/interx/terminal-setting-sh/library/nvm-install.sh
sudo sh /home/interx/terminal-setting-sh/library/font-install.sh
sudo sh /home/interx/terminal-setting-sh/library/python-install.sh
sudo sh /home/interx/terminal-setting-sh/library/https-injection.sh
sudo sh /home/interx/terminal-setting-sh/library/language-set.sh
sh /home/interx/terminal-setting-sh/library/anaconda-install.sh
sudo sh /home/interx/terminal-setting-sh/library/mongodb-install.sh
sudo sh /home/interx/terminal-setting-sh/library/appimagelauncher-install.sh
sudo systemctl status mongod
sudo sed -n -i -e '/^PermitRootLogin/c\PermitRootLogin yes' -e '1,$p' /etc/ssh/sshd_config
sudo update-alternatives --install /usr/bin/python python /home/interx/anaconda3/bin/python 1
exit
