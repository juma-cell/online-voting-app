Rails.application.routes.draw do
  resources :candidates
  resources :user_votes
  resources :events_options
  resources :feedbacks
  resources :notification_tables
  resources :voting_events
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
