class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :day, null: false
      t.integer :month, null: false
      t.integer :year, null: false
      t.string :tag, null: false
      
      t.timestamps
    end
  end
end
