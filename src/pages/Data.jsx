import React, { useState, useEffect } from "react";
import "./Data.css";

export default function RogiArmDashboard() {
  const [list, setList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [boxCounts, setBoxCounts] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/list")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  const handleClick = async (file) => {
    setSelectedFile(file);

    try {
      const res = await fetch(`http://localhost:5000/data/${file}.json`);
      const json = await res.json();
      setBoxCounts(json);
    } catch (err) {
      setBoxCounts({});
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <h4>📅 날짜</h4>
          {list.map((item) => (
            <div
              key={item.file}
              className="date-entry"
              onClick={() => handleClick(item.file)}
            >
              {item.time}
            </div>
          ))}
        </aside>

        <main className="dashboard-main">
          <section className="panel large">
            <h4>🎥 우노 동영상</h4>
            {selectedFile ? (
              <video
                src={`http://localhost:포트번트/videos/${selectedFile}.mp4`}
                controls
                width="100%"
              />
            ) : (
              <div className="video">날짜를 선택하세요.</div>
            )}
          </section>

          <div className="dashboard-subpanels">
            <section className="panel small">
              <h4>📦 색깔별 상자 개수</h4>
              <ul>
                {Object.entries(boxCounts).map(([color, count]) => (
                  <li key={color}>
                    {color}: {count}개
                  </li>
                ))}
              </ul>
            </section>

            <section className="panel small">
              <h4>🎥 우노 카메라</h4>
              {/* 추후 스트리밍 추가 */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
