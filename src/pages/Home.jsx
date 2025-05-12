import React, { useState, useEffect } from 'react';
import './Home.css';

const images = [
  { src: "/assets/image/2.PNG", alt: '팀 1' }
];

const targetImages = [
  {
    src: process.env.PUBLIC_URL + '/assets/image/4.png',
    alt: '자동 분류 시스템',
    description: '필요한 물건을 분리한다',
  },
  {
    src: process.env.PUBLIC_URL + '/assets/image/5.png',
    alt: '안전 운송 로봇',
    description: '정해진 포인트까지 장애물을 피하며 안전하게 이동한다',
  }
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePrev = () => {
    setTargetIndex((prevIndex) => (prevIndex - 1 + targetImages.length) % targetImages.length);
  };

  const handleNext = () => {
    setTargetIndex((prevIndex) => (prevIndex + 1) % targetImages.length);
  };

  return (
    <section className="team-section">
      {/* 예상 사진 */}
      <div className="team-gallery">
        <div className="team-img">
          <a href="/">
            <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} />
          </a>
        </div>
      </div>

      {/* 만들게 된 계기 */}
      <div className="team-description">
        <div className="meter">
          현 시즘 많은 물류 작업 상황에서 투입되는 인원은 많고 크고 작은 많은 양의 사고들이 발생한다<br/>
          "로봇"이라는 기술을 개발하여 인원의 부족함과 사고 예방을 할 수 있다<br/>
        </div>
      </div>

      {/* 주요 기능 - 슬라이드 */}
      <div className="target">
        <button onClick={handlePrev} className="arrow left">←</button>
        <div className="target-content">
          <img src={targetImages[targetIndex].src} alt={targetImages[targetIndex].alt} className="Target" />
          <p className="target-description">{targetImages[targetIndex].description}</p>
        </div>
        <button onClick={handleNext} className="arrow right">→</button>
      </div>
      {/* 기대효과 */}

      {/* 활용분야 */}

    </section>
  );
}

export default Home;
