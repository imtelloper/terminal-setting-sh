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
