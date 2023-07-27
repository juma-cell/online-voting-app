class EventsOption < ApplicationRecord
  belongs_to :voting_event
  has_many :votes

  validates :options, :eventName, presence: true
end
