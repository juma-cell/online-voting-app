class Feedback < ApplicationRecord
  belongs_to :user
  belongs_to :voting_event

  validates :eventName, presence: true, length: { maximum: 255 }
  validates :message, presence: true
end
