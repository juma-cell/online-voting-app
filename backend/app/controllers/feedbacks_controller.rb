class FeedbacksController < ApplicationController
  before_action :set_feedback, only: [:show]

  # GET /feedbacks/1 or /feedbacks/1.json
  def show
    feedback = Feedback.find_by(id: params[:id]) # value or nil
    if feedback
      render json: feedback.as_json(include: :user)
    else
      render json: { error: "Feedback not found" }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_feedback
    @feedback = Feedback.find(params[:id])
  end
end
