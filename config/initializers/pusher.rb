require 'pusher'

if Rails.application.secrets.pusher_url
	Pusher.url = Rails.application.secrets.pusher_url
else
	Pusher.app_id = Rails.application.secrets.pusher_app_id
	Pusher.key = Rails.application.secrets.pusher_app_key
	Pusher.secret = Rails.application.secrets.pusher_app_secret
end

Pusher.logger = Rails.logger
