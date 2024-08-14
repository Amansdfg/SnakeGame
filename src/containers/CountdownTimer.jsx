import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import HighAudio from "../assets/high.mp3";
import LowAudio from "../assets/low.mp3";

const TimerContainer = styled.div`
  font-size: 3rem;
  animation: scale 1s infinite;
  grid-column: 11;
  grid-row: 11;

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CountdownTimer = () => {
  const [timer, setTimer] = useState(3);

  const oddAudioPlay = async () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioElement = new Audio(HighAudio); // Path to your sound file
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    await audioElement.play();
  };

  const evenAudioPlay = async () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioElement = new Audio(LowAudio); // Path to your sound file
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    await audioElement.play();
  };

  useEffect(() => {
    evenAudioPlay();
    const interval = setInterval(() => {
      if (timer >= 1) {
        setTimer(timer - 1);
        if (timer === 0) {
          evenAudioPlay();
        } else if (timer % 2 === 0) {
          evenAudioPlay();
        } else {
          oddAudioPlay();
        }
      } else {
        clearInterval(interval);
      }
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return <TimerContainer>{timer > 0 ? timer : "Go!"}</TimerContainer>;
};

export default CountdownTimer; 