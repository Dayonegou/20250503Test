window.onload = () => {
    let player //外から読み込めるように定義
    const SongName = document.getElementById("SongName");
    const Songsakusya = document.getElementById("Songsakusya");
    //ライブラリから設計図を取ってくる
    const { Player, stringToDataUrl } = TextAliveApp; 
    
    // TextAlive Player を初期化
     
 player = new Player({ //取ってきたクラスをもとに、インスタンスを作成
    app: { token: "KJZe6vtNVyd2EZsl" }, 
    mediaElement: document.querySelector("#media"), //←メディアを入れる場合はここで指定するよう決まっている
 //   mediaBannerPosition: "bottom right"
  });

//API使えるようになったとお知らせ OnAppReadyを書く
  player.addListener({
    onAppReady: (app) => {
        //準備できたらやることを書く
        console.log("準備完了",app);
        
        if(!app.managed){
            //managed ←ホストに接続できているかどうか 曲を入れる
        player.createFromSongUrl("https://piapro.jp/t/ULcJ/20250205120202");
        //console.log(player); // クラスか確認
        //console.log(typeof player.requestPlay); // "function" でなければ何かおかしい！
        }    
    },
    onVideoReady: (video) => {
        console.log("動画準備OK！",video);
        const song = player.data.song;
        const songName = song?.name || "曲名なし";
        const artist = song?.artist.name || "情報なし";
        let ani_word = player.video.firstWord;
    
        SongName.textContent = `${songName}`;
        Songsakusya.textContent = `${artist}`;
        while (ani_word) {
            ani_word.animate = animateWord;
            ani_word = ani_word.next;
          }

      },
      onTimerReady() {
        document.getElementById("loading").style.display = "none";
      }
  });

//歌詞表示1
  const animateWord = function (now, unit) {
    if (unit.contains(now)) {
      document.querySelector("#Songkashi").textContent = unit.text;
    }
  };


//カウントダウン処理
function startCountdown(seconds, onComplete) {
    const countdownEl = document.getElementById("countdown");
    const countText = document.getElementById("countText");
  
    countdownEl.style.display = "flex";
    countText.textContent = seconds;
  
    let count = seconds;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        countText.textContent = count.toString();
      } else {
        clearInterval(interval);
        countdownEl.style.display = "none";
        if (typeof onComplete === "function") {
          onComplete();
        }
      }
    }, 1000);
  }
  
//ボタン操作
    /* 各要素を取得 */
    let firstBtn = document.getElementById("firstBtn");
    let Title = document.querySelector(".title")

    let explanation = document.getElementById("explanation");
    let StartBtn = document.getElementById("startBtn");

    let SecMain = document.getElementById("sec-main");
    let stop = document.querySelector(".stop");
    let StopBtn = document.getElementById("StopBtn");

    let Restart = document.getElementById("Restart");
    let pause = document.getElementById("pause");
    let contBtn = document.getElementById("continue");

    /* firstを押したら、説明要素を出現 */
    firstBtn.addEventListener("click", () => {
        Title.style.display = "none"
        explanation.style.display = "flex"
    });

    /* startを押したら、メイン要素を出現 */
    StartBtn.addEventListener("click", () => {
        explanation.style.display = "none"
        SecMain.style.display = "inline-block"
        stop.style.display = "inline-block"
        startCountdown(3, () => {
            player.requestPlay(); // ✅ カウントダウン後に再生
          });
    });

    /* stopを押したら、曲をストップ */
    StopBtn.addEventListener("click", () => {
        player.requestPause(); 
        pause.style.display = "flex"
    });

    /* continueを押したら、続きから */
    contBtn.addEventListener("click", () => {
        pause.style.display = "none"
        startCountdown(3, () => {
            player.requestPlay(); // ✅ カウントダウン後に再生
          });
    });

    /* Restartを押したら、初めから */
    Restart.addEventListener("click", () => {
        player.requestStop(); 
        pause.style.display = "none"
        startCountdown(3, () => {
            player.requestPlay(); // ✅ カウントダウン後に再生
          });
    });
    
};
