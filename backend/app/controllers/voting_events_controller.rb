class VotingEventsController < ApplicationController
  before_action :set_voting_event, only: %i[ show edit update destroy ]

  # GET /voting_events or /voting_events.json
  def index
    @voting_events = VotingEvent.all
  end

  # GET /voting_events/1 or /voting_events/1.json
  def show
  end

  # GET /voting_events/new
  def new
    @voting_event = VotingEvent.new
  end

  # GET /voting_events/1/edit
  def edit
  end

  # POST /voting_events or /voting_events.json
  def create
    @voting_event = VotingEvent.new(voting_event_params)

    respond_to do |format|
      if @voting_event.save
        format.html { redirect_to voting_event_url(@voting_event), notice: "Voting event was successfully created." }
        format.json { render :show, status: :created, location: @voting_event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @voting_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /voting_events/1 or /voting_events/1.json
  def update
    respond_to do |format|
      if @voting_event.update(voting_event_params)
        format.html { redirect_to voting_event_url(@voting_event), notice: "Voting event was successfully updated." }
        format.json { render :show, status: :ok, location: @voting_event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @voting_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /voting_events/1 or /voting_events/1.json
  def destroy
    @voting_event.destroy

    respond_to do |format|
      format.html { redirect_to voting_events_url, notice: "Voting event was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_voting_event
      @voting_event = VotingEvent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def voting_event_params
      params.require(:voting_event).permit(:eventsName, :eventsDescription, :duration, :user_id)
    end
end
