class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: false do |t|
      t.string :id, null: false, primary_key: true
      t.string :name, null: false
      t.string :email, null: false

      t.timestamps

      t.index :email, unique: true
    end
  end
end
