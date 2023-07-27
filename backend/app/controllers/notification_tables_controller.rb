class NotificationTablesController < ApplicationController
  before_action :set_notification_table, only: %i[ show edit update destroy ]

  # GET /notification_tables or /notification_tables.json
  def index
    @notification_tables = NotificationTable.all
  end

  # GET /notification_tables/1 or /notification_tables/1.json
  def show
  end

  # GET /notification_tables/new
  def new
    @notification_table = NotificationTable.new
  end

  # GET /notification_tables/1/edit
  def edit
  end

  # POST /notification_tables or /notification_tables.json
  def create
    @notification_table = NotificationTable.new(notification_table_params)

    respond_to do |format|
      if @notification_table.save
        format.html { redirect_to notification_table_url(@notification_table), notice: "Notification table was successfully created." }
        format.json { render :show, status: :created, location: @notification_table }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @notification_table.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /notification_tables/1 or /notification_tables/1.json
  def update
    respond_to do |format|
      if @notification_table.update(notification_table_params)
        format.html { redirect_to notification_table_url(@notification_table), notice: "Notification table was successfully updated." }
        format.json { render :show, status: :ok, location: @notification_table }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @notification_table.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /notification_tables/1 or /notification_tables/1.json
  def destroy
    @notification_table.destroy

    respond_to do |format|
      format.html { redirect_to notification_tables_url, notice: "Notification table was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_notification_table
      @notification_table = NotificationTable.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def notification_table_params
      params.require(:notification_table).permit(:event, :message)
    end
end
