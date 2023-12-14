const { Kafka } = require("kafkajs");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

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
    produce = async function (req, res) {
        const producer = kafka.producer({ maxMessageBytes: 5000000 });
        await producer.connect();

        const ffmpegProcess = spawn("ffmpeg", [
            "-i", path.resolve(req.body.name),
            "-c:a", "copy",
            "-c:v", "copy",
            "-movflags", "frag_keyframe+empty_moov+default_base_moof",
            "-hls_time", "10",
            "-hls_list_size", "0",
            "-hls_segment_filename", `./video/${req.body.name.split('.')[0]}_%d.ts`,
            "-f", "hls",
            `./video/${req.body.name.split('.')[0]}.m3u8`
        ]);

        ffmpegProcess.on("close", async (code) => {
            if (code === 0) {
                await new Promise(resolve => setTimeout(resolve, 2000));

                const masterPlaylistPath = `./video/${req.body.name.split('.')[0]}.m3u8`;
                if (fs.existsSync(masterPlaylistPath)) {
                    const masterPlaylistData = fs.readFileSync(masterPlaylistPath, 'utf-8');

                    const key = { key: req.body.name.split('.')[0] + ".m3u8" + "_playlist" }
                    await producer.send({
                        topic: "test-streaming",
                        messages: [
                            {
                                value: masterPlaylistData,
                                key: JSON.stringify(key)
                            },
                        ],
                    });
                    fs.unlinkSync(masterPlaylistPath);
                }

                for (let index = 0; ; index++) {
                    const fragmentPath = `./video/${req.body.name.split('.')[0]}_${index}.ts`;
                    if (!fs.existsSync(fragmentPath)) {
                        break; 
                    }

                    try {
                        const fragmentData = fs.readFileSync(fragmentPath);
                        const part = this.calculatePartition(parseInt(req.body.id));
                        const key = { key: this.createSegmentKey(req.body.name.split('.')[0], index) };
                        await producer.send({
                            topic: "test-streaming",
                            messages: [
                                {
                                    value: fragmentData,
                                    key: JSON.stringify(key)
                                },
                            ],
                        });
                        fs.unlinkSync(fragmentPath);
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