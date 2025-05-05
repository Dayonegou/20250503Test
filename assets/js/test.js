//まず、ライブラリから設計図を取ってくる
const { Player, stringToDataUrl } = TextAliveApp; 

// TextAlive Player を初期化
const player = new Player({ //取ってきたクラスをもとに、インスタンスを作成
    // トークンは https://developer.textalive.jp/profile で取得したものを使う
    app: { token: "KJZe6vtNVyd2EZsl" }, 
    mediaElement: document.querySelector("#media"),
    mediaBannerPosition: "bottom right"

  });

//プレイヤーの準備ができたら、楽曲情報などTextAliveから呼ばれる 主に音楽や歌詞の情報や動きの中身を書く
player.addListener({
    /* APIの準備ができたらTextAliveから呼ばれる 主に音楽や歌詞の情報や動きの中身を書く*/
    onAppReady(app) { 
      if (app.managed) {
        document.querySelector("#control").className = "disabled";
        console.log("controlにクラス追加")
      }
      if (!app.songUrl) {
        document.querySelector("#media").className = "disabled";
  
        // ストリートライト / 加賀(ネギシャワーP)
        player.createFromSongUrl("https://piapro.jp/t/ULcJ/20250205120202", { //インスタンスが持つ、ハンドラを記述
          video: {
            // 音楽地図訂正履歴
            beatId: 4694275,
            chordId: 2830730,
            repetitiveSegmentId: 2946478,
  
            // 歌詞URL: https://piapro.jp/t/DPXV
            // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FULcJ%2F20250205120202
            lyricId: 67810,
            lyricDiffId: 20654
          }
        });      console.log("楽曲情報をin")
      }
    },
  
    /* 楽曲が変わったら呼ばれる */
    onAppMediaChange() {
      // 画面表示をリセット
      overlay.className = "";
      bar.className = "";
      resetChars();
    },
  
    /* 楽曲情報が取れたら呼ばれる */
    onVideoReady(video) {
      // 楽曲情報を表示
      document.querySelector("#artist span").textContent =
        player.data.song.artist.name;
      document.querySelector("#song span").textContent = player.data.song.name;
  
      // 最後に表示した文字の情報をリセット
      c = null;
      console.log("とれた！")
    },
  
    /* 再生コントロールができるようになったら呼ばれる */
    onTimerReady() {
      overlay.className = "disabled";
      document.querySelector("#control > a#play").className = "";
      document.querySelector("#control > a#stop").className = "";
      console.log("コントロールOK")
    },
  
    /* 再生位置の情報が更新されたら呼ばれる */
    onTimeUpdate(position) {
      // シークバーの表示を更新
      paintedSeekbar.style.width = `${
        parseInt((position * 1000) / player.video.duration) / 10
      }%`;
  
      // 現在のビート情報を取得
      let beat = player.findBeat(position);
      if (b !== beat) {
        if (beat) {
          requestAnimationFrame(() => {
            bar.className = "active";
            requestAnimationFrame(() => {
              bar.className = "active beat";
            });
          });
        }
        b = beat;
      }
  
      // 歌詞情報がなければこれで処理を終わる
      if (!player.video.firstChar) {
        return;
      }
  
      // 巻き戻っていたら歌詞表示をリセットする
      if (c && c.startTime > position + 1000) {
        resetChars();
      }
  
      // 500ms先に発声される文字を取得
      let current = c || player.video.firstChar;
      while (current && current.startTime < position + 500) {
        // 新しい文字が発声されようとしている
        if (c !== current) {
          newChar(current);
          c = current;
        }
        current = current.next;
      }
    },
  
    /* 楽曲の再生が始まったら呼ばれる */
    onPlay() {
      const a = document.querySelector("#control > a#play");
      while (a.firstChild) a.removeChild(a.firstChild);
      a.appendChild(document.createTextNode("\uf28b"));
    },
  
    /* 楽曲の再生が止まったら呼ばれる */
    onPause() {
      const a = document.querySelector("#control > a#play");
      while (a.firstChild) a.removeChild(a.firstChild);
      a.appendChild(document.createTextNode("\uf144"));
    }
  });

  //クリックしたら、楽曲の情報が各要素に入る
let startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {

  });