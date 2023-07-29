class AddVotingEventIdToUserVotes < ActiveRecord::Migration[7.0]
  def change
    add_reference :user_votes, :voting_event, null: false, foreign_key: true
  end
end
