class UserVote < ApplicationRecord
    has_many :candidates, foreign_key: :user_vote_id
    belongs_to :voting_event
end
