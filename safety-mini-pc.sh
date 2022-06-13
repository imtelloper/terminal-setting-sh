echo 'hi'
sudo apt install update
sudo apt install net-tools
sudo apt install nginx
sudo apt install install build-essential
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"
export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"
source ~/.zshrc
# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | zsh
source ~/.zshrc
nvm install 16.14.2
npm install -g pm2
npm install -g yarn




