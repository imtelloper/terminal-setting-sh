# terminal-setting-sh

## step1
zsh-patch -> zsh-injection.sh

## step2
sudo reboot

## step3
zsh-patch -> oh-my-zsh-install.sh

## step4
zsh-patch -> zsh-makeup.sh

## step5
aws-terminal-makeup.sh

<br>

비밀번호 설정 필요할 시 <br>
sudo passwd <br>

<br>

#chsh:PAM authentication failed 오류 발생시 해결방법 <br>
sudo vim /etc/pam.d/chsh <br>
auth required pam_shells.so 주석처리 <br>
sudo chsh $USER -s $(which zsh) <br>
로그 아웃, 로그인 <br>

<br>

# WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! 에러<br>

aws ec2로 접속하려는데 WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! 에러가 난다 <br>
```
ssh-keygen -R ec2-.compute.amazonaws.com <br>

ssh-keygen -R 13.209.243.74 <br>
```



# 우분투 mysql 설치
```
https://hiseon.me/linux/ubuntu/ubuntu-mysql-install/
```
