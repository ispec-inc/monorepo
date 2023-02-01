module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'Modelのタイプを選択してください',
    choices: ['domain', 'payload'],
  },
  {
    type: 'input',
    name: 'path',
    message:
      'core/models/[domain|payload]以下のパスを入力してください。先頭、末尾の"/"は不要です。\n例) article',
  },
]
