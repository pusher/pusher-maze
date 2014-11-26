class PusherController < ApplicationController

  protect_from_forgery :except => :auth # stop rails CSRF protection for this action

  def auth
  	colours = ['red','orange','yellow', 'blue', 'green', 'indigo', 'violet']

	response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
		user_id: colours.sample	
	})
	render :json => response
  end

end