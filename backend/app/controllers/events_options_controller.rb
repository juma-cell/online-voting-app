class EventsOptionsController < ApplicationController
  before_action :set_events_option, only: %i[ show edit update destroy ]

  # GET /events_options or /events_options.json
  def index
    @events_options = EventsOption.all
  end

  # GET /events_options/1 or /events_options/1.json
  def show
  end

  # GET /events_options/new
  def new
    @events_option = EventsOption.new
  end

  # GET /events_options/1/edit
  def edit
  end

  # POST /events_options or /events_options.json
  def create
    @events_option = EventsOption.new(events_option_params)

    respond_to do |format|
      if @events_option.save
        format.html { redirect_to events_option_url(@events_option), notice: "Events option was successfully created." }
        format.json { render :show, status: :created, location: @events_option }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @events_option.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events_options/1 or /events_options/1.json
  def update
    respond_to do |format|
      if @events_option.update(events_option_params)
        format.html { redirect_to events_option_url(@events_option), notice: "Events option was successfully updated." }
        format.json { render :show, status: :ok, location: @events_option }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @events_option.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events_options/1 or /events_options/1.json
  def destroy
    @events_option.destroy

    respond_to do |format|
      format.html { redirect_to events_options_url, notice: "Events option was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_events_option
      @events_option = EventsOption.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def events_option_params
      params.require(:events_option).permit(:options, :eventName, :voting_event_id)
    end
end
