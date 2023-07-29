class EventsOptionsController < ApplicationController
  before_action :set_events_option, only: [:show]

  # GET /events_options/1 or /events_options/1.json
  def show
    events_option = EventsOption.find_by(id: params[:id]) # value or nil
    if events_option
      render json: events_option
    else
      render json: { error: "Events option not found" }, status: :not_found
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_events_option
    @events_option = EventsOption.find(params[:id])
  end
end
