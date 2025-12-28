// =======================
// DOM
// =======================
const startBtn = document.getElementById("startBtn");
const bubble   = document.getElementById("bubble");
const bgm      = document.getElementById("bgm");
const ting     = document.getElementById("tingSound");
const btn15    = document.getElementById("timer15");
const btn30    = document.getElementById("timer30");
const btn60    = document.getElementById("timer60");

let storyIndex = 0;
let storyTimer = null;
let stopTimer  = null;

// =======================
// TTS
// =======================
function speak(text) {
  if (!window.speechSynthesis) return;

  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "vi-VN";
  u.rate = 0.75;
  u.pitch = 1;
  speechSynthesis.speak(u);
}

// =======================
// TRUYỆN NGỦ (ĐÃ SỬA CHUẨN)
// =======================
const sleepStories = [
`Con yêu à…
Bây giờ là lúc cả khu rừng chuẩn bị đi ngủ…
Gió thổi rất nhẹ…
Và chúng ta cùng nghe một câu chuyện thật êm nhé…`,

`Ngày xưa…
Trong một khu rừng xanh mát…
Có một chú gấu nhỏ rất hiền…`,

`Buổi tối hôm ấy…
Chú gấu đi dạo thật chậm…
Nghe tiếng lá rơi khe khẽ…
Nghe tiếng suối thì thầm rất nhỏ…`,

`Chú gặp bạn thỏ…
Thỏ đang cuộn mình ngủ dưới gốc cây…
Chú gặp chim con…
Chim đã rúc đầu vào cánh…`,

`Gấu nhỏ ngồi xuống…
Thở thật đều…
Cảm nhận khu rừng yên bình…`,

`Rồi gấu nhắm mắt…
Ngủ thật ngon…
Trong giấc mơ dịu dàng…`,

`Và bây giờ…
Con yêu cũng hãy nhắm mắt lại nhé…
Ngủ thật ngoan…
Chúc con ngủ ngon…`
];

// =======================
// KỂ TRUYỆN TUẦN TỰ
// =======================
function playNextStory() {
  const text = sleepStories[storyIndex];
  bubble.innerText = text;
  speak(text);

  storyIndex++;
  if (storyIndex >= sleepStories.length) storyIndex = 0;
}

// =======================
// BẮT ĐẦU KỂ
// =======================
function startStories() {
  playNextStory();
  storyTimer = setInterval(playNextStory, 20000);
}

// =======================
// DỪNG TẤT CẢ
// =======================
function stopAll() {
  clearInterval(storyTimer);
  clearTimeout(stopTimer);
  speechSynthesis.cancel();
  if (bgm) bgm.pause();
  bubble.innerText = "Chúc bé ngủ ngon 🌙";
}

// =======================
// HẸN GIỜ TẮT
// =======================
function setSleepTimer(minutes) {
  clearTimeout(stopTimer);
  stopTimer = setTimeout(stopAll, minutes * 60 * 1000);
  console.log("⏰ Hẹn giờ:", minutes, "phút");
}

// =======================
// START BUTTON
// =======================
startBtn.onclick = () => {
  console.log("▶ START");

  startBtn.style.display = "none";

  // 🎵 Nhạc nền
  if (bgm) {
    bgm.volume = 0.15;
    bgm.loop = true;
    bgm.play().catch(err => {
      console.log("BGM autoplay blocked – OK");
    });
  }

  // 🔔 Ting
  if (ting) {
    ting.volume = 0.5;
    ting.play().catch(err => {
      console.log("Ting autoplay blocked – OK");
    });
  }

  // 🗣️ Lời chào
  setTimeout(() => {
    speak("Xin chào các bé yêu. Bây giờ mình cùng nghe truyện và ngủ ngon nhé.");
  }, 800);

  // 📖 Bắt đầu kể truyện
  setTimeout(() => {
    startStories();
  }, 3000);
};

// =======================
// NÚT HẸN GIỜ
// =======================
if (btn15) btn15.onclick = () => setSleepTimer(15);
if (btn30) btn30.onclick = () => setSleepTimer(30);
if (btn60) btn60.onclick = () => setSleepTimer(60);

console.log("✅ Talking AI Kids READY – STABLE MODE");
