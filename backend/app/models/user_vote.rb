class UserVote < ApplicationRecord
    has_many :candidates
    belongs_to :voting_event
end
