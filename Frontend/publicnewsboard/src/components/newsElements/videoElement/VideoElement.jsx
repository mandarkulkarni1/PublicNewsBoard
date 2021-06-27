import React, { useEffect, useState } from "react";
import Video from "./Video";
import { GetVideos } from "./videoServiceReader";

const Videobar = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    async function getData() {
      const videos = await GetVideos();
      setVideo(videos.data);
    }
    getData();
  }, []);
  return (
    <React.Fragment>
      <div className="container-lg p-2">
        <div className="card shadow">
          <div className="card-header bg-secondry text-dark">News Stories</div>
          <div className="card-body overflow-auto d-flex ">
            {video.map((video) => (
              <Video key={video.videoId} video={video}></Video>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Videobar;
