const axios = require("axios");

exports.handler = async function (event) {
    console.log("request", JSON.stringify(event));
    const appID = process.env.AGORAAPPID;
    const mode = "mix";
    const Authorization = `Basic ${Buffer.from(
        `${process.env.AGORAKEY}:${process.env.AGORASECRET}`
    ).toString("base64")}`;
    console.log("as");

    let body;
    let statusCode = 200;
    const header = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    };


        switch (event.requestContext.resourcePath) {
            case "/acquire":
                if (event.requestContext.httpMethod === "POST") {
                    let acquire;
                    let requestBody = JSON.parse(event.body);

                    acquire = await axios.post(
                        `https://api.agora.io/v1/apps/${appID}/cloud_recording/acquire`,
                        {
                            cname: requestBody.channel,
                            uid: `${requestBody.uid}`,
                            clientRequest: {},
                        },
                        { headers: { Authorization} }
                    );
                    body = acquire.data;
                    break;
                } else {
                    break;
                }
            case "/start":
                if (event.requestContext.httpMethod === "POST") {
                    let requestBody2 = JSON.parse(event.body);
                    const resource = requestBody2.resource;
                        const start = await axios.post(
                            `https://api.agora.io/v1/apps/${appID}/cloud_recording/resourceid/${resource}/mode/mix/start`,
                            {
                                cname: requestBody2.channel,
                                uid: `${requestBody2.uid}`,
                                clientRequest: {
                                    recordingConfig: {
                                        maxIdleTime: 10,
                                        streamTypes: 2,
                                        channelType: 1,
                                        transcodingConfig: {
                                            height: 640, 
                                            width: 360,
                                            bitrate: 500, 
                                            fps: 15, 
                                            mixedVideoLayout: 1,
                                            backgroundColor: "#FF0000"
                                        },
                                        
                                    },
                                    recordingFileConfig: {
                                        avFileType: ["hls", "mp4"],
                                    },
                                    storageConfig: {
                                        vendor: 1,
                                        region: 3,
                                        bucket: process.env.BUCKET,
                                        accessKey: process.env.S3KEY,
                                        secretKey: process.env.S3SECRET,
                                        fileNamePrefix: ["recordings"],
                                    },
                                },
                            },
                            { headers: { Authorization} }
                        );

                        body = start.data;              
                        break;
           
                    } else {
                        break;
                    }
            case "/stop":
                if (event.requestContext.httpMethod === "POST") {
                   
                        const stopBody = JSON.parse(event.body);

                        const resource1 = stopBody.resource;
                        const sid1 = stopBody.sid;
       
                        const stop = await axios.post(
                            `https://api.agora.io/v1/apps/${appID}/cloud_recording/resourceid/${resource1}/sid/${sid1}/mode/mix/stop`,
                            {
                                cname: stopBody.channel,
                                uid: `${stopBody.uid}`,
                                clientRequest: {},
                            },
                            { headers: { Authorization } }
                        );
                        body = stop.data;
                        break;            
                   
                }else {
                    break;
                }
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }

    body = JSON.stringify(body);
    
    return {
        statusCode,
        headers: header,
        body,
    };
}

