# 基於原子干涉技術之量子陀螺儀前期研究

使用 Cloudflare Workers Static Assets 提供專題完整版 PDF。

開啟 https://topics.paul-chu.com/ 即可直接在瀏覽器閱讀 PDF，網址維持在根目錄。也可使用 https://topics.paul-chu.com/quantum-gyroscope-project.pdf 。

## 檔案與部署設定

- `index.js`：正式 Worker 入口，處理根網址與 PDF 網址，設定 `application/pdf` 和 `inline` 回應標頭。
- `src/index.js`：相容入口，轉用根目錄的同一份程式。
- `quantum-gyroscope-project.pdf`：唯一的 PDF 來源，保留在 repository 根目錄。
- `wrangler.jsonc`：Worker 名稱 `topic`，入口 `./index.js`，ASSETS 目錄為 repository 根目錄。
- `.assetsignore`：只上傳 PDF，不上傳程式碼、設定或說明文件。

## Cloudflare Workers Builds

- GitHub repository：`Paulchu71/topic`
- Production branch：`main`
- Root directory：repository 根目錄（`/`），不要設定為 `src`。
- Build command：留空。
- Deploy command：`npx wrangler deploy`

`wrangler.jsonc` 已宣告 `topics.paul-chu.com` 為 Custom Domain。部署使用的 Cloudflare 帳號必須擁有有效的 `paul-chu.com` zone 與對應權限。如果該主機名稱已有其他 CNAME，需先確認用途並處理衝突；也可在 Worker 的 **Settings → Domains & Routes** 管理網域。

## 若仍看到舊的入口錯誤

目前設定的入口是根目錄 `./index.js`，且 `src/index.js` 也存在。如果日誌仍出現 `The entry-point file at "src/index.js" was not found`：

1. 確認建置連接的是上述 repository 與 `main` 分支。
2. 確認建置使用最新提交，而不是重試舊的失敗建置。
3. 確認 Root directory 為 repository 根目錄，部署命令沒有額外指定舊入口或另一份設定。
4. 重新執行最新提交的部署。

## 更新專題

替換根目錄 `quantum-gyroscope-project.pdf` 並 Commit，即可觸發已連接的 Workers Builds 部署。請保留 `.assetsignore`。

## 本機驗證

在 repository 根目錄執行：

```sh
npx wrangler deploy --dry-run
npx wrangler dev --local
```

開啟本機網址 `/` 或 `/quantum-gyroscope-project.pdf`，兩者應回傳相同 PDF。其他路徑回傳 404。

## 官方文件

- https://developers.cloudflare.com/workers/static-assets/binding/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
