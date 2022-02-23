class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :serial do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :email, null: false

      t.timestamps

      t.index :email, unique: true
    end
  end
end
