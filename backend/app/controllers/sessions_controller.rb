class SessionsController < ApplicationController
    
  
    include CurrentUserConcern
    def login
      user = User
             .find_by(email: params["email"])
             .try(:authenticate, params["password"])
          
      if user
        session[:user_id] = user.id
        render json: {
          message: 'Log in successful',
          
        }
      else
        render json: {
          status: 401
        }
      end
    end
    def logged_in
        if @current_user
            render json: {
                message: 'You are logged in',
                
            }
        else
            render json:{
                message: 'Please log in'
            }
        end
    end
    def logout
        reset_session
        render json:{
            message: 'Log out successful'
        }
    end
  end
  