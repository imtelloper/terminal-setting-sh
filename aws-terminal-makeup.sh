sudo passwd
sudo apt update
sudo apt install nginx -y
sudo apt install zsh -y
chsh -s $(which zsh)
sudo apt install net-tools -y
sudo apt install curl -y
sudo apt install file ssh -f
sudo apt install fonts-powerline
sudo apt install git -y
sudo apt install build-essential
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"
export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/interx/.zprofile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
source ~/.zshrc
brew doctor
brew install gcc

# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | zsh
source ~/.zshrc
nvm install 16.14.2
npm install -g pm2
npm install -g yarn

# font 적용
sudo apt install fonts-powerline

# python 설치
sudo apt-get install linuxbrew-wrapper
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt install python3.8 -y
sudo apt install python-is-python3
alias python=python3

# mysql
#sudo apt install -y mysql-server
#sudo mysql_secure_installation
#sudo /etc/init.d/mysql restart

# nginx https ssl
sudo apt install certbot python3-certbot-nginx

# can’t set the locale; make sure $LC_* and $LANG are correct
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# git config 업데이트
git config --global credential.helper store

# oh my zsh 설치
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# autojump
sudo apt install autojump

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting


# fzf (Fuzzy Finder )
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install

# plugins=(git sudo colored-man-pages zsh-autosuggestions zsh-syntax-highlighting fzf )
