class UsersController < ApplicationController
  skip_before_action :authorize

  def index
    users = User.all
    render json: users.as_json
  end

  def loggedin_user
    user = User.find_by(id: session[:user_id])
    if user
      patients = user.patients.where(archive: false)
      render json: user.as_json(include: [:appointments, :patients]), patients: patients
    else
      render json: [].as_json, status: :not_found
    end
  end
  
  # Get Single User
  def show
    user = User.includes(:appointments, :patients).find_by(id: params[:id])
    if user
      render json: user.as_json(include: [:appointments, :patients])
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  # Add new user
  def create
    user = User.create(email: params[:email], rank: params[:rank],name: params[:name], password: params[:password])
    if user.valid?
      render json: { success: "User created successfully" }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

    # Change user's password
def changepassword
  user = User.find_by(id: params[:id])
  if user
    current_password = params[:current_password]
    new_password = params[:new_password]

    if user.authenticate(current_password)
      user.update(password: new_password)
      message = { success: "Password has been changed successfully" }
    else
      render json: { error: "Incorrect current password" }, status: :not_acceptable
      return
    end
  else
    render json: { error: "User not found" }, status: :not_found
    return
  end

  render json: message
end
end