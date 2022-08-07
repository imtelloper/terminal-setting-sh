#sudo passwd
#sudo apt update
#sudo apt upgrade
sudo apt install nginx -y

# zsh install
#sudo apt install zsh -y
#chsh -s $(which zsh)

sudo apt install net-tools -y
sudo apt install curl -y
sudo apt install file -f
sudo apt install ssh -y
#sudo apt install git -y

# brew install
sudo apt install build-essential -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"
export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/interx/.zprofile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
source ~/.zshrc
#brew doctor
brew install gcc

# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | zsh
source ~/.zshrc
nvm install 16.14.2
npm install -g pm2
npm install -g yarn

# font 적용
sudo apt install fonts-powerline -y

# python 설치
sudo apt install linuxbrew-wrapper -y
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt install python3.8 -y
sudo apt install python-is-python3 -y
alias python=python3

# nginx https ssl
sudo apt install certbot -y
sudo apt install python3-certbot-nginx -y

# can’t set the locale; make sure $LC_* and $LANG are correct
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# git config 업데이트
git config --global credential.helper store

# oh my zsh 설치
#sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# zsh-autosuggestions
#git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# autojump
#sudo apt install autojump

# zsh-syntax-highlighting
#git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# fzf (Fuzzy Finder )
#git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
#~/.fzf/install

# plugins=(git sudo colored-man-pages zsh-autosuggestions zsh-syntax-highlighting fzf )

# Anaconda install
sudo apt install libgl1-mesa-glx -y
sudo apt install libegl1-mesa -y
sudo apt install libxrandr2 -y
sudo apt install libxrandr2 -y
sudo apt install libxss1 -y
sudo apt install libxcursor1 -y
sudo apt install libxcomposite1 -y
sudo apt install libasound2 -y
sudo apt install libxi6 -y
sudo apt install libxtst6 -y
wget https://repo.anaconda.com/archive/Anaconda3-2020.11-Linux-x86_64.sh
zsh Anaconda3-2020.11-Linux-x86_64.sh
export PATH=$HOME/anaconda3/bin:$PATH
source ~/.zshrc
conda init zsh

# mysql reference(https://velog.io/@seungsang00/Ubuntu-%EC%9A%B0%EB%B6%84%ED%88%AC%EC%97%90-MySQL-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)
sudo apt install mysql-server -y
sudo ufw allow mysql
sudo systemctl start mysql
sudo systemctl enable mysql
#sudo /usr/bin/mysql -u root -p
#sudo mysql_secure_installation
#sudo /etc/init.d/mysql restart

# MongoDB install
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
sudo apt update
sudo apt install mongodb-org -y
sudo systemctl start mongod
