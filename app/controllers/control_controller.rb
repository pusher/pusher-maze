class ControlController < ApplicationController

	before_action :pick_colour, only: :index
	skip_before_filter :verify_authenticity_token, :only => :colour_chosen

	def index
	end

	def colour_chosen
		session[:colour] = params[:colour]
		Pusher['colour-channel'].trigger('colour_taken', {colour: session[:colour]})
		redirect_to '/'
	end

	def pick_colour
		return true if session[:colour]
		render "pick_colour.html.erb"
	end

end
