class Article < ActiveRecord::Base; end

Article.seed(
  :id,
  { id: 1, title: "ハロー" },
)
