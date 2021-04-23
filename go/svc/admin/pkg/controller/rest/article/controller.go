package article

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	pb "github.com/ispec-inc/monorepo/go/gen/admin/api/rest/article"
	"github.com/ispec-inc/monorepo/go/pkg/presenter"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/model"
	"github.com/ispec-inc/monorepo/go/svc/admin/pkg/view"
)

type controller struct{}

func newController() controller {
	return controller{}
}

func (h controller) list(w http.ResponseWriter, r *http.Request) {
	atls := &model.Articles{}
	if err := atls.Find(); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	presenter.Response(w, &pb.ListResponse{
		Articles: view.NewArticles(atls),
	})
}

func (h controller) get(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	atl := &model.Article{}
	if err := atl.Find(int64(id)); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	presenter.Response(w, &pb.GetResponse{
		Article: view.NewArticle(atl),
	})
}

func (h controller) create(w http.ResponseWriter, r *http.Request) {
	body := &pb.CreateRequest{}
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	if err := body.Validate(true); err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	atl := model.NewArticle(body.UserId, body.Title, body.Body)
	if err := atl.Create(); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	atls := &model.Articles{}
	if err := atls.Find(); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	presenter.Response(w, &pb.CreateResponse{
		Articles: view.NewArticles(atls),
	})
}

func (h controller) update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	body := &pb.UpdateRequest{}
	if err := json.NewDecoder(r.Body).Decode(body); err != nil {
		presenter.BadRequestError(w, err)
		return
	}
	if err := body.Validate(true); err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	atl := &model.Article{}
	if err := atl.Find(int64(id)); err != nil {
		presenter.ApplicationException(w, err)
		return
	}
	atl.UserID = body.UserId
	atl.Title = body.Title
	atl.Body = body.Body
	if err := atl.Save(); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	presenter.Response(w, &pb.UpdateResponse{
		Article: view.NewArticle(atl),
	})
}

func (h controller) delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		presenter.BadRequestError(w, err)
		return
	}

	atl := &model.Article{}
	if err := atl.Find(int64(id)); err != nil {
		presenter.ApplicationException(w, err)
		return
	}
	if err := atl.Delete(); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	atls := &model.Articles{}
	if err := atls.Find(); err != nil {
		presenter.ApplicationException(w, err)
		return
	}

	presenter.Response(w, &pb.DeleteResponse{
		Articles: view.NewArticles(atls),
	})
}
