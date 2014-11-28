Rails.application.routes.draw do
  root to: 'control#index'
  get '/maze', to: 'maze#index'
  post '/pusher/auth', to: 'pusher#auth'
end