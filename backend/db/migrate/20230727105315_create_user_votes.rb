class CreateUserVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_votes do |t|
      t.string :userName
      t.integer :vote_id
      t.string :eventName

      t.timestamps
    end
  end
end
