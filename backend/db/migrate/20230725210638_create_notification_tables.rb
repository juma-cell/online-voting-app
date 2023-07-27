class CreateNotificationTables < ActiveRecord::Migration[7.0]
  def change
    create_table :notification_tables do |t|
      t.string :event
      t.string :message

      t.timestamps
    end
  end
end
