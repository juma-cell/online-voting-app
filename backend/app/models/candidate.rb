class Candidate < ApplicationRecord
  belongs_to :user_vote
  belongs_to :voting_event
end
