import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music } from 'lucide-react';
import './App.css';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [showFinalScene, setShowFinalScene] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleHeartClick = () => {
    setIsEnvelopeOpen(true);
    
    // Start background music
    if (audioRef.current) {
      audioRef.current.play().catch(console.log);
      setMusicPlaying(true);
    }
    
    setTimeout(() => {
      setShowLetter(true);
    }, 800);
  };

  const handleYesClick = () => {
    setShowFinalScene(true);
    // Create particles for heart formation
    const newParticles = Array.from({length: 60}, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  };

  const handleNoClick = () => {
    setShowNoMessage(true);
    setTimeout(() => {
      setShowNoMessage(false);
    }, 3000);
  };

  if (showFinalScene) {
    return (
      <div className="final-scene">
        <audio ref={audioRef} loop>
          <source src="https://www.soundjay.com/misc/sounds/romantic-piano.mp3" type="audio/mpeg" />
        </audio>
        
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
        
        <div className="heart-container">
          <div className="particle-heart" />
          <div className="final-text">I love you</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <audio ref={audioRef} loop>
        <source src="https://www.soundjay.com/misc/sounds/romantic-piano.mp3" type="audio/mpeg" />
      </audio>
      
      {musicPlaying && (
        <div className="music-indicator">
          <Music className="music-icon" />
          <span>Playing romantic music</span>
        </div>
      )}

      <div className="envelope-container">
        <div className={`envelope ${isEnvelopeOpen ? 'open' : ''}`}>
          <div className="envelope-flap">
            <div 
              className="heart-seal"
              onClick={handleHeartClick}
            >
              <Heart className="heart-icon" fill="currentColor" />
            </div>
          </div>
          <div className="envelope-body">
            <div className="envelope-text">
              Asel, please tap the heart 💗
            </div>
          </div>
        </div>

        {showLetter && (
          <div className="love-letter">
            <div className="letter-content">
              <p>My Dearest Asel,</p>
              <p>Every moment with you feels like a beautiful dream that I never want to wake up from.</p>
              <p>Your smile lights up my world and your laughter is the sweetest melody I've ever heard.</p>
              <p>You make every ordinary day feel extraordinary, and I can't imagine my life without you in it.</p>
              <p>I've been carrying these feelings in my heart, and now I want to share them with you.</p>
              <p className="final-question">Will you be my girlfriend?</p>
              
              {showNoMessage && (
                <div className="no-message">
                  This action was triggered by clicking No.
                </div>
              )}
              
              <div className="buttons">
                <button 
                  className="choice-button yes-button"
                  onClick={handleYesClick}
                >
                  Yes
                </button>
                <button 
                  className="choice-button no-button"
                  onClick={handleNoClick}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;