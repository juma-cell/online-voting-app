class VotingEvent < ApplicationRecord
  has_many :user_votes
  has_many :candidates


  validates :eventsName, presence: true, length: { maximum: 255 }
  validates :eventsDescription, presence: true
  validates :duration, presence: true, numericality: { only_integer: true, greater_than: 0 }
  
end
