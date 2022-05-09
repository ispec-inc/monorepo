class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.references :user, null: false, foreign_key: true, type: :string
      t.string :title, null: false
      t.string :content, null: false

      t.timestamps

      t.index :created_at
    end
  end
end
