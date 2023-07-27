class CreateVotingEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :voting_events do |t|
      t.string :eventsName
      t.string :eventsDescription
      t.string :candidates
      t.integer :duration

      t.timestamps
    end
  end
end
