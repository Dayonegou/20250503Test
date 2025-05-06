
window.onload = () => {

    let player //外から読み込めるように定義
    let isVideoReady = false; //←楽曲の読み込みフラグ
    let pendingPlay = false; //←楽曲読み込み未完了時のフラグ
    const infoEl = document.getElementById("songInfo");
    const playBtn = document.getElementById("playBtn");
    
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
            //managed ←ホストに接続できているかどうか
            //曲を入れる
           
        // ストリートライト / 加賀(ネギシャワーP)
        player.createFromSongUrl("https://piapro.jp/t/ULcJ/20250205120202");
        //console.log(player); // クラスか確認
        //console.log(typeof player.requestPlay); // "function" でなければ何かおかしい！
        
        }
    },
    onVideoReady: (v) => {
        console.log("動画準備OK！",v);
        const song = v.data.song;
        const songName = song?.name || "曲名なし";
        const artist = song?.artist?.name || "アーティスト名なし";
    
        infoEl.textContent = `♪ ${songName} / ${artist}`;
        playBtn.disabled = false;
        
      }
  });

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

     // ボタンで再生
     playBtn.addEventListener("click", () => {
        player.requestPlay(); // 再生開始
   });
};
