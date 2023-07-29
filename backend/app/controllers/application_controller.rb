class ApplicationController < ActionController::Base
    #sskip_before_action :verify_authenticity_token, if: -> { request.format.json? }
    #protect_from_forgery with: :null_session
end
