Rails.application.routes.draw do
  resources :candidates
  resources :user_votes
  resources :events_options
  resources :feedbacks
  resources :notification_tables
  resources :voting_events
  resources :users
  get "/logged_in", to:'users#logged_in'
  post "/login", to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
 


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
