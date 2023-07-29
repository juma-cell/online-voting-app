class UsersController < ApplicationController
  

  def index
    users = User.all
    render json: users
  end

  

  

  def create
    user = User.create!(user_params)
  
    if user
      session[:user_id] = user.id
      render json: {
        message:'Registration successful',
        
      }
    else 
      render json: {
        message:'Registration failed'
      }
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
