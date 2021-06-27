import React from "react";

const Video = ({ video }) => {
  return (
    <React.Fragment>
      <video
        style={{ borderRadius: "50%", height: "200px", width: "200px",border:"2px solid #5bc0de" }}
        className="fakeimg m-1"
        controls
        src={`http://localhost:8080/reporters/${video.video}`}
        autoPlay
      ></video>
    </React.Fragment>
  );
};

export default Video;
