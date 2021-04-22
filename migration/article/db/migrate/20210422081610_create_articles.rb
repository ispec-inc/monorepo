class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :body, null: false

      t.timestamps

      t.index :user_id
      t.index :created_at
    end
  end
end
