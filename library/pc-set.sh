### mongod.conf 설정
sudo cp -rfp /home/ubuntu/terminal-setting-sh/setting-files/mongod-setting.txt /etc/mongod.conf

### BASE PYTHON SETTING
sudo update-alternatives --install /usr/bin/python python /home/interx/anaconda3/bin/python 1

### python all packages install command
pip install --upgrade pip
sudo apt update && sudo apt install libpython3.8

