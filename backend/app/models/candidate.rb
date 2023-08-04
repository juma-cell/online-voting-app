class Candidate < ApplicationRecord
  has_many :votes, dependent: :destroy
  belongs_to :user_vote, class_name: "User"
  belongs_to :voting_event

  validates :role, presence: true, length: { maximum: 255 }
  validates :userName, presence: true, length: { maximum: 255 }
end

