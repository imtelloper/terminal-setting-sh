# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# autojump
sudo apt install autojump -y

# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# fzf (Fuzzy Finder )
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install

# plugins=(git sudo colored-man-pages zsh-autosuggestions zsh-syntax-highlighting fzf)
sed -n -i -e '/^plugins=(git)/c\plugins=(git sudo colored-man-pages zsh-autosuggestions zsh-syntax-highlighting fzf)' -e '1,$p' ~/.zshrc
source ~/.zshrc
#exit
