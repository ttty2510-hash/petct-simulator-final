import { useEffect, useRef } from 'react';

export const useTTS = (text: string, isPlaying: boolean) => {
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // 💡 핵심: 텍스트가 바뀌거나(다른 탭 클릭), 상태가 변하면 즉시 기존 음성을 강제 취소합니다.
    synth.cancel();

    // isPlaying이 true이고 읽을 텍스트가 있을 때만 즉시 새로 읽기 시작합니다.
    if (isPlaying && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR'; // 한국어 설정
      utterance.rate = 1.0;     // 말하기 속도
      utterance.pitch = 1.0;    // 음성 톤
      utteranceRef.current = utterance;
      synth.speak(utterance);
    }

    // 컴포넌트가 언마운트되거나 다음 Effect가 실행되기 직전에 오디오를 정리합니다.
    return () => {
      synth.cancel();
    };
  }, [text, isPlaying]); // 의존성 배열: 이 두 값이 바뀔 때마다 완벽하게 싱크를 맞춤
};
