package transaction

import (
	"github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	"gorm.io/gorm"
)

// See also: https://stackoverflow.com/questions/16184238/database-sql-tx-detecting-commit-or-rollback
func Run(db *gorm.DB, f func(tx *gorm.DB) error) (err error) {
	tx := db.Begin()

	defer func() {
		if p := recover(); p != nil {
			tx.Rollback()
			panic(p) // re-throw panic after Rollback
		} else if err != nil {
			tx.Rollback()
		} else {
			err := tx.Commit().Error
			if err != nil {
				err = apperror.WithCode(apperror.CodeError, err)
			}
		}
	}()

	return f(tx)
}
