# app/models/vote.rb
class Vote < ApplicationRecord
    belongs_to :user
    belongs_to :candidate
  
    # Add any additional validations or custom methods here as needed.
  
    # Example of custom validation to prevent a user from voting on the same post multiple times
    validates :user_id, uniqueness: { scope: :candidate_id, message: "You can only vote once per post." }
end