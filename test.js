'use strict';

// パッケージを読み込む
let http = require('http');
let fs = require('fs');

// サーバ機能の初期化
let server = http.createServer();

// リクエストがきたときに呼び出される
server.on('request', function(req, res) {
    let filename = '';

    // URLに応じて読み込むファイル名を変える
    if (req.url == '/index02') {
        filename = 'index02.html';
    }

    // ファイルの読み込み
    fs.readFile(__dirname + '/'+filename, 'utf-8', function(err, data) {
        // ファイル読み込みエラーが発生した場合
        if (err) {
            // ファイルが存在しない場合のHTTPステータスコード「404」を、HTTPヘッダに入れる
            // 文字を表示するため「text/plain」に設定する
            res.writeHead(404, {'Content-Type': 'text/plain'});
            // 本文（Body部）に文字を表示する
            res.write('Page Not Found!');
            return res.end();
        }

        // 成功した場合のHTTPステータスコード「200」を、HTTPヘッダに入れる
        // HTMLを表示するため「text/html」に設定する
        res.writeHead(200, {'Content-Type': 'text/html'});
        // dataに読み込んだファイル内容が入っているので、そのまま表示する
        res.write(data);
        res.end();
    });
});

// 指定したIPアドレス、ポート番号でサーバを立てる
server.listen(3000, '127.0.0.1');