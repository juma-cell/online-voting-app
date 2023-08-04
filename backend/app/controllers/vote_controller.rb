# app/controllers/vote_controller.rb
class VoteController < ApplicationController
    before_action :authenticate_user! # Assuming you have user authentication in your app
  
    def create
      @candidate = Candidate.find(params[:candidate_id])
      @vote = @candidate.votes.new(user: current_user)
  
      if @vote.save
        flash[:notice] = 'Vote successfully created!'
      else
        flash[:alert] = 'Vote creation failed!'
      end
      redirect_to candidates_path # Adjust this route to the appropriate destination
    end
  
    def destroy
      @vote = Vote.find(params[:id])
      @vote.destroy
      flash[:notice] = 'Vote successfully removed!'
      redirect_to candidates_path # Adjust this route to the appropriate destination
    end
  end
  