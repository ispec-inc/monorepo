class CreateHeroes < ActiveRecord::Migration[6.0]
  def change
    create_table :heroes do |t|
      t.string :name
      t.integer :age
      t.boolean :is_jedi
      t.timestamps
    end
  end
end
