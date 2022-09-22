import { Client, isSupported } from '@livepeer/webrtmp-sdk'
import React, { useState } from 'react'


export default function Livepeer() {

    // const [streamshare, setStreamshare] = useState()
    // const [video, setvideo] = useState()


    // const streaminputEvent = (e) => {
    //     setStreamshare(e.target.value);
    // }
    // console.log(streamshare, 'streamshare===');
 

    if (!isSupported()) {
        alert('webrtmp-sdk is not currently supported on this browser')
    }


    async function start() {
         
        const client = new Client()
        const streamKey = '534b-03fx-ak1m-39zq'

        const stream = await navigator.mediaDevices.getUserMedia({
            
            video: true,
            audio: true

        })

        const session = client.cast(stream, streamKey)

        session.on('open', () => {
             console.log('Stream started.')
        })

        session.on('close', () => {
            console.log('Stream stopped.')
        })

        session.on('error', (err) => {
            console.log('Stream error.', err.message)
        })
    }

    // start();
    return (
        <>
            <div className='container footer-top'>
                <div id="roott">
                    {/* <input id="input" placeholder="Enter streamKey"></input> */}
                    <video id="video"></video>
                    <button id="button" onClick={start()} >Start</button>
                </div>
                {/* <script src="index.js"></script> */}
            </div>
 
        </>
    )
}
