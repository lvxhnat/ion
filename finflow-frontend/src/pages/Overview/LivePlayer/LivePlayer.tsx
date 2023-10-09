import React from "react";
import ReactHlsPlayer from "react-hls-player";

export default function LivePlayer() {
  const playerRef: any = React.useRef();

  React.useEffect(() => {
    playerRef.current.muted = true;
    playerRef.current.autoPlay = true;
    playerRef.current.play();
  }, [playerRef.current]);

  return (
    <ReactHlsPlayer
      autoPlay={true}
      playerRef={playerRef}
      controls={true}
      src="https://liveprodusphoenixeast.global.ssl.fastly.net/USPhx-HD/Channel-TX-USPhx-AWS-virginia-1/Source-USPhx-16k-1-s6lk2-BP-07-02-81ykIWnsMsg_live.m3u8"
      width="100%"
      height="auto"
    />
  );
}
