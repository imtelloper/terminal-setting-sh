sed -n -i -e '/^plugins=(git)/c\plugins=(git sudo colored-man-pages zsh-autosuggestions zsh-syntax-highlighting fzf)' -e '1,$p' ~/.zshrc
sudo sh /home/interx/terminal-setting-sh/library/hosting-tools-set.sh
sudo sh /home/interx/terminal-setting-sh/library/brew-install.sh
sudo sh /home/interx/terminal-setting-sh/library/nvm-install.sh
sudo sh /home/interx/terminal-setting-sh/library/font-install.sh
sudo sh /home/interx/terminal-setting-sh/library/python-install.sh
sudo sh /home/interx/terminal-setting-sh/library/https-injection.sh
sudo sh /home/interx/terminal-setting-sh/library/language-set.sh
sudo sh /home/interx/terminal-setting-sh/library/anaconda-install.sh
sudo sh /home/interx/terminal-setting-sh/library/mongodb-install.sh
sudo systemctl status mongod
