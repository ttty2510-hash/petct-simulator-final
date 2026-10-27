import React, { useState, useEffect } from 'react';
import { tracers } from './data/tracers';
import { useTTS } from './hooks/useTTS';
import './App.css'; 

const App: React.FC = () => {
  const [selectedTracerId, setSelectedTracerId] = useState<string>(tracers[0].id);
  const [activeTab, setActiveTab] = useState<'pathway' | 'prep'>('pathway');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  const currentTracer = tracers.find(t => t.id === selectedTracerId) || tracers[0];

  const currentStage = [...currentTracer.stages].reverse().find(s => progress >= s.progressThreshold) || currentTracer.stages[0];

  useTTS(currentStage.ttsText, isPlaying);

  useEffect(() => {
    let interval: number;
    if (isPlaying && progress < 100) {
      interval = window.setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 100));
      }, 100);
    } else if (progress >= 100) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handleTracerChange = (id: string) => {
    setSelectedTracerId(id);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>방사성의약품 생체분포 시뮬레이터</h1>
        <p>신구대학교 방사선학과 | 의료인재양성 및 환자 안내 시스템</p>
      </header>

      <div className="main-content">
        <aside className="left-panel">
          <h3>방사성의약품 선택</h3>
          <div className="tracer-list">
            {tracers.map(tracer => (
              <button 
                key={tracer.id}
                className={`tracer-btn ${selectedTracerId === tracer.id ? 'active' : ''}`}
                onClick={() => handleTracerChange(tracer.id)}
              >
                <strong>{tracer.name}</strong>
                <span>{tracer.clinicalUse}</span>
              </button>
            ))}
          </div>

          <div className="controls">
            <div className="progress-display">진행률: {Math.round(progress)}%</div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="button-group">
              <button onClick={() => setIsPlaying(!isPlaying)} className="start-btn">
                {isPlaying ? '⏸ 일시정지' : '▶ 시뮬레이션 시작'}
              </button>
              <button onClick={handleReset} className="reset-btn">↺ 초기화</button>
            </div>
          </div>
        </aside>

        <section className="center-panel">
          <div className="tabs">
            <button className={activeTab === 'pathway' ? 'tab active' : 'tab'} onClick={() => setActiveTab('pathway')}>체내 경로 시각화</button>
            <button className={activeTab === 'prep' ? 'tab active' : 'tab'} onClick={() => setActiveTab('prep')}>검사 준비 안내</button>
          </div>

          <div className="tab-content">
            {activeTab === 'pathway' ? (
              <div className="pathway-view">
                <div className="canvas-container">
                  <div className="silhouette-placeholder">
                    <div className="glowing-dot" style={{ 
                      top: progress < 50 ? '50%' : '20%', 
                      opacity: progress > 0 ? 1 : 0,
                      transition: 'all 2s ease-in-out'
                    }}></div>
                  </div>
                </div>
                <div className="stage-card">
                  <h4>현재 단계: {currentStage.title} ({currentStage.id}/5)</h4>
                  <p>{currentStage.description}</p>
                </div>
              </div>
            ) : (
              <div className="prep-view">
                <h3>{currentTracer.name} 검사 전 주의사항</h3>
                <ul>
                  {currentTracer.prepGuides.map((guide, idx) => <li key={idx}>{guide}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>

        <aside className="right-panel">
          <h3>PET/CT 임상 영상</h3>
          <div className="clinical-image-box">
             <img src={currentTracer.imagePath} alt={`${currentTracer.name} 임상 영상`} onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found')} />
          </div>
          
          <div className="info-box">
            <h4>표적 장기</h4>
            <p>{currentTracer.targetOrgans}</p>
            
            <h4>표준화섭취계수(SUV) 범위</h4>
            <ul className="suv-list">
              {currentTracer.suvRanges.map((suv, idx) => (
                <li key={idx}>
                  <strong>{suv.organ}</strong>
                  <span>{suv.range}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
