class PusherController < ApplicationController

  protect_from_forgery :except => :auth # stop rails CSRF protection for this action

  def auth
  	colour = @@colours.sample
  	@@colours.delete colour
  
	response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
		user_id: colour
	})

	render :json => response
  end

end