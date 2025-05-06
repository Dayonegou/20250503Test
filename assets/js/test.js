
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
            //managed ←ホストに接続できているかどうか
            //曲を入れる
           
        // ストリートライト / 加賀(ネギシャワーP)
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
    
        SongName.textContent = `${songName}`;
        Songsakusya.textContent = `${artist}`;
      },
      onTimerReady() {
        document.getElementById("loading").style.display = "none";
      }
  });

    //クリックしたら、楽曲の情報が各要素に入る
    /* 各要素を取得 */
    let firstBtn = document.getElementById("firstBtn");
    let Title = document.querySelector(".title")

    let explanation = document.getElementById("explanation");
    let StartBtn = document.getElementById("startBtn");
    
    let SecMain = document.getElementById("sec-main");

    /* firstを押したら、説明要素を出現 */
    firstBtn.addEventListener("click", () => {
        Title.style.display = "none"
        explanation.style.display = "flex"
    });

    /* startを押したら、メイン要素を出現 */
    StartBtn.addEventListener("click", () => {
        explanation.style.display = "none"
        SecMain.style.display = "inline-block"
        player.requestPlay(); // 再生開始
    });

    
};
