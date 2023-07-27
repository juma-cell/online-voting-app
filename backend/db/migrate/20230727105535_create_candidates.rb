class CreateCandidates < ActiveRecord::Migration[7.0]
  def change
    create_table :candidates do |t|
      t.string :role
      t.string :userName
      t.references :user_vote, null: false, foreign_key: true
      t.references :voting_event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
