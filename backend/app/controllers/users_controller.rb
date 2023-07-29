class UsersController < ApplicationController
  skip_before_action :authorize

  def index
    users = User.all
    render json: users.as_json
  end

  def logged_in
    user = User.find_by(id: session[:user_id])
    if user
      feedbacks = user.feedbacks
      render json: user.as_json(include: [:feedbacks])
    else
      render json: [].as_json, status: :not_found
    end
  end

  def show
    user = User.includes(:feedbacks).find_by(id: params[:id])
    if user
      render json: user.as_json(include: [:feedbacks])
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def create
    user = User.new(user_params)
  
    if user.save
      render json: { success: "User created successfully" }, status: :created
    else
      if user.errors[:userName].include?("has already been taken") || user.errors[:email].include?("has already been taken")
        render json: { errors: "User with the same username or email already exists" }, status: :unprocessable_entity
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

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
  private

  def user_params
    params.permit(:firstName, :lastName, :userName, :email, :password)
  end

end
