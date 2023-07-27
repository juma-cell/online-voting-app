require "test_helper"

class NotificationTablesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @notification_table = notification_tables(:one)
  end

  test "should get index" do
    get notification_tables_url
    assert_response :success
  end

  test "should get new" do
    get new_notification_table_url
    assert_response :success
  end

  test "should create notification_table" do
    assert_difference("NotificationTable.count") do
      post notification_tables_url, params: { notification_table: { event: @notification_table.event, message: @notification_table.message } }
    end

    assert_redirected_to notification_table_url(NotificationTable.last)
  end

  test "should show notification_table" do
    get notification_table_url(@notification_table)
    assert_response :success
  end

  test "should get edit" do
    get edit_notification_table_url(@notification_table)
    assert_response :success
  end

  test "should update notification_table" do
    patch notification_table_url(@notification_table), params: { notification_table: { event: @notification_table.event, message: @notification_table.message } }
    assert_redirected_to notification_table_url(@notification_table)
  end

  test "should destroy notification_table" do
    assert_difference("NotificationTable.count", -1) do
      delete notification_table_url(@notification_table)
    end

    assert_redirected_to notification_tables_url
  end
end
