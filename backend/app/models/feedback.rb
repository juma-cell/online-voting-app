class Feedback < ApplicationRecord
  belongs_to :user
  

  validates :eventName, presence: true, length: { maximum: 255 }
  validates :message, presence: true
end
