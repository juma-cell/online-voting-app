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

  def create
    @user_vote = UserVote.new(user_vote_params)
    @user_vote.user_id = @current_user.id

    if @user_vote.save
      render json: @user_vote, status: :created
    else
      render json: @user_vote.errors, status: :unprocessable_entity
    end
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

  private

  def set_user_vote
    @user_vote = UserVote.find(params[:id])
  end

  def user_vote_params
    params.require(:user_vote).permit(:userName, :eventName, :voting_event_id)
  end
end
