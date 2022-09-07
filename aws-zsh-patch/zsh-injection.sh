sudo passwd
sudo apt update
sudo apt upgrade -y
sudo apt install zsh -y
sudo apt install git -y
# git config 업데이트
git config --global credential.helper store
sudo chsh -s $(which zsh) $(whoami)
sudo reboot
