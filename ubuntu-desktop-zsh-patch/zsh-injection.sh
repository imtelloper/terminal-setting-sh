sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock*
# 이후 패키지 업데이트
sudo dpkg --configure -a
sudo apt update
sudo apt upgrade -y
sudo apt install zsh -y
sudo apt install git -y
# git config 업데이트
git config --global credential.helper store
sudo chsh -s $(which zsh) $(whoami)
