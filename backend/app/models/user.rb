class User < ApplicationRecord
    has_secure_password
    
    has_many :feedbacks
    has_many :user_votes
    belongs_to :voting_event
    has_many :candidates, through: :user_votes

    validates :firstName, :lastName, presence: true, length: { maximum: 50 }
  validates :userName, uniqueness: true, presence: true, length: { maximum: 50 }
  validates :email, uniqueness: true, presence: true, length: { maximum: 255 }
  validates :password_digest, presence: true, length: { minimum: 6 }
  validates :is_admin, inclusion: { in: [true, false] }
  validates :profile_picture, allow_blank: true, format: {
    with: /\.(jpg|png|gif)\z/i,
    message: 'must be a URL for JPG, PNG, or GIF image.'
  }

end
