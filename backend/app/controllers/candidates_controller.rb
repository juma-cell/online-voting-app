class CandidatesController < ApplicationController
  before_action :set_candidate, only: [:show, :edit, :update, :destroy]

  # GET /candidates
  def index
    @candidates = Candidate.all
    render json: @candidates
  end

  # GET /candidates/1
  def show
    render json: @candidate
  end

   # GET /candidates/by_voting_event/:voting_event_id
  def by_voting_event
    @candidates = Candidate.where(voting_event_id: params[:voting_event_id])
    render json: @candidates
  end

  # POST /candidates
  # def create
  #   candidate = Candidate.new(candidate_params)
  #   candidate.role = user_vote_params[:role]
  #   candidate.userName= user_vote_params[:userName]
  #   candidate.voting_event_id= user_vote_params[:voting_event_id]
  #   candidate.user_id= user_vote_params[:user_id]
    
  #   if candidate.save
  #     render json: candidate, status: :created
  #   else
  #     render json: { errors: candidate.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end
  def create
    @candidate = Candidate.new(candidate_params)

    if @candidate.save
      render json: @candidate, status: :created
    else
      render json: { errors: @candidate.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # PATCH/PUT /candidates/1
  def update
    if @candidate.update(candidate_params)
      render json: @candidate
    else
      render json: { errors: @candidate.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /candidates/1
  def destroy
    @candidate.destroy
    render json: { message: "Candidate was successfully destroyed" }, status: :ok
  end

  private

  def set_candidate
    @candidate = Candidate.find_by(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Candidate not found' }, status: :not_found
  end

  def candidate_params
    params.require(:candidate).permit(:role, :userName, :voting_event_id, :user_id)
  end
end
