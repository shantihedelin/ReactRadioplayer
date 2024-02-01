import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Station() {
  const [channels, setChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.sr.se/api/v2/channels?format=json")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setChannels(data.channels);
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  const filteredChannels = channels.filter((channel) => {
    const channelName = channel.name.toLowerCase();
    const searchTermToLowerCase =
      typeof searchTerm === "string" ? searchTerm.toLowerCase() : "";
    return channelName.includes(searchTermToLowerCase);
  });

  return (
    <div>
      <div>
        <h1>Radioplayers with React</h1>
        <div className="search-field">
          <p>Search radiochannel:</p>
          &nbsp; &nbsp;
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter radiochannel"
          ></input>
        </div>
        <div className="hej">
          {isLoading ? (
            <Skeleton count={10} height={250} />
          ) : (
            Array.isArray(filteredChannels) &&
            filteredChannels.map((channel) => (
              <div
                className="radio-container"
                key={channel.id}
                style={{ backgroundColor: "#" + channel.color }}
              >
                <img src={channel.image} alt={channel.name} />
                <div className="player-container">
                  <h1>{channel.name}</h1>
                  <audio controls>
                    <source
                      src={channel.liveaudio.url}
                      type="audio/mpeg"
                    ></source>
                  </audio>
                </div>
                <div
                  style={{
                    backgroundColor: channel.color,
                  }}
                ></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Station;
