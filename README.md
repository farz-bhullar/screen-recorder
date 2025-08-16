# Screen Recorder (Web)

A lightweight, browser-based **Screen Recording Manager** built with **JavaScript**. It allows you to record your screen with optional microphone audio, and provides smart controls like start, pause, resume, and stop. Recordings can be previewed in a new tab or downloaded directly.

## 🔗 Live Demo

[Try it live here](https://farz-bhullar.github.io/screen-recorder)

## 🚀 Features

- Record full browser screen.
- Optional microphone audio recording.
- Start, pause, resume, and stop controls.
- Preview recording in a new tab.
- Download recordings with automatic numbering (`Recording 1`, `Recording 2`, ...).
- Fully customizable and easy to integrate into any web project.

## 💻 Usage

1. Clone this repo:
    ```bash
    git clone https://github.com/farz-bhullar/screen-recorder.git
    cd screen-recording-manager
    ```

2. Open `index.html` in your browser.
3. Use the checkbox to enable/disable audio recording.
4. Use the buttons to control screen recording.
5. Preview your recordings in a new tab or download them directly.

## 📂 Project Structure

```bash
screen-recorder/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── screen-recording-manager.js
    └── custom.js
```


## ⚡ Customization & Reusability

This project is fully **customizable** and **easy to integrate** into any web application.  
You can take the code, adapt it to your own requirements, add new features, or extend its functionality.  
Designed to be **plug-and-play**, it’s perfect for developers looking to build browser-based screen recording tools quickly.

### Example: Customizing for Your App

```html
<script src="js/screen-recording-manager.js"></script>
<script>
  // Initialize manager with custom callbacks
  const manager = new ScreenRecordingManager({
    onStart: () => console.log('Recording started!'),
    onStop: (blob, fileName) => {
      console.log('Recording stopped:', fileName);
      // You can save it to server, or process it
    }
  });

  // Start recording with audio
  manager.startRecording({ video: true, audio: true });

  // Stop after 10 seconds
  setTimeout(() => manager.stopRecording(), 10000);
</script>
```

> 💡 You can extend this by adding multiple recordings, custom UI, or integrating with your backend for automated saving.

## 📌 Author

Farz Bhullar – Ruby on Rails & JavaScript Developer, constantly learning and exploring new web technologies.

LinkedIn: [Farzpal Singh](https://www.linkedin.com/in/farzpal-singh)
