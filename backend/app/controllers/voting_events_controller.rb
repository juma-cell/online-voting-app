class VotingEventsController < ApplicationController
  before_action :set_voting_event, only: [:show]

  # GET /voting_events/1 or /voting_events/1.json
  def show
    voting_event = VotingEvent.find_by(id: params[:id]) # value or nil
    if voting_event
      render json: voting_event.as_json(include: :user)
    else
      render json: { error: "Voting event not found" }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_voting_event
    @voting_event = VotingEvent.find(params[:id])
  end
end
