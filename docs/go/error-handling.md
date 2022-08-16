# エラーハンドリング

monorepoのエラーハンドリングに関する規約について。

## apperrorの利用
StackTraceを記録したいので、errorが発生したタイミングで`apperror.New`あるいは`apperror.Errorf`を使う。

```
if err := sample(); err != nil {
	return apperror.New(apperror.CodeError, err) // ここからStackTraceが記録される
}
```


```
if err := sample(); err != nil {
	return apperror.Errorf(apperror.CodeError, "new error: %v", ErrDomainLogic)
}
```

## ライブラリ固有のエラー

gormから返ってきたエラーを適切な`apperror.Code`にマッピングするために、apperrorパッケージでは、gormから返ってきたエラーをハンドリングする関数を提供している。

```
if err := db.Where("id = ?", id).Find(&entity).Error; err != nil {
    return []entity.Entity{}, apperror.NewGormFind(err, entity.EntityName)
}
```

gormから返ってきたエラーを`svc`配下で扱う時は、原則この`apperror.NewGorm`系の関数を使う。
