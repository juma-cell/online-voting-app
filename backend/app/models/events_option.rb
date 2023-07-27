class EventsOption < ApplicationRecord
  belongs_to :voting_event
  has_many :votes

  validates :options, :role, presence: true
end
