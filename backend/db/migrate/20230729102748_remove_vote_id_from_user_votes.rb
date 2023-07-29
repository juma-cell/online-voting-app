class RemoveVoteIdFromUserVotes < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_votes, :vote_id, :integer
  end
end
