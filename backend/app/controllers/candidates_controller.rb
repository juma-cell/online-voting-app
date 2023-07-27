class CandidatesController < ApplicationController
  before_action :set_candidate, only: [:show]

  # GET /candidates/1 or /candidates/1.json
  def show
    candidate = Candidate.find_by(id: params[:id]) # value or nil
    if candidate
      render json: candidate.as_json(include: [:user_vote, :voting_event])
    else
      render json: { error: "Candidate not found" }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_candidate
    @candidate = Candidate.find(params[:id])
  end
end
