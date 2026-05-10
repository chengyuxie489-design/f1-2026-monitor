# F1 2026 赛事监测台

一个可外部部署的 F1 2026 赛事监测站点，包含已完赛分站详情、当地特色展示、车手实时积分榜和 OpenF1 自动同步数据。

## 功能

- 自动从 OpenF1 同步 2026 已完赛分站
- 展示正赛、最快圈、冲刺赛结果
- 汇总车手实时积分榜
- 每 2 分钟自动刷新，支持手动刷新
- 保留最近一次可用缓存，避免接口短暂失败时页面空白
- 支持 Render、Railway、Docker 或普通 Node 服务部署

## 本地运行

```bash
npm start
```

默认地址：

```text
http://localhost:4173
```

健康检查：

```text
http://localhost:4173/api/health
```

## 部署到 Render

1. 将本项目上传到 GitHub。
2. 在 Render 创建 `Web Service`。
3. 连接该 GitHub 仓库。
4. 使用以下配置：
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. 部署完成后，Render 会提供固定 HTTPS 地址。

## 环境变量

- `PORT`: 服务端口，默认 `4173`
- `UPDATE_INTERVAL_MS`: OpenF1 同步间隔，默认 `120000`

## 数据源

数据来自 [OpenF1](https://openf1.org/)。OpenF1 是社区数据源，不是 Formula 1 官方 API。
