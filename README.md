# ADB2023-tim-4

Aplikacija za strujanje multimedije (Kafka + grafičko sučelje po želji)

## Launching the application - simpler way
1. First, position yourself on the Desktop directory.
2. Just download the inst.sh script and place it on your Desktop.
3. Give it access rights: chmod +x ./inst.sh
4. Run the script: ./inst.sh

[NOTE] - Follow the execution of the script, because it is important to enter the password of the user on your operating system, as well as to confirm some steps with yes.

[NOTE] - The script will install all the necessary things to run the application. The script was tested on an empty Mint with nothing and the test was successful.

## Launching the application
1. First of all, it is necessary install Kafka and ffmpeg.
2. Create in the terminal inside the backend folder: npm install
3. Create in the terminal inside the frontend folder: npm install
4. After that start ZooKeeper - bin/zookeeper-server-start.sh config/zookeeper.properties
5. Start Kafka - bin/kafka-server-start.sh config/server.properties
6. Start the application server - node server.js
7. Start the frontend - npm start

After completing the steps, the application should be launched.

Below is an image showing the front page of the Kafka application.

![Screenshot_5](https://github.com/AILab-FOI/ADB2023-tim-4/assets/100703395/1220e144-900e-4008-9ca7-8238d0419e4d)
