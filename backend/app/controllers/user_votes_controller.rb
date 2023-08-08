# app/controllers/user_votes_controller.rb
class UserVotesController < ApplicationController
  include CurrentUserConcern
  before_action :set_user_vote, only: [:show, :edit, :update, :destroy]

  def index
    @user_votes = UserVote.all
    render json: @user_votes
  end

  def show
    render json: @user_vote
  end

  def new
    @user_vote = UserVote.new
    render json: @user_vote
  end

  # def create
  #   @user_vote = UserVote.new(user_vote_params)
  #   @user_vote.user_id = @current_user.id

  #   if @user_vote.save
  #     render json: @user_vote, status: :created
  #   else
  #     render json: @user_vote.errors, status: :unprocessable_entity
  #   end
  # end

  def create
    # puts "@current_user: #{@current_user.inspect}"
#     voting_event_id = params[:voting_event_id]
#     user_id = params[:user_id]

# # user_votes = UserVote.where(voting_event_id: voting_event_id, user_id: user_id)
#     existing_vote_event = UserVote.where(voting_event_id: voting_event_id, user_id: user_id)
#     if existing_vote_event
#       render json: {message: "You have already voted for this event"}, status: :ok
#     else
      user_vote = UserVote.new(user_vote_params)
      user_vote.user_id = user_vote_params[:user_id]
      user_vote.candidate_id = user_vote_params[:candidate_id]
      user_vote.voting_event_id= user_vote_params[:voting_event_id]
      
      if user_vote.save
        render json: user_vote, status: :created
      else
        render json: { errors: user_vote.errors.full_messages }, status: :unprocessable_entity
      end
    # end
  end

  def edit
    render json: @user_vote
  end

  def update
    @user_vote.user_id = @current_user.id

    if @user_vote.update(user_vote_params)
      render json: @user_vote
    else
      render json: @user_vote.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user_vote.destroy
    render json: { message: "User vote was successfully destroyed" }, status: :ok
  end
  # GET /user_votes/by_event_id/:voting_event_id
  def by_event_id
    @candidates = UserVote.where(voting_event_id: params[:voting_event_id])
    render json: @candidates
  end

  private

  def set_user_vote
    @user_vote = UserVote.find(params[:id])
  end

  # def set_current_user
  #   # Assuming you have a proper authentication system that sets @current_user
  #   @current_user = current_user
  # end

  def user_vote_params
    params.require(:user_vote).permit(:candidate_id, :user_id, :voting_event_id)
  end
end
