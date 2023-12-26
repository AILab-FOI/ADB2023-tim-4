const { Kafka } = require("kafkajs");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const basePath = path.resolve() + "/library/videos/"
const kafka = new Kafka({
    clientId: "test-streaming",
    brokers: ["localhost:9092"],
    requestTimeout: 250000,
    connectionTimeout: 30000,
});

class Producer {

    createSegmentKey(videoName, index) {
        return `${videoName}_${index}.ts`; //naming convention for video segments
    }
    produce = async function (name) {
        const producer = kafka.producer({ maxMessageBytes: 5000000 });
        await producer.connect();
        const filePath = basePath + name
        const ffmpegProcess = spawn("ffmpeg", [
            "-i",filePath,
            "-c:a", "copy",
            "-c:v", "copy",
            "-movflags", "frag_keyframe+empty_moov+default_base_moof",
            "-hls_time", "10",
            "-hls_list_size", "0",
            "-hls_segment_filename", `./video/${name.split('.')[0]}_%d.ts`,
            "-f", "hls",
            `./video/${name.split('.')[0]}.m3u8`
        ]);
        
        ffmpegProcess.stderr.on("data", (data) => {
            console.error(`ffmpeg process stderr: ${data}`);
        });

        ffmpegProcess.on("close", async (code) => {
            if (code === 0) {

                const masterPlaylistPath = `./video/${name.split('.')[0]}.m3u8`;
                    const masterPlaylistData = fs.readFileSync(masterPlaylistPath, 'utf-8');

                    const key = { key: name.split('.')[0] + ".m3u8" + "_playlist" }
                    await producer.send({
                        topic: "test-streaming",
                        messages: [
                            {
                                value: masterPlaylistData,
                                key: JSON.stringify(key)
                            },
                        ],
                    });
                    //fs.unlink(masterPlaylistPath,(err)=>{console.log(err)})
                    await fs.promises.unlink(masterPlaylistPath);                

                for (let index = 0; ; index++) {
                    const fragmentPath = `./video/${name.split('.')[0]}_${index}.ts`;
                    if (!fs.existsSync(fragmentPath)) {
                        console.log("fragment break triggered. path problem path: "+ fragmentPath)
                        break; 
                    }

                    try {
                        const fragmentData = fs.readFileSync(fragmentPath);
                        const key = { key: this.createSegmentKey(name.split('.')[0], index) };
                        await producer.send({
                            topic: "test-streaming",
                            messages: [
                                {
                                    value: fragmentData,
                                    key: JSON.stringify(key)
                                },
                            ],
                        });
                        //fs.unlink(fragmentPath,(err)=>{if(err!= null){console.log(fragmentPath +  " " + err)}})
                        await fs.promises.unlink(fragmentPath);
                    } catch (err) {
                        console.log(err);
                        break; 
                    }
                }

            } else {
                console.error(`ffmpeg process exited with code ${code}`);
            }

            await producer.disconnect();
        });
    };

}

module.exports = Producer;