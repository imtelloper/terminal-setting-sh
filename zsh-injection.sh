sudo passwd
sudo apt update
sudo apt upgrade -y
sudo apt install zsh -y
sudo apt install git -y
# git config 업데이트
git config --global credential.helper store

# oh my zsh 설치
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

