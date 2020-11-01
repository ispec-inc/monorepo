package transaction

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"github.com/jinzhu/gorm"
)

// See also: https://stackoverflow.com/questions/16184238/database-sql-tx-detecting-commit-or-rollback
func Run(db *gorm.DB, f func(tx *gorm.DB) apperror.Error) (aerr apperror.Error) {
	tx := db.Begin()

	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p) // re-throw panic after Rollback
		} else if aerr != nil {
			tx.Rollback()
		} else {
			err := tx.Commit().Error
			if err != nil {
				aerr = apperror.New(apperror.CodeError, err)
			}
		}
	}()

	return f(tx)
}
