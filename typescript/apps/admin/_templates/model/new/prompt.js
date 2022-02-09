module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'Modelのタイプを選択してください',
    choices: ['domain', 'payload'],
  },
  {
    type: 'input',
    name: 'name',
    message: 'Modelの名前を入力してください。\n例) Article',
  },
  {
    type: 'input',
    name: 'path',
    message:
      'core/model/[domain|payload]以下のパスを入力してください。\n例) article',
  },
]
