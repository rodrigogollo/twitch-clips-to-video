#!/bin/bash

#parameters $1=func $2=size $3=date $4=name
#./script.sh game 12 month "gta v"
#npx run-func server/index.js makevideo --func=game --size=12 --date=month --name=gta v


cd /home/rodrigogollo_nh/twitch-clips-to-video/server
wait

#!/usr/bin/env node

#npx run-func ./index.js makeVideo --func=$1 --size=$2 --date=$3 --name=$4
wait 

cd /home/rodrigogollo_nh/twitch-clips-to-video/
wait

npx remotion lambda functions rmall -y
wait

npx remotion lambda functions deploy --timeout=900
wait

lambdaDeploy=$(npx remotion lambda sites create src/index.tsx)
wait

serveURL=$(ps -ef | awk 'NR==8{print $3}' <<< $lambdaDeploy)
wait

lambdaOutput=$(npx remotion lambda render ${serveURL} MyVideo --timeoutInSeconds=900)
wait

echo "lambdaOutput - ${lambdaOutput}"

renderURL=$(ps -ef | awk 'NR==6{print $2}' <<< $lambdaOutput)
wait

echo "terminou - ${renderURL}"

cd /home/rodrigogollo_nh/twitch-clips-to-video/server/youtube
wait

$(npx run-func youtube.js init --title=Twitch Daily Clips Most Viewed Compilation --name=${4} --renderURL=${renderURL})