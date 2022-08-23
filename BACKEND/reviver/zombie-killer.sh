echo '### zombies ###'
ps -ef | grep defunct | grep -v grep
echo '------------------------------'
echo '### kill zombies ###'
ps -ef | grep defunct | awk '{print $3}' | xargs kill -9