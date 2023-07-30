Rails.application.routes.draw do
  resources :candidates
  resources :user_votes
  resources :events_options
  resources :feedbacks, only: [:index, :create, :destroy ]
  resources :notification_tables
  resources :voting_events
  resources :users, only:[:index, :create, :show ]
  put '/users/:id/changepassword', to: 'users#changepassword'
  get "/logged_in", to:'sessions#logged_in'
  post "/login", to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
 


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
