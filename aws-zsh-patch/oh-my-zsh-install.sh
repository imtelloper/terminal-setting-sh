# oh my zsh 설치

#DEBIAN_FRONTEND=noninteractive 와 같이 추가를 해주면 패키지 설치시에도 상호작용 방지기능
echo "DEBIAN_FRONTEND=noninteractive" | sudo tee -a ~/.zshrc

source ~/.zshrc

#sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
sh -c "$(curl -fsSL https://raw.githubusercontent.com/agnoster/oh-my-zsh/master/tools/install.sh)"
#exit
