echo 'hi'
sudo apt install update
sudo apt install net-tools
sudo apt install nginx
sudo apt-get install build-essential
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




