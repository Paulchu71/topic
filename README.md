# 基於原子干涉技術之量子陀螺儀前期研究

專題完整版 PDF，使用 Cloudflare Workers Static Assets 部署。

## 上傳 GitHub

1. 解壓縮 ZIP。
2. 打開 GitHub 的 `Paulchu71/topic`，選擇 **Add file → Upload files**。
3. 把解壓後的 `public`、`src` 資料夾，以及 `wrangler.jsonc`、`README.md` 一起拖到上傳區。請保留資料夾結構，直接放在 repository 根目錄；不要上傳 ZIP 本身，也不要多包一層資料夾。
4. 按 **Commit changes**。若 repository 原本有根目錄的 `_redirects` 或 PDF，可另外刪除；此版本使用 `public` 內的 PDF。

根目錄應有：

- `public/quantum-gyroscope-project.pdf`
- `src/index.js`
- `wrangler.jsonc`
- `README.md`

## Cloudflare 設定

- Worker 名稱：`topic`（與 wrangler.jsonc 的 name 相同）
- Production branch：`main`
- 組建命令：留空
- 部署命令：`npx wrangler deploy`
- 根目錄：`/`

等 Cloudflare 完成部署後，先開 Worker 的網址確認 PDF 可讀。

接著在 `topic` 的 **Settings → Domains & Routes → Add → Custom Domain** 加入 `topics.paul-chu.com`。

設定生效後，開啟 https://topics.paul-chu.com/ 會以 302 轉址到 `/quantum-gyroscope-project.pdf`。

此壓縮包提供部署檔案；GitHub 上傳、Cloudflare 部署與網域綁定仍須完成。

## 更新專題

替換 `public/quantum-gyroscope-project.pdf` 並 Commit，即可觸發已連接的 Cloudflare Workers Builds 部署。

## 官方文件

- https://developers.cloudflare.com/workers/static-assets/binding/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
