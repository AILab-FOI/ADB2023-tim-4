#!/bin/bash

URL="https://downloads.apache.org/kafka/3.6.1/kafka_2.12-3.6.1.tgz"

TARGET_DIR="./Projekt"

wget "$URL" -P "$TARGET_DIR"

tar -xzvf "$TARGET_DIR/kafka_2.12-3.6.1.tgz" -C "$TARGET_DIR"

SERVER_PROPERTIES_FILE="./Projekt/kafka_2.12-3.6.1/config/server.properties"

echo "message.max.bytes=10485760" >> "$SERVER_PROPERTIES_FILE"
echo "max.request.size=10485760" >> "$SERVER_PROPERTIES_FILE"

gnome-terminal --tab --title="Zookeeper" -- bash -c "./Projekt/kafka_2.12-3.6.1/bin/zookeeper-server-start.sh ./Projekt/kafka_2.12-3.6.1/config/zookeeper.properties; exec bash"

sleep 15

gnome-terminal --tab --title="Kafka" -- bash -c "./Projekt/kafka_2.12-3.6.1/bin/kafka-server-start.sh ./Projekt/kafka_2.12-3.6.1/config/server.properties; exec bash"

URL2="https://github.com/AILab-FOI/ADB2023-tim-4"

sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt install default-jdk
sudo apt install python3-pip
sudo pip3 install --upgrade yt-dlp    #ovo je potrebno za mint jer snap naredba ne postoji na ubuntu
sudo snap install yt-dlp  # ovo je radilo na ubuntu
sudo apt install yt-dlp
sudo apt-get install ffmpeg
sudo apt-get install git
sudo pip install gdown

git clone "$URL2" "$TARGET_DIR/ADB2023-tim-4"

BACKEND_PATH="./Projekt/ADB2023-tim-4/backend/"

FRONTEND_PATH="./Projekt/ADB2023-tim-4/frontend/"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR/$BACKEND_PATH" && npm install

cd "$SCRIPT_DIR/$FRONTEND_PATH" && npm install

VIDEO_PATH="$HOME/Desktop/Projekt/ADB2023-tim-4/backend/library/"

mkdir -p "$VIDEO_PATH/videos"

#skidanje videa

gdown --id 1Ae4W9lRWTZSh-tm1gwQisw0sD5ljT6RX -O "$VIDEO_PATH/videos/big.mp4"

gdown --id 10ZpEDSru3D9nZmplE72kezdLAaoiLEcV -O "$VIDEO_PATH/videos/četvrti.mp4"

gdown --id 16G3lesfoeztTJblfd28R45nMAA4XXSkd -O "$VIDEO_PATH/videos/peti.mp4"

gdown --id 1ULxjISYxFa18vZcgffyldmW0AjtTd4zc -O "$VIDEO_PATH/videos/šesti.mp4"

gdown --id 1R5ycL-WcPzdyRBidtt-ddYIZiodtDuPC -O "$VIDEO_PATH/videos/veliki_video.mp4"

gdown --id 1ct36edxeot0ZyYqmXYTY0qxMYQ5_uBsy -O "$VIDEO_PATH/videos/zec.mp4"

gnome-terminal --tab --title="Server" -- bash -c "cd $SCRIPT_DIR/$BACKEND_PATH && node server.js; exec bash"

sleep 20

gnome-terminal --tab --title="Frontend" -- bash -c "cd $SCRIPT_DIR/$FRONTEND_PATH && npm start; exec bash"