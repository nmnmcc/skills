# Agent Skills 仓库模板

这是一个兼容 [skills.sh](https://skills.sh/) 与开放 [Agent Skills 规范](https://agentskills.io/specification) 的多技能仓库脚手架。

## 目录结构

```text
.
├── skills/
│   └── example-skill/
│       ├── SKILL.md          # 必需：技能元数据和指令
│       ├── scripts/          # 可选：可执行脚本
│       ├── references/       # 可选：按需读取的参考资料
│       └── assets/           # 可选：输出所需的模板或静态资源
├── scripts/
│   └── validate-skills.mjs   # 仓库级校验器
└── skills.sh.json            # skills.sh 仓库页分组配置
```

## 开始使用

1. 复制 `skills/example-skill` 并将目录改为技能名称。
2. 修改 `SKILL.md` 的 `name`、`description` 和正文；目录名必须与 `name` 相同。
3. 只保留真正需要的 `scripts/`、`references/`、`assets/` 目录。
4. 在 `skills.sh.json` 中登记技能，以便在 skills.sh 仓库页中分组展示。
5. 运行校验：

```bash
npm test
```

也可以用官方 CLI 查看本地仓库中可发现的技能：

```bash
npx skills add . --list
```

发布到 GitHub 后，用户可通过以下命令安装：

```bash
npx skills add owner/repo
npx skills add owner/repo --skill example-skill
```

## 编写约定

- 每个技能放在 `skills/<skill-name>/` 中，并包含一个 `SKILL.md`。
- `name` 使用 1–64 个小写字母、数字和连字符，且与目录名一致。
- `description` 简洁说明技能做什么，以及应在什么场景触发。
- 正文写给 AI 代理阅读，使用明确、可执行的指令。
- 大段参考资料放入 `references/`，重复且要求稳定的操作放入 `scripts/`。
- 不要提交密钥、令牌、个人数据或来源不明的可执行文件。

## 发布检查清单

- `npm test` 通过。
- `npx skills add . --list` 能发现预期技能。
- `skills.sh.json` 是有效 JSON，且其中的技能名真实存在。
- README 中的 `owner/repo` 已替换为实际 GitHub 仓库。

## License

[MIT](LICENSE)
