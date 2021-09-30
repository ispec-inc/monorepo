import { ISampleArticleRepository } from "~/core/02-repository/sample/article";

export class ArticleIndexPageService {
  private readonly repository: ISampleArticleRepository

  constructor(repository: ISampleArticleRepository) {
    this.repository = repository
  }
}
