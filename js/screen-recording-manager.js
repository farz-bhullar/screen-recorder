class ScreenRecordingManager {
  /**
   * @param {Object} options
   * options.onSuccess: function(blob) => called when recording stops successfully
   * options.onError: function(error) => called when recording fails
   */
  constructor({ onSuccess, onError } = {}) {
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
    this.onSuccess = onSuccess || ((blob) => console.log("Recording finished", blob));
    this.onError = onError || ((error) => console.error("Recording failed", error));
  }

  /**
   * Start screen recording
   */
  async startRecording(options = { video: true, audio: false }) {
    try {
      if (this.recorder && ["recording", "paused"].indexOf(this.recorder.state) !== -1) {
        throw new Error("Recording already in progress");
      }

      // Ask browser for screen capture
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: options.video,
        audio: options.audio ? true : false // system audio if supported
      });

      let combinedStream = screenStream;

      // If user wants microphone audio, merge it
      if (options.audio) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          combinedStream = new MediaStream([
            ...screenStream.getVideoTracks(),
            ...audioStream.getAudioTracks()
          ]);
        } catch (err) {
          console.warn("Microphone access denied or unavailable:", err);
        }
      }

      this.stream = combinedStream;

      // Create MediaRecorder
      this.recorder = new MediaRecorder(this.stream);
      this.chunks = [];

      // Collect data
      this.recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };

      // When stopped
      this.recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: "video/webm" });
        this.onSuccess(blob);
        this._cleanup();
      };

      this.recorder.onerror = (e) => {
        this.onError(e.error || e);
        this._cleanup();
      };

      this.recorder.start();
      console.log("Recording started...");
    } catch (error) {
      this.onError(error);
    }
  }

  /**
   * Stop screen recording
   */
  stopRecording() {
    if (this.recorder && ["recording", "paused"].indexOf(this.recorder.state) !== -1) {
      // Listen once for stop event
      this.recorder.onstop = () => {
        // Stop all tracks first
        this.stream.getTracks().forEach(track => track.stop());
  
        // Finalize blob
        const blob = new Blob(this.chunks, { type: this.recorder.mimeType || "video/webm" });
        this.onSuccess(blob);
  
        // Cleanup
        this._cleanup();
      };
  
      this.recorder.stop();
    } else {
      console.warn("No active recording to stop");
    }
  }  

  /**
   * Pause recording
   */
  pauseRecording() {
    if (this.recorder && this.recorder.state === "recording") {
      this.recorder.pause();
      console.log("Recording paused...");
    }
  }

  /**
   * Resume recording
   */
  resumeRecording() {
    if (this.recorder && this.recorder.state === "paused") {
      this.recorder.resume();
      console.log("Recording resumed...");
    }
  }

  /**
   * Cleanup after recording ends
   */
  _cleanup() {
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
  }
}
