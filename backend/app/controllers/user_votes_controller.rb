class UserVotesController < ApplicationController
  before_action :set_user_vote, only: [:show]

  # GET /user_votes/1 or /user_votes/1.json
  def show
    user_vote = UserVote.find_by(id: params[:id]) # value or nil
    if user_vote
      render json: user_vote
    else
      render json: { error: "User vote not found" }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user_vote
    @user_vote = UserVote.find(params[:id])
  end
end
