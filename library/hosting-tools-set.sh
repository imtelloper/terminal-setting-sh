sudo apt install nginx -y
sudo apt install net-tools -y
sudo apt install curl -y
sudo apt install file -f
sudo apt install ssh -y
sudo sed -n -i -e '/^PermitRootLogin/c\PermitRootLogin yes' -e '1,$p' /etc/ssh/sshd_config
