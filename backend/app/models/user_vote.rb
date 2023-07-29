class UserVote < ApplicationRecord
    has_many :candidates, foreign_key: :user_vote_id
    belongs_to :voting_event
    belongs_to :user

    validates :userName, presence: true, length: { maximum: 255 }
    validates :eventName, presence: true, length: { maximum: 255 }
end
