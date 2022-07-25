sudo apt update
sudo apt install nginx zsh
chsh -s /usr/bin/zsh
sudo apt install net-tools build-essential curl file ssh -f
sudo apt install fonts-powerline
sudo apt install git -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
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

#oh my zsh 설치
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone git://github.com/wting/autojump.git
# Run the installation script and follow on screen instructions.
cd autojump
./install.py
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# plugins=(git zsh-autosuggestions zsh-syntax-highlighting )

# font 적용
git clone [https://github.com/powerline/fonts.git](https://github.com/powerline/fonts.git) --depth=1
cd fonts
./install.sh
cd ..
rm -rf fonts
sudo apt-get install linuxbrew-wrapper
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt install python3.8 -y
sudo apt install python-is-python3
alias python=python3
conda config --set auto_activate_base false

# nginx https ssl
sudo apt install certbot python3-certbot-nginx

# can’t set the locale; make sure $LC_* and $LANG are correct
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
git config --global credential.helper store

