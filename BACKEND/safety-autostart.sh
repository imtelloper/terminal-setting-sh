#!/bin/zsh

### sudo pw 없이 입력 가능하도록 해야함
# sudo gedit /etc/sudoers
# 간편하게 전체 권한 추가
# 사용자명 ALL=NOPASSWD: ALL
# 지정한 명령어만 사용가능
# testuser1 ALL=NOPASSWD: /usr/sbin/useradd, /usr/sbin/userdel


### crontab에서 등록하기
# 1. 스크립트 생성
#   vi safety-autostart.sh
# 2. 스크립트 권한 설정
#   chmod +x safety-autostart.sh
# 3. crontab에 등록
#   crontab -e
#  맨 아래에 입력
#   @reboot /home/interx/SAFETY-AI/BACKEND/safety-autostart.sh > safety-autostart.sh.log 2>&1

# 8000포트를 안쓰고 있거나 죽었다면 다시 재실행 시키도록. 8000 포트를 계속 확인하는 python 필요
fuser -k 8000/tcp
python /home/interx/SAFETY-AI/BACKEND/port-watcher.py

exit 0