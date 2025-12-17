// =======================
// DOM
// =======================
const bubble = document.getElementById("bubble");
const micBtn = document.getElementById("micBtn");
const storyBtn = document.getElementById("storyBtn");
const bgm = document.getElementById("bgm");
const app = document.querySelector(".app");

// =======================
// TTS
// =======================
function speak(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.lang = "vi-VN";
  u.rate = 0.7;
  u.pitch = 0.95;
  speechSynthesis.speak(u);
}

// =======================
// SPEECH TO TEXT (MIC)
// =======================
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recog = new SpeechRecognition();
recog.lang = "vi-VN";

micBtn.onclick = () => {
  bubble.innerHTML = "Cô đang nghe nè 👂";
  recog.start();
};

recog.onresult = (e) => {
  const text = e.results[0][0].transcript;
  bubble.innerHTML = "Bé nói: " + text;
  speak("Con nói hay lắm");
};

// =======================
// TRUYỆN NGỦ
// =======================
const sleepStories = [
`Ngày xửa ngày xưa, có một chú mèo nhỏ.
Mèo cuộn tròn trong chiếc giường êm.
Ánh trăng chiếu nhẹ qua cửa sổ.
Mèo ngủ thật ngon...`,

`Trong khu rừng yên tĩnh,
chú gấu con nằm nghe gió thổi.
Lá cây khẽ lay.
Gấu từ từ chìm vào giấc ngủ...`,

`Có một chú thỏ nhỏ tên là Mít.
Buổi tối, gió thổi mát rượi.
Mít cuộn mình trong tổ.
Giấc ngủ đến thật êm...`,

`Bầu trời đầy sao lấp lánh.
Không gian yên bình.
Bé nhắm mắt lại.
Ngủ thật sâu và ngon nhé...`
];

async function tellSleepStory(text) {
  const parts = text.split(/\n+/).filter(p => p.trim());

async function startSleepPlaylist() {
  while (true) {
    const story =
      sleepStories[Math.floor(Math.random() * sleepStories.length)];

    await tellSleepStory(story);

    // nghỉ giữa các truyện
    await new Promise(r => setTimeout(r, 10000));
  }
}

  for (const part of parts) {
    bubble.innerHTML = part;
    speak(part);
    await new Promise(r => setTimeout(r, part.length * 90 + 1200));
  }
}

// =======================
// HẸN GIỜ TẮT NHẠC
// =======================
function startSleepTimer(minutes = 30) {
  if (!bgm) return;

  console.log("⏰ Hẹn giờ tắt nhạc:", minutes, "phút");

  setTimeout(() => {
    let vol = bgm.volume;
    const fade = setInterval(() => {
      vol -= 0.01;
      if (vol <= 0) {
        bgm.pause();
        bgm.currentTime = 0;
        clearInterval(fade);
      } else {
        bgm.volume = vol;
      }
    }, 500);
  }, minutes * 60 * 1000);
}

// =======================
// NÚT KỂ CHUYỆN NGỦ
// =======================
storyBtn.onclick = () => {
  document.body.classList.add("sleep");
  app.classList.add("sleep");

  bgm.volume = 0.08;
  bgm.play().catch(() => {});

  startSleepTimer(15);

  const story =
    sleepStories[Math.floor(Math.random() * sleepStories.length)];

  bubble.innerHTML = "🌙 Cô bắt đầu kể chuyện cho bé ngủ nha";
  speak("Cô bắt đầu kể chuyện cho bé ngủ nha");

  setTimeout(() => tellSleepStory(story), 1500);
};
async function startSleepPlaylist() {
  while (true) {
    const story =
      sleepStories[Math.floor(Math.random() * sleepStories.length)];

    await tellSleepStory(story);

    // nghỉ giữa các truyện 10 giây
    await new Promise(r => setTimeout(r, 10000));
  }
}

// =======================
// AUTO MODE – YOUTUBE KIDS
// =======================
function startYouTubeMode() {
  console.log("📺 YouTube Kids mode ON");

  document.body.classList.add("sleep");
  app.classList.add("sleep");

  if (bgm) {
    bgm.volume = 0.1;
    bgm.play().catch(() => {});
  }

  setTimeout(() => {
    if (bgm) bgm.volume = 0.05;
    speak("Xin chào các bé yêu. Bây giờ mình cùng nghe kể chuyện và ngủ ngon nhé.");
  }, 800);

  setTimeout(() => {
    startSleepPlaylist();
  }, 3500);

  startSleepTimer(30);
}

 // =======================
// AUTO START (CẦN 1 CLICK)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  console.log("📺 YouTube Kids mode READY");

  document.body.addEventListener(
    "click",
    () => {
      startYouTubeMode();
    },
    { once: true }
  );
});

console.log("✅ Talking AI Kids READY");
