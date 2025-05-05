//まず、ライブラリから設計図を取ってくる
const { Player, stringToDataUrl } = TextAliveApp; 

// TextAlive Player を初期化
const player = new Player({ //取ってきたクラスをもとに、インスタンスを作成
    // トークンは https://developer.textalive.jp/profile で取得したものを使う
    app: { token: "KJZe6vtNVyd2EZsl" }, 
 //   mediaElement: document.querySelector("#media"),
 //   mediaBannerPosition: "bottom right"

  });

  //API使えるようになった


//クリックしたら、楽曲の情報が各要素に入る
/* 各要素を取得 */
let StartBtn = document.getElementById("startBtn");
let Title = document.querySelector(".title")
let SecMain = document.getElementById("sec-main");

/* startを押したら、要素を出現 */
  StartBtn.addEventListener("click", () => {
    Title.style.display = "none"
    SecMain.style.display = "inline-block"
  });