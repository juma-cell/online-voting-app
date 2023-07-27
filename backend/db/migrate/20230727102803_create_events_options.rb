class CreateEventsOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :events_options do |t|
      t.string :options
      t.string :eventName
      t.references :voting_event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
