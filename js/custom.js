function createCounter(start = 1) {
  let count = start;
  return function get() {
    return count++;
  };
}

const statusEl = document.getElementById('status');
const recordingsEl = document.getElementById('recordings');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const stopBtn = document.getElementById('stopBtn');

let recordingCounter = createCounter();

const manager = new ScreenRecordingManager({
  onSuccess: (blob) => {
    statusEl.textContent = 'Recording finished ✅';
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    stopBtn.style.display = 'none';

    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    const link = document.createElement('a');
    link.href = url;
    link.download = `recording-${Date.now()}.webm`;
    link.textContent = `Download Recording ${recordingCounter()}`;
    link.className = 'download-link';
    recordingsEl.appendChild(link);
  },
  onError: (err) => {
    statusEl.textContent = 'Error ❌: ' + (err.message || err);
    console.error(err);
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    stopBtn.style.display = 'none';
  }
});

startBtn.onclick = async () => {
  const recordAudio = document.getElementById('audioCheckbox').checked;
  statusEl.textContent = 'Recording... 🎥';
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
  stopBtn.style.display = 'inline-block';
  await manager.startRecording({ video: true, audio: recordAudio });
};

pauseBtn.onclick = () => {
  manager.pauseRecording();
  statusEl.textContent = 'Recording paused ⏸';
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'inline-block';
};

resumeBtn.onclick = () => {
  manager.resumeRecording();
  statusEl.textContent = 'Recording resumed ▶️';
  resumeBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
};

stopBtn.onclick = () => {
  manager.stopRecording();
  statusEl.textContent = 'Stopping recording... ⏹';
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'none';
  stopBtn.style.display = 'none';
};